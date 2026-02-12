export type Framework = "astro" | "solid";
export type SidebarLeaf = { label: string; href: string; framework?: Framework };
export type SidebarGroup = { label: string; children: SidebarNode[] };
export type SidebarNode = SidebarLeaf | SidebarGroup;
export type SidebarSection = { title: string; items: SidebarNode[] };

export const isGroup = (node: SidebarNode): node is SidebarGroup =>
  "children" in node;

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
    title: "Atoms",
    items: [
      { label: "Button", href: "#button", framework: "solid" },
      { label: "IconButton", href: "#iconbutton", framework: "astro" },
      { label: "Tag", href: "#tag", framework: "astro" },
      { label: "TagRow", href: "#tagrow", framework: "astro" },
      { label: "Link", href: "#link", framework: "astro" },
    ],
  },
  {
    title: "Card",
    items: [
      { label: "Card", href: "#card", framework: "astro" },
      { label: "CardContent", href: "#card-content", framework: "astro" },
      { label: "CardTitle", href: "#card-title", framework: "astro" },
      { label: "CardSplit", href: "#card-split", framework: "astro" },
      { label: "CardDescription", href: "#card-description", framework: "astro" },
      { label: "Spotlight", href: "#spotlight", framework: "astro" },
      { label: "LogoBox", href: "#logobox", framework: "astro" },
      { label: "H3Tagged", href: "#h3tagged", framework: "astro" },
      { label: "Experience Card", href: "#experience-card", framework: "astro" },
    ],
  },
  {
    title: "Slider",
    items: [
      { label: "Slider", href: "#slider", framework: "solid" },
    ],
  },
  {
    title: "Section",
    items: [
      { label: "Section Pattern", href: "#section-pattern", framework: "astro" },
    ],
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
    title: "Navigation",
    items: [
      { label: "BurgerIcon", href: "#burgericon", framework: "astro" },
      { label: "Sidebar", href: "#sidebar", framework: "astro" },
    ],
  },
  {
    title: "Hero",
    items: [
      { label: "HeroSubtitle", href: "#herosubtitle", framework: "astro" },
      { label: "Hero Title", href: "#hero-title", framework: "astro" },
      { label: "Tech Stack Tags", href: "#tech-tags", framework: "astro" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "Contact", href: "#contact-doc", framework: "astro" },
      { label: "ContactForm", href: "#contactform", framework: "solid" },
    ],
  },
  {
    title: "Footer",
    items: [
      { label: "Footer", href: "#footer-doc", framework: "astro" },
    ],
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
