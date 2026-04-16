export type Framework = "astro" | "solid";
export type SidebarLeaf = { label: string; href: string; framework?: Framework };
export type SidebarGroup = { label: string; children: SidebarNode[] };
export type SidebarNode = SidebarLeaf | SidebarGroup;
export type SidebarSection = { title: string; slug: string; items: SidebarNode[]; devOnly?: boolean };

export const isGroup = (node: SidebarNode): node is SidebarGroup =>
  "children" in node;

export const DS_BASE = "/design-system";

export type PaginationLink = { label: string; slug: string; href: string };

export function getPrevNext(currentSlug?: string): {
  prev?: PaginationLink;
  next?: PaginationLink;
} {
  const idx = sidebarSections.findIndex((s) => s.slug === currentSlug);
  if (idx === -1) return {};
  const prev = idx > 0 ? sidebarSections[idx - 1] : undefined;
  const next =
    idx < sidebarSections.length - 1 ? sidebarSections[idx + 1] : undefined;
  return {
    prev: prev
      ? { label: prev.title, slug: prev.slug, href: `${DS_BASE}/${prev.slug}` }
      : undefined,
    next: next
      ? { label: next.title, slug: next.slug, href: `${DS_BASE}/${next.slug}` }
      : undefined,
  };
}

export const sidebarSections: SidebarSection[] = [
  // Foundations & primitives
  {
    title: "Foundations",
    slug: "foundations",
    items: [
      { label: "Colors", href: "#colors" },
      { label: "Typography", href: "#typography" },
      { label: "Borders", href: "#borders" },
      { label: "Interactions", href: "#interactions" },
      { label: "Breakpoints", href: "#breakpoints" },
    ],
  },
  {
    title: "Atoms",
    slug: "atoms",
    items: [
      { label: "Button", href: "#button", framework: "solid" },
      { label: "Link", href: "#link", framework: "astro" },
      { label: "IconButton", href: "#iconbutton", framework: "astro" },
      { label: "IconLink", href: "#iconlink", framework: "astro" },
      { label: "Dropdown", href: "#dropdown", framework: "solid" },
      { label: "NavCard", href: "#navcard", framework: "astro" },
      { label: "Tag", href: "#tag", framework: "astro" },
      { label: "TagRow", href: "#tagrow", framework: "astro" },
    ],
  },
  // Composed components
  {
    title: "Card",
    slug: "cards",
    items: [
      { label: "Spotlight", href: "#spotlight", framework: "astro" },
      { label: "LogoBox", href: "#logobox", framework: "astro" },
      { label: "H3Tagged", href: "#h3tagged", framework: "astro" },
      { label: "Card", href: "#card", framework: "astro" },
      { label: "CardContent", href: "#card-content", framework: "astro" },
      { label: "CardTitle", href: "#card-title", framework: "astro" },
      { label: "CardDescription", href: "#card-description", framework: "astro" },
      { label: "CardSplit", href: "#card-split", framework: "astro" },
      { label: "Experience Card", href: "#experience-card", framework: "astro" },
    ],
  },
  {
    title: "Diagram",
    slug: "diagram",
    items: [
      { label: "Diagram", href: "#diagram", framework: "astro" },
      { label: "DiagramStack", href: "#diagram-stack", framework: "astro" },
      { label: "DiagramArrow", href: "#diagram-arrow", framework: "astro" },
      { label: "DiagramFlow", href: "#diagram-flow", framework: "astro" },
      { label: "DiagramTree", href: "#diagram-tree", framework: "astro" },
      { label: "DiagramCompare", href: "#diagram-compare", framework: "astro" },
      { label: "DiagramCycle", href: "#diagram-cycle", framework: "astro" },
      { label: "DiagramPageMap", href: "#diagram-pagemap", framework: "astro" },
    ],
  },
  {
    title: "Slider",
    slug: "slider",
    items: [
      { label: "Slider", href: "#slider", framework: "solid" },
    ],
  },
  {
    title: "Form",
    slug: "forms",
    items: [
      { label: "Input", href: "#input", framework: "solid" },
      { label: "SearchInput", href: "#searchinput", framework: "solid" },
      { label: "Textarea", href: "#textarea", framework: "solid" },
      { label: "FormField", href: "#formfield", framework: "solid" },
    ],
  },
  // Page regions (top → bottom)
  {
    title: "Header",
    slug: "header",
    items: [
      { label: "Header", href: "#header", framework: "astro" },
      { label: "HeaderMenu", href: "#headermenu", framework: "astro" },
      { label: "HeaderLink", href: "#headerlink", framework: "astro" },
      { label: "NavBar", href: "#navbar", framework: "astro" },
    ],
  },
  {
    title: "Navigation",
    slug: "navigation",
    items: [
      { label: "BurgerIcon", href: "#burgericon", framework: "astro" },
      { label: "Sidebar", href: "#sidebar", framework: "solid" },
      { label: "ColorSwitcher", href: "#colorswitcher", framework: "solid" },
    ],
  },
  {
    title: "Hero",
    slug: "hero",
    items: [
      { label: "HeroSubtitle", href: "#herosubtitle", framework: "astro" },
      { label: "Hero Title", href: "#hero-title", framework: "astro" },
      { label: "Tech Stack Tags", href: "#tech-tags", framework: "astro" },
    ],
  },
  {
    title: "Section",
    slug: "sections",
    items: [
      { label: "Section Pattern", href: "#section-pattern", framework: "astro" },
    ],
  },
  {
    title: "Articles",
    slug: "articles",
    items: [
      { label: "Prose", href: "#prose" },
      { label: "ArticleCard", href: "#articlecard", framework: "astro" },
    ],
  },
  {
    title: "Contact",
    slug: "contact",
    items: [
      { label: "Contact", href: "#contact-doc", framework: "astro" },
      { label: "ContactForm", href: "#contactform", framework: "solid" },
      { label: "FloatingContact", href: "#floatingcontact", framework: "astro" },
    ],
  },
  {
    title: "Footer",
    slug: "footer",
    items: [
      { label: "Footer", href: "#footer-doc", framework: "astro" },
    ],
  },
  // Cross-cutting
  {
    title: "Animations",
    slug: "animations",
    items: [
      { label: "RevealText", href: "#revealtext", framework: "astro" },
      { label: "Header Animation", href: "#header-animation" },
      { label: "Section Reveal", href: "#section-reveal" },
      { label: "Card Reveal", href: "#card-reveal" },
    ],
  },
  {
    title: "Templates",
    slug: "templates",
    items: [
      { label: "Form Page", href: "#template-form" },
      { label: "Product Cards", href: "#template-products" },
    ],
  },
  {
    title: "Experimental · Dual Tone",
    slug: "experimental",
    devOnly: true,
    items: [
      { label: "Overview", href: "#dual-tone" },
      { label: "Base", href: "#dt-base" },
      { label: "Deep shift", href: "#dt-deep" },
      { label: "Warm shift", href: "#dt-warm" },
      { label: "Cool shift", href: "#dt-cool" },
      { label: "Complementary", href: "#dt-complementary" },
      { label: "Desaturated", href: "#dt-desaturated" },
      { label: "Monochrome", href: "#dt-monochrome" },
      { label: "Card Title", href: "#dt-card-title" },
      { label: "Spotlight Effects", href: "#dual-tone-effects" },
    ],
  },
  {
    title: "DS Components",
    slug: "ds-components",
    items: [
      { label: "DSBlock", href: "#ds-block", framework: "astro" },
      { label: "DSPreview", href: "#ds-preview", framework: "astro" },
      { label: "DSCode", href: "#ds-code", framework: "astro" },
      { label: "DSPropsTable", href: "#ds-propstable", framework: "astro" },
      { label: "DSStructure", href: "#ds-structure", framework: "astro" },
      { label: "DSNote", href: "#ds-note", framework: "astro" },
      { label: "DSWipNotice", href: "#ds-wip-notice", framework: "astro" },
      { label: "ChromaticPreview", href: "#ds-chromatic-preview", framework: "solid" },
      { label: "DSColorSwatch", href: "#ds-color-swatch", framework: "astro" },
    ],
  },
];
