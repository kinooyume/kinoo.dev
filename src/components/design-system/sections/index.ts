/**
 * Design System Sections Registry
 * Centralizes sidebar configuration for all DS sections
 */

// Types for sidebar navigation
export type Framework = "astro" | "solid";
export type SidebarLeaf = { label: string; href: string; framework?: Framework };
export type SidebarGroup = { label: string; children: SidebarNode[] };
export type SidebarNode = SidebarLeaf | SidebarGroup;
export type SidebarSection = { title: string; items: SidebarNode[] };

export const isGroup = (node: SidebarNode): node is SidebarGroup =>
  "children" in node;

// Sidebar configuration - each section registers its items here
export const sidebarSections: SidebarSection[] = [
  {
    title: "Foundations",
    items: [
      { label: "Colors", href: "#colors" },
      { label: "Typography", href: "#typography" },
      { label: "Spacing", href: "#spacing" },
    ],
  },
  {
    title: "Shared",
    items: [
      {
        label: "Atoms",
        children: [
          { label: "Tag", href: "#tag", framework: "astro" },
          { label: "TagLink", href: "#taglink", framework: "astro" },
          { label: "Button", href: "#button", framework: "astro" },
          { label: "IconButton", href: "#iconbutton", framework: "astro" },
          { label: "BurgerIcon", href: "#burgericon", framework: "astro" },
          { label: "H3Tagged", href: "#h3tagged", framework: "astro" },
        ],
      },
      {
        label: "Molecules",
        children: [
          {
            label: "Card",
            children: [
              { label: "Card", href: "#card", framework: "astro" },
              { label: "CardContent", href: "#card-content", framework: "astro" },
              { label: "CardTitle", href: "#card-title", framework: "astro" },
              { label: "CardSplit", href: "#card-split", framework: "astro" },
            ],
          },
          { label: "Spotlight", href: "#spotlight", framework: "astro" },
        ],
      },
      {
        label: "Organisms",
        children: [{ label: "Section Pattern", href: "#section-pattern", framework: "astro" }],
      },
    ],
  },
  {
    title: "Hero",
    items: [{ label: "HeroSubtitle", href: "#herosubtitle", framework: "astro" }],
  },
  {
    title: "Header",
    items: [
      { label: "Header", href: "#header", framework: "astro" },
      { label: "HeaderMenu", href: "#headermenu", framework: "astro" },
      { label: "HeaderLink", href: "#headerlink", framework: "astro" },
      { label: "NavBar", href: "#navbar", framework: "astro" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "Contact", href: "#contact-doc", framework: "astro" },
      { label: "ContactForm", href: "#contactform", framework: "solid" },
      { label: "FloatingContact", href: "#floatingcontact", framework: "astro" },
    ],
  },
  {
    title: "Sidebar",
    items: [{ label: "Sidebar", href: "#sidebar", framework: "astro" }],
  },
  {
    title: "Templates",
    items: [{ label: "Compositions", href: "#compositions" }],
  },
  {
    title: "DS Components",
    items: [
      { label: "DSBlock", href: "#ds-block", framework: "astro" },
      { label: "DSPreview", href: "#ds-preview", framework: "astro" },
      { label: "DSCode", href: "#ds-code", framework: "astro" },
      { label: "DSPropsTable", href: "#ds-propstable", framework: "astro" },
      { label: "DSStructure", href: "#ds-structure", framework: "astro" },
      { label: "DSNote", href: "#ds-note", framework: "astro" },
    ],
  },
];
