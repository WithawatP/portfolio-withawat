import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const OG_IMAGE = { path: "/og-image.png", width: 1200, height: 630, alt: "Withawat Phiraban, Junior Software Developer and QA Tester" };

// Tags that need the site's absolute address: canonical, og:url and the share image. They are built
// from VITE_SITE_URL (.env) and left out while it is empty or not a public http(s) address, so a
// build never ships a wrong or localhost URL.
function siteUrlTags(rawUrl) {
  let url = null;
  try {
    const parsed = new URL(rawUrl);
    const local = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(parsed.hostname);
    if (/^https?:$/.test(parsed.protocol) && !local) url = parsed.href.replace(/\/$/, "");
  } catch {
    url = null;
  }

  return {
    name: "site-url-tags",
    transformIndexHtml(html) {
      if (!url) {
        if (rawUrl) this.warn?.(`VITE_SITE_URL "${rawUrl}" is not a public http(s) URL; canonical and share-image tags are left out.`);
        // Without an image URL the card is the small one.
        return html.replace("<!--site-url-tags-->", `<meta name="twitter:card" content="summary" />`);
      }
      const image = url + OG_IMAGE.path;
      const tags = [
        `<link rel="canonical" href="${url}/" />`,
        `<meta property="og:url" content="${url}/" />`,
        `<meta property="og:image" content="${image}" />`,
        `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
        `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
        `<meta property="og:image:alt" content="${OG_IMAGE.alt}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:image" content="${image}" />`,
        `<meta name="twitter:image:alt" content="${OG_IMAGE.alt}" />`,
      ].join("\n    ");
      return html.replace("<!--site-url-tags-->", tags);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [react(), tailwindcss(), siteUrlTags((env.VITE_SITE_URL || "").trim())],
  };
});
