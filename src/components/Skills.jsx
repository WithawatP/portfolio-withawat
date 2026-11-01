import { useState } from "react";
import SectionCard from "./ui/SectionCard";
import SectionHeading from "./ui/SectionHeading";
import InsetPanel from "./ui/InsetPanel";
import KnobSwitch from "./ui/KnobSwitch";
import SkillChip from "./ui/SkillChip";
import { useMediaQuery } from "../lib/useMediaQuery";
import { skillGroups } from "../data/portfolio";

const skillTabs = [
  { id: "dev", label: "Dev" },
  { id: "qa", label: "QA" },
  { id: "design", label: "Design" },
  { id: "soft", label: "Soft" },
];

// Below 640px a half-width chip holds about 19 characters at 360px; longer labels need one column.
const hasLongLabel = (items) => items.some((item) => item.length > 19);

// Uneven modules from 768px up, in the order Dev, QA, Design, Soft.
const moduleClass = {
  dev: "md:col-span-2 lg:col-span-8",
  qa: "lg:col-span-4",
  design: "lg:col-span-5",
  soft: "md:col-span-2 lg:col-span-7",
};

const chipGridClass = (items) =>
  hasLongLabel(items)
    ? "grid-cols-1 sm:grid-cols-2 sm:@max-[360px]:grid-cols-1"
    : "grid-cols-2 @max-[260px]:grid-cols-1 sm:@max-[360px]:grid-cols-1";

const chipSpanClass = (items, index) => {
  if (items.length % 2 === 0 || index !== items.length - 1) return "";
  return hasLongLabel(items)
    ? "sm:col-span-2 sm:@max-[360px]:col-span-1"
    : "col-span-2 @max-[260px]:col-span-1 sm:@max-[360px]:col-span-1";
};

export default function Skills() {
  const [primary, ...secondary] = skillGroups;
  const [activeTab, setActiveTab] = useState("dev");
  const isMobile = useMediaQuery("(max-width: 767px)");

  const tabPanelProps = (tab) =>
    isMobile
      ? {
          id: `skills-panel-${tab.id}`,
          role: "tabpanel",
          "aria-labelledby": `skills-tab-${tab.id}`,
        }
      : {};

  return (
    <SectionCard id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        title="Technical skills"
        intro="A practical toolkit for building, testing, and designing web applications, supported by the soft skills that keep delivery on track."
      />

      <div className="mb-4 md:hidden">
        <KnobSwitch
          options={skillTabs}
          value={activeTab}
          onChange={setActiveTab}
          ariaLabel="Skill categories"
          idPrefix={isMobile ? "skills" : undefined}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        <InsetPanel
          {...tabPanelProps(skillTabs[0])}
          className={`${moduleClass.dev} ${
            isMobile ? "" : "rise rise-delay-1"
          } ${activeTab === "dev" ? "" : "max-md:hidden"}`}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-ink">{primary.title}</h3>
              <p className="mt-1 text-base leading-relaxed text-ink">
                {primary.summary}
              </p>
            </div>
          </div>

          <div className="mt-5 grid items-start gap-5 lg:grid-cols-3">
            {primary.groups.map((group, groupIndex) => {
              const labelId = `skill-sub-${groupIndex}`;
              return (
                <div key={group.label} className="@container">
                  <p id={labelId} className="text-[13px] font-medium text-ink">
                    {group.label}
                  </p>
                  <ul
                    aria-labelledby={labelId}
                    className={`mt-2 grid gap-2 ${chipGridClass(group.items)}`}
                  >
                    {group.items.map((item, itemIndex) => (
                      <SkillChip
                        key={item}
                        className={` ${chipSpanClass(group.items, itemIndex)}`}
                      >
                        {item}
                      </SkillChip>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </InsetPanel>

        {secondary.map((group, groupIndex) => {
          const labelId = `skill-cat-${groupIndex}`;
          const tab = skillTabs[groupIndex + 1];
          return (
            <InsetPanel
              key={group.title}
              {...tabPanelProps(tab)}
              className={`@container ${moduleClass[tab.id]} ${
                isMobile ? "" : "rise rise-delay-2"
              } ${activeTab === tab.id ? "" : "max-md:hidden"}`}
            >
              <h3 id={labelId} className="text-xl font-bold text-ink">
                {group.title}
              </h3>
              <p className="mt-1 text-base leading-relaxed text-ink">
                {group.summary}
              </p>
              <ul
                aria-labelledby={labelId}
                className={`mt-5 grid gap-2 ${chipGridClass(group.items)}`}
              >
                {group.items.map((item, itemIndex) => (
                  <SkillChip
                    key={item}
                    className={chipSpanClass(group.items, itemIndex)}
                  >
                    {item}
                  </SkillChip>
                ))}
              </ul>
            </InsetPanel>
          );
        })}
      </div>
    </SectionCard>
  );
}
