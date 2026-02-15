import { createSignal, createSelector, createEffect, For, Show, onMount, onCleanup, type JSX } from "solid-js";
import { createStore } from "solid-js/store";
import {
  isGroup,
  type SidebarSection,
  type SidebarNode,
  type SidebarLeaf,
  type Framework,
} from "@/components/design-system/sections/index";
import { createViewDetection } from "@/lib/dom/viewDetection";
import { onScrollAndResize } from "@/lib/dom/onWindowEvent";
import SearchInput from "@/components/shared/atoms/SearchInput/SearchInput";
import astroIcon from "@/svgs/astro.svg?raw";
import solidIcon from "@/svgs/solid.svg?raw";
import styles from "./Sidebar.module.css";

const frameworkIcons: Record<Framework, string> = {
  astro: astroIcon,
  solid: solidIcon,
};

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
  title?: string;
  class?: string;
}

export default function Sidebar(props: Readonly<Props>) {
  const [query, setQuery] = createSignal("");
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

  function hasActiveLeaf(nodes: SidebarNode[]): boolean {
    return nodes.some((n) =>
      isGroup(n) ? hasActiveLeaf(n.children) : n.href === activeHref(),
    );
  }

  function sectionOpen(section: SidebarSection) {
    if (searching()) return true;
    const key = section.title.toLowerCase();
    return openSections[key] || hasActiveLeaf(section.items);
  }

  function handleSectionToggle(section: SidebarSection, el: HTMLDetailsElement) {
    if (searching()) return;
    if (!el.open && hasActiveLeaf(section.items)) return;
    setOpenSections(section.title.toLowerCase(), el.open);
  }

  function handleLinkClick(e: MouseEvent, href: string) {
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
    // scrollend won't fire if target is already in view (no scroll occurs)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (window.scrollY === startY) {
        window.removeEventListener("scrollend", clear);
        clear();
      }
    }));
  }

  createEffect(() => {
    const href = activeHref();
    const scroller = scrollRef();
    if (!href || !scroller) return;
    const link = scroller.querySelector(`a[href="${href}"]`);
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
    const wrapper = wrapperRef();
    if (!wrapper) return;

    const hrefByTarget = new Map<Element, string>();
    const elements: { dom: Element }[] = [];

    wrapper.querySelectorAll("a").forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href) return;
      const hashIdx = href.indexOf("#");
      if (hashIdx === -1) return;
      const target = document.querySelector(href.slice(hashIdx));
      if (!target) return;
      hrefByTarget.set(target, href);
      elements.push({ dom: target });
    });

    const detect = createViewDetection(elements, {
      setBounds: (offset) => [offset + 100, offset - 100],
      onBestMatch: (entry) => {
        if (scrollingTo) return;
        setActiveHref(entry ? hrefByTarget.get(entry.dom) ?? null : null);
      },
    });

    cleanupScroll = onScrollAndResize(detect, "sidebarDetection");
  });

  onCleanup(() => {
    cleanupScroll?.();
  });

  const renderLeaf = (leaf: SidebarLeaf) => (
    <li>
      <a
        href={leaf.href}
        classList={{ [styles.active]: isActive(leaf.href) }}
        onClick={(e) => handleLinkClick(e, leaf.href)}
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

  const renderNode = (node: SidebarNode, depth = 0): JSX.Element => {
    if (!isGroup(node)) return renderLeaf(node);
    return (
      <li class={styles.nestedGroup}>
        <details
          classList={{ [styles.sidebarNested]: true, [styles.depth2]: depth > 0 }}
          open={searching() || undefined}
        >
          <summary>{node.label}</summary>
          <ul>
            <For each={node.children}>
              {(child) => renderNode(child, depth + 1)}
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
              <summary>{section.title}</summary>
              <ul>
                <For each={section.items}>
                  {(item) => renderNode(item)}
                </For>
              </ul>
            </details>
          )}
        </For>
      </div>
    </div>
  );
}
