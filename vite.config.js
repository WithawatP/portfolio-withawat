import { existsSync } from "node:fs";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { experiences, featuredProject, profile, skillGroups } from "./src/data/portfolio.js";

const OG_IMAGE = { path: "/og-image.png", width: 1200, height: 630, alt: "Withawat Phiraban, Junior Software Developer and QA Tester" };

// The site's address from VITE_SITE_URL (.env), without a trailing slash, or null while it is empty or not
// a public http(s) address, so a build never ships a wrong or localhost URL.
function publicSiteUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    const local = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(parsed.hostname);
    if (/^https?:$/.test(parsed.protocol) && !local) return parsed.href.replace(/\/$/, "");
  } catch {
    // not a URL
  }
  return null;
}

// Head tags that need the absolute address: canonical, og:url and the share image.
function siteUrlTags(url) {
  // Without an image URL the card is the small one.
  if (!url) return [`<meta name="twitter:card" content="summary" />`];
  const image = url + OG_IMAGE.path;
  return [
    `<link rel="canonical" href="${url}/" />`,
    `<meta property="og:url" content="${url}/" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${OG_IMAGE.alt}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${OG_IMAGE.alt}" />`,
  ];
}

// Skill groups as they read on the page (the Skills tray), and the technical ones for knowsAbout:
// every group but the soft skills (owner's decision).
const skillItems = (group) => (group.groups ? group.groups.flatMap((sub) => sub.items) : group.items);
const technicalSkills = skillGroups.filter((group) => !/soft skills/i.test(group.title)).flatMap(skillItems);

// schema.org Person, from portfolio.js. No telephone (owner's decision); `url` only with a public address.
function personJsonLd(url) {
  const [locality] = profile.location.split(",");
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    ...(url && { url: `${url}/` }),
    jobTitle: profile.roles,
    description: profile.headline,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: locality.trim(), addressCountry: "TH" },
    alumniOf: { "@type": "EducationalOrganization", name: "Generation Thailand" },
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: technicalSkills,
  };
  // "<" escaped, so no value can ever close the script element.
  const json = JSON.stringify(person, null, 2).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

function robotsTxt(url) {
  // Every crawler is welcome, AI crawlers included (owner: recruiters' AI tools should read the site).
  const lines = ["User-agent: *", "Allow: /"];
  if (url) lines.push("", `Sitemap: ${url}/sitemap.xml`);
  return lines.join("\n") + "\n";
}

function sitemapXml(url) {
  const lastmod = new Date().toISOString().slice(0, 10);
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `  <url><loc>${url}/</loc><lastmod>${lastmod}</lastmod></url>`,
    `</urlset>`,
    "",
  ].join("\n");
}

// llms.txt (llmstxt.org): only what the page itself shows, from portfolio.js, so it cannot drift. No phone.
function llmsTxt(url, { cvExists }) {
  const project = featuredProject;
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.heroRole} based in ${profile.location}. ${profile.headline}`,
    "",
    `${profile.statusLong}.`,
    "",
    `## Featured project: ${project.name} (${project.context})`,
    `- ${project.summary}`,
    `- ${project.facts.map((fact) => `${fact.label}: ${fact.value}`).join(" · ")}`,
    `- Tested with ${project.testing.requestCount} ${project.testing.requestCaption}.`,
    ...project.testing.bugs.map((bug) => `- ${bug.tag}: ${bug.short}`),
    ...project.links.map((link) => `- [${link.label}](${link.href})`),
    "",
    "## Work experience",
    ...experiences.map((job) => `- ${job.role}, ${job.company} (${job.period})`),
    "",
    "## Technical skills",
    ...skillGroups.map((group) => `- ${group.title}: ${skillItems(group).join(", ")}`),
    "",
    "## Contact",
    // The CV link needs the absolute address and the file itself.
    ...(url && cvExists ? [`- [CV (PDF)](${url}${profile.cvHref})`] : []),
    `- [GitHub](${profile.github}) · [LinkedIn](${profile.linkedin})`,
    `- Email: ${profile.email}`,
    "",
  ];
  return lines.join("\n");
}

// Crawler metadata, all written at build time into the static files (never by the app's JavaScript):
// the head tags and JSON-LD in index.html, and robots.txt, sitemap.xml and llms.txt in dist/. Anything
// that needs an absolute URL is left out while VITE_SITE_URL is empty or not a public http(s) address.
function siteMeta(rawUrl) {
  const url = publicSiteUrl(rawUrl);
  let ssrBuild = false;

  return {
    name: "site-meta",
    configResolved(config) {
      ssrBuild = Boolean(config.build.ssr);
    },
    transformIndexHtml(html) {
      if (rawUrl && !url) this.warn?.(`VITE_SITE_URL "${rawUrl}" is not a public http(s) URL; canonical, share-image, sitemap and other absolute-URL items are left out.`);
      const tags = [...siteUrlTags(url), personJsonLd(url)].join("\n    ");
      return html.replace("<!--site-url-tags-->", () => tags);
    },
    generateBundle() {
      // The prerender's server build (scripts/prerender.mjs) runs this config too; the files belong in dist/.
      if (ssrBuild) return;
      const cvExists = existsSync(`public${profile.cvHref}`);
      if (!cvExists) this.warn(`public${profile.cvHref} is missing; the CV link is left out of llms.txt.`);
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robotsTxt(url) });
      if (url) this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemapXml(url) });
      this.emitFile({ type: "asset", fileName: "llms.txt", source: llmsTxt(url, { cvExists }) });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [react(), tailwindcss(), siteMeta((env.VITE_SITE_URL || "").trim())],
  };
});
