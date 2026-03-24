import { createSignal, createSelector, createEffect, For, Show, onMount, onCleanup, type JSX } from "solid-js";
import { createStore } from "solid-js/store";
import {
  isGroup,
  DS_BASE,
  type SidebarSection,
  type SidebarNode,
  type SidebarLeaf,
  type Framework,
} from "@/components/design-system/sections/index";
import { createViewDetection } from "@/lib/dom/viewDetection";
import { onScrollAndResize } from "@/lib/dom/onWindowEvent";
import SearchInput from "@/components/shared/atoms/SearchInput/SearchInput";
import ColorSwitcher from "./ColorSwitcher";
import astroIcon from "@/svgs/astro.svg?raw";
import solidIcon from "@/svgs/solid.svg?raw";
import styles from "./Sidebar.module.scss";

const frameworkIcons: Record<Framework, string> = {
  astro: astroIcon,
  solid: solidIcon,
};

function slugFromUrl(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const match = location.pathname.match(new RegExp(`^${DS_BASE}/([^/]+)`));
  return match?.[1];
}

function filterSections(sections: SidebarSection[], q: string): SidebarSection[] {
  const lower = q.toLowerCase();
  return sections.reduce<SidebarSection[]>((acc, section) => {
    const filtered = filterNodes(section.items, lower);
    if (filtered.length) acc.push({ ...section, items: filtered });
    return acc;
  }, []);
}

function filterNodes(nodes: SidebarNode[], q: string): SidebarNode[] {
  return nodes.reduce<SidebarNode[]>((acc, node) => {
    if (isGroup(node)) {
      const children = filterNodes(node.children, q);
      if (children.length) acc.push({ ...node, children });
    } else if (node.label.toLowerCase().includes(q)) {
      acc.push(node);
    }
    return acc;
  }, []);
}

const SCROLL_PADDING = 80;

interface Props {
  sections: SidebarSection[];
  currentSlug?: string;
  title?: string;
  class?: string;
  showColorSwitcher?: boolean;
}

