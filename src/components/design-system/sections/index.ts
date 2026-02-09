/**
 * Design System Sections Registry
 * Centralizes sidebar configuration for all DS sections
 */

// Types for sidebar navigation
export type SidebarLeaf = { label: string; href: string };
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
          { label: "Tag", href: "#tag" },
          { label: "TagLink", href: "#taglink" },
          { label: "Button", href: "#button" },
          { label: "IconButton", href: "#iconbutton" },
          { label: "BurgerIcon", href: "#burgericon" },
          { label: "H3Tagged", href: "#h3tagged" },
        ],
      },
      {
        label: "Molecules",
        children: [
          {
            label: "Card",
            children: [
              { label: "Card", href: "#card" },
              { label: "CardContent", href: "#card-content" },
              { label: "CardTitle", href: "#card-title" },
              { label: "CardSplit", href: "#card-split" },
            ],
          },
          { label: "Spotlight", href: "#spotlight" },
        ],
      },
      {
        label: "Organisms",
        children: [{ label: "Section Pattern", href: "#section-pattern" }],
      },
    ],
  },
  {
    title: "Hero",
    items: [{ label: "HeroSubtitle", href: "#herosubtitle" }],
  },
  {
    title: "Header",
    items: [
      { label: "Header", href: "#header" },
      { label: "HeaderMenu", href: "#headermenu" },
      { label: "HeaderLink", href: "#headerlink" },
      { label: "NavBar", href: "#navbar" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "Contact", href: "#contact-doc" },
      { label: "FloatingContact", href: "#floatingcontact" },
    ],
  },
  {
    title: "Sidebar",
    items: [{ label: "Sidebar", href: "#sidebar" }],
  },
  {
    title: "Templates",
    items: [{ label: "Compositions", href: "#compositions" }],
  },
  {
    title: "DS Components",
    items: [
      { label: "DSBlock", href: "#ds-block" },
      { label: "DSPreview", href: "#ds-preview" },
      { label: "DSCode", href: "#ds-code" },
      { label: "DSPropsTable", href: "#ds-propstable" },
      { label: "DSStructure", href: "#ds-structure" },
      { label: "DSNote", href: "#ds-note" },
    ],
  },
];
