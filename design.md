# Comprehensive Design System: 3-Level Nested Neumorphism

## 1. Core Philosophy & Architectural Concept

The goal of this design system is to construct a physical, tactile, hardware-inspired interface. The surface should look like a continuous, single sheet of smooth matte plastic (`#E7E7E7`).

### Strict Anti-Slop Guidelines

- **Zero Standard Borders:** Absolutely NO `border`, `border-gray-*`, or standard outlines. All visual separation MUST be achieved via light and shadow.
- **Zero Generic Drop-Shadows:** Never use standard Tailwind shadows (`shadow-sm`, `shadow-md`, `shadow-xl`).
- **No Pure Black / Neon Accents:** Colors must stay within the 5-tone monochrome spectrum.
- **Unified Background Color:** Every container and main surface MUST match the canvas color `#E7E7E7` exactly to preserve the extruded illusion.

---

## 2. Palette & Color Token System

Strictly limit all UI elements to these 5 HEX values:

| Token Name                          | HEX Code  | Primary Usage                                       |
| :---------------------------------- | :-------- | :-------------------------------------------------- |
| **Canvas & Base Surface**           | `#E7E7E7` | Page background, cards, buttons, panel surfaces     |
| **Light Source Reflection**         | `#FFFFFF` | Top-left shadow highlights (Soft white glow)        |
| **Dark Drop Shadow**                | `#B6B6B6` | Bottom-right shadows (Soft dark depth)              |
| **Recessed Accent / Inset Divider** | `#D1D1D1` | Subtle background shifts inside recessed tracks     |
| **Primary Typography**              | `#333333` | Headings, main text, active icons (High contrast)   |
| **Muted Meta / Labels**             | `#9B9B9B` | Subtitles, labels, secondary icons, disabled states |

---

## 3. The 3-Level Depth System (Nested Neumorphism)

Referencing physical audio control panels and tactile widgets, UI depth is constructed in 3 strict layers:

### Level 1: Outer Extrusion (Main Section Wrappers)

- **Concept:** Pops out directly from the base page canvas.
- **Class:** `bg-[#E7E7E7] shadow-[12px_12px_24px_#b6b6b6,-12px_-12px_24px_#ffffff] rounded-[2.5rem] p-8 mb-10`

### Level 2: Inner Inset (Recessed Tracks & Content Panels)

- **Concept:** Carved/pressed DOWN into a Level 1 container. Used to group lists, grids, or interactive zones.
- **Class:** `bg-[#E7E7E7] shadow-[inset_6px_6px_12px_#b6b6b6,inset_-6px_-6px_12px_#ffffff] rounded-3xl p-6`

### Level 3: Inner Extrusion (Interactive Controls inside Insets)

- **Concept:** Small buttons or tags that pop back UP from inside a Level 2 recessed panel.
- **Class (Resting):** `bg-[#E7E7E7] text-[#333333] shadow-[4px_4px_10px_#b6b6b6,-4px_-4px_10px_#ffffff] rounded-full px-5 py-2 font-medium transition-all duration-200`
- **Class (Active / Pressed):** `active:shadow-[inset_3px_3px_6px_#b6b6b6,inset_-3px_-3px_6px_#ffffff] active:scale-95 text-[#333333]`

---

## 4. Component-Level Style Rules

### Buttons & Action CTAs

- **Primary CTA:** Fully rounded pill button (`rounded-full`). Must feel heavy and clickable.
- **Quick Contact Items:** Rectangular extruded rows with rounded corners (`rounded-2xl`). Must depress into an inset shadow on click.

### Badges & Tags (Skills & Roles)

- Must be housed inside a Level 2 Recessed Track.
- Individual skill tags use Level 3 Extrusion (`rounded-full`, text size `text-sm`, color `#333333`).

### Status Indicators

- **Available for Work Badge:** Recessed pill (`shadow-[inset_3px_3px_6px_#b6b6b6,inset_-3px_-3px_6px_#ffffff]`) with a pulsing green dot (`bg-green-500 animate-pulse`).

---

## 5. Section Structure Blueprint Reference

All page content must follow `portfolio_content_structure_blueprint.md`:

1. **Section 1 (Hero):** Two-column layout (Bio on Left, Status + Quick Contact on Right).
2. **Section 2 (Featured Project):** Level 1 Card -> Level 2 Details Grid -> Level 3 Tech Tags & Action Links.
3. **Section 3 (Work Experience):** Level 1 Card -> Level 2 Timeline Panel for each position.
4. **Section 4 (Technical Skills):** Level 1 Card -> Level 2 Categorized Inset Containers -> Level 3 Skill Pills.
5. **Section 5 (Contact):** Level 1 Card -> Level 2 Form/Links -> Level 3 Action Buttons.