export default function Sidebar(props: Readonly<Props>) {
  const [query, setQuery] = createSignal("");
  // eslint-disable-next-line solid/reactivity
  const [currentSlug, setCurrentSlug] = createSignal(props.currentSlug ?? slugFromUrl());
  const [activeHref, setActiveHref] = createSignal<string | null>(null);
  const isActive = createSelector(activeHref);
  const [openSections, setOpenSections] = createStore<Record<string, boolean>>({});
  const [wrapperRef, setWrapperRef] = createSignal<HTMLDivElement>();
  const [scrollRef, setScrollRef] = createSignal<HTMLDivElement>();

  let cleanupScroll: (() => void) | undefined;
  let scrollingTo: string | null = null;

  const searching = () => query().length > 0;

  const filteredSections = () =>
    searching() ? filterSections(props.sections, query()) : props.sections;

  const isCurrentSection = (section: SidebarSection) =>
    currentSlug() === section.slug;

  function resolveHref(section: SidebarSection, hash: string): string {
    if (isCurrentSection(section)) return hash;
    return `${DS_BASE}/${section.slug}${hash}`;
  }

  function hasActiveLeaf(nodes: SidebarNode[], section: SidebarSection): boolean {
    return nodes.some((n) =>
      isGroup(n) ? hasActiveLeaf(n.children, section) : resolveHref(section, n.href) === activeHref(),
    );
  }

  function sectionOpen(section: SidebarSection) {
    if (searching()) return true;
    if (isCurrentSection(section)) return true;
    const key = section.title.toLowerCase();
    return openSections[key] || hasActiveLeaf(section.items, section);
  }

  function handleSectionToggle(section: SidebarSection, el: HTMLDetailsElement) {
    if (searching()) return;
    if (!el.open && (isCurrentSection(section) || hasActiveLeaf(section.items, section))) return;
    setOpenSections(section.title.toLowerCase(), el.open);
  }

  function handleLinkClick(e: MouseEvent, href: string) {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    setActiveHref(href);
    history.replaceState(null, "", href);
    scrollingTo = href;

    const startY = window.scrollY;
    target.scrollIntoView({ behavior: "smooth" });

    const clear = () => { scrollingTo = null; };
    window.addEventListener("scrollend", clear, { once: true });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (window.scrollY === startY) {
        window.removeEventListener("scrollend", clear);
        clear();
      }
    }));
  }

  function setupScrollDetection() {
    cleanupScroll?.();
    cleanupScroll = undefined;

    const wrapper = wrapperRef();
    if (!wrapper) return;

    const hrefByTarget = new Map<Element, string>();
    const elements: { dom: Element }[] = [];

    wrapper.querySelectorAll("a").forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;
      hrefByTarget.set(target, href);
      elements.push({ dom: target });
    });

    if (!elements.length) return;

    const detect = createViewDetection(elements, {
      setBounds: (offset) => [offset + 100, offset - 100],
      onBestMatch: (entry) => {
        if (scrollingTo) return;
        setActiveHref(entry ? hrefByTarget.get(entry.dom) ?? null : null);
      },
    });

    cleanupScroll = onScrollAndResize(detect, "sidebarDetection");
  }

  createEffect(() => {
    const href = activeHref();
    const scroller = scrollRef();
    if (!href || !scroller) return;
    const link = scroller.querySelector(`a[href="${CSS.escape(href)}"]`);
    if (!link) return;
    const linkRect = link.getBoundingClientRect();
    const scrollRect = scroller.getBoundingClientRect();
    if (linkRect.top < scrollRect.top + SCROLL_PADDING) {
      scroller.scrollBy({ top: linkRect.top - scrollRect.top - SCROLL_PADDING, behavior: "smooth" });
    } else if (linkRect.bottom > scrollRect.bottom - SCROLL_PADDING) {
      scroller.scrollBy({ top: linkRect.bottom - scrollRect.bottom + SCROLL_PADDING, behavior: "smooth" });
    }
  });

  onMount(() => {
    setupScrollDetection();

    const onPageLoad = () => {
      setCurrentSlug(slugFromUrl());
      setActiveHref(null);
      requestAnimationFrame(() => setupScrollDetection());
    };

    document.addEventListener("astro:page-load", onPageLoad);
    onCleanup(() => {
      document.removeEventListener("astro:page-load", onPageLoad);
      cleanupScroll?.();
    });
  });

  const renderLeaf = (leaf: SidebarLeaf, section: SidebarSection) => {
    const href = () => resolveHref(section, leaf.href);
    const isHash = () => href().startsWith("#");
    return (
      <li>
        <a
          href={href()}
          classList={{ [styles.active]: isActive(href()) }}
          onClick={(e) => { if (isHash()) handleLinkClick(e, href()); }}
        >
          <Show when={leaf.framework}>
            {(fw) => (
              <span class={styles.frameworkIcon} ref={(el) => { el.innerHTML = frameworkIcons[fw()]; }} />
            )}
          </Show>
          {leaf.label}
        </a>
      </li>
    );
  };

  const renderNode = (node: SidebarNode, section: SidebarSection, depth = 0): JSX.Element => {
    if (!isGroup(node)) return renderLeaf(node, section);
    return (
      <li class={styles.nestedGroup}>
        <details
          classList={{ [styles.sidebarNested]: true, [styles.depth2]: depth > 0 }}
          open={searching() || undefined}
        >
          <summary>{node.label}</summary>
          <ul>
            <For each={node.children}>
              {(child) => renderNode(child, section, depth + 1)}
            </For>
          </ul>
        </details>
      </li>
    );
  };

  return (
    <div ref={setWrapperRef} classList={{ [styles.sidebarWrapper]: true, [props.class ?? ""]: !!props.class }}>
      <Show when={props.title}>
        <div class={styles.sidebarHeader}>
          <span class={styles.sidebarTitle}>{props.title}</span>
        </div>
      </Show>
      <Show when={props.showColorSwitcher}>
        <ColorSwitcher />
      </Show>
      <SearchInput
        placeholder="Search…"
        value={query()}
        onInput={(e) => setQuery(e.currentTarget.value)}
      />
      <div ref={setScrollRef} class={styles.sidebarScroll}>
        <For each={filteredSections()}>
          {(section) => (
            <details
              class={styles.sidebarSection}
              data-section={section.title.toLowerCase()}
              open={sectionOpen(section) || undefined}
              onToggle={(e) => handleSectionToggle(section, e.currentTarget)}
            >
              <summary>
                <Show when={!isCurrentSection(section)} fallback={section.title}>
                  <a href={`${DS_BASE}/${section.slug}`} class={styles.sectionLink}>
                    {section.title}
                  </a>
                </Show>
              </summary>
              <ul>
                <For each={section.items}>
                  {(item) => renderNode(item, section)}
                </For>
              </ul>
            </details>
          )}
        </For>
      </div>
    </div>
  );
}
