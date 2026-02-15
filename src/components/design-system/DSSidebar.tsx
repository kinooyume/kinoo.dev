import { createSignal, createEffect, For, Show, onMount, onCleanup, type JSX } from "solid-js";
import {
  sidebarSections,
  isGroup,
  type SidebarSection,
  type SidebarNode,
  type SidebarLeaf,
  type Framework,
} from "./sections/index";
import { onScrollAndResize } from "@/lib/dom/onWindowEvent";
import SearchInput from "@/components/shared/atoms/SearchInput/SearchInput";
import astroIcon from "@/svgs/astro.svg?raw";
import solidIcon from "@/svgs/solid.svg?raw";
import styles from "./DSSidebar.module.css";

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
  class?: string;
}

export default function DSSidebar(props: Props) {
  const [query, setQuery] = createSignal("");
  const [activeHref, setActiveHref] = createSignal<string | null>(null);
  const [manuallyOpened, setManuallyOpened] = createSignal(new Set<string>());
  const [wrapperRef, setWrapperRef] = createSignal<HTMLDivElement>();
  const [scrollRef, setScrollRef] = createSignal<HTMLDivElement>();

  let cleanupScroll: (() => void) | undefined;
  let initialLoad = true;
  let scrollingTo: string | null = null;
  let scrollTimeout: ReturnType<typeof setTimeout> | undefined;

  const searching = () => query().length > 0;

  const filteredSections = () =>
    searching() ? filterSections(sidebarSections, query()) : sidebarSections;

  const sectionHasActive = (section: SidebarSection) =>
    collectLeaves(section.items).some((l) => l.href === activeHref());

  function collectLeaves(nodes: SidebarNode[]): SidebarLeaf[] {
    return nodes.flatMap((n) => (isGroup(n) ? collectLeaves(n.children) : [n]));
  }

  function sectionOpen(section: SidebarSection) {
    if (searching()) return true;
    const key = section.title.toLowerCase();
    if (manuallyOpened().has(key)) return true;
    return sectionHasActive(section);
  }

  function handleSectionToggle(section: SidebarSection, el: HTMLDetailsElement) {
    if (searching()) return;
    const key = section.title.toLowerCase();
    setManuallyOpened((prev) => {
      const next = new Set(prev);
      if (el.open) {
        next.add(key);
      } else {
        next.delete(key);
        if (sectionHasActive(section)) return prev;
      }
      return next;
    });
  }

  function handleLinkClick(e: MouseEvent, href: string) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    scrollingTo = href;
    setActiveHref(href);
    history.replaceState(null, "", href);
    target.scrollIntoView({ behavior: "smooth" });

    clearTimeout(scrollTimeout);
    const settle = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollingTo = null;
        window.removeEventListener("scroll", settle);
      }, 100);
    };
    window.addEventListener("scroll", settle);
  }

  function scrollToActive(scroller: HTMLDivElement, link: Element) {
    const linkRect = link.getBoundingClientRect();
    const scrollRect = scroller.getBoundingClientRect();
    const topBound = scrollRect.top + SCROLL_PADDING;
    const bottomBound = scrollRect.bottom - SCROLL_PADDING;

    if (linkRect.top < topBound) {
      scroller.scrollBy({ top: linkRect.top - topBound, behavior: "smooth" });
    } else if (linkRect.bottom > bottomBound) {
      scroller.scrollBy({ top: linkRect.bottom - bottomBound, behavior: "smooth" });
    }
  }

  createEffect(() => {
    const href = activeHref();
    const scroller = scrollRef();
    if (!href || !scroller) return;
    const link = scroller.querySelector(`a[href="${href}"]`);
    if (link) scrollToActive(scroller, link);
  });

  onMount(() => {
    const wrapper = wrapperRef();
    if (!wrapper) return;

    const anchors = wrapper.querySelectorAll("a");
    const entries: { href: string; target: Element }[] = [];
    anchors.forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href) return;
      const hashIdx = href.indexOf("#");
      if (hashIdx === -1) return;
      const target = document.querySelector(href.slice(hashIdx));
      if (target) entries.push({ href, target });
    });

    function detect() {
      if (scrollingTo) return;

      const offset = window.innerHeight / 2;
      const min = offset + 100;
      const max = offset - 100;

      let best: string | null = null;
      let bestDist = Infinity;

      for (const { href, target } of entries) {
        const rect = target.getBoundingClientRect();
        if (rect.top <= min && rect.bottom >= max) {
          const dist = Math.abs(rect.top);
          if (dist < bestDist) {
            best = href;
            bestDist = dist;
          }
        }
      }

      setActiveHref(best);
      if (best && !initialLoad) {
        history.replaceState(null, "", best);
      }
    }

    cleanupScroll = onScrollAndResize(detect, "designSystemDetection");
    window.addEventListener("scroll", () => { initialLoad = false; }, { once: true });
  });

  onCleanup(() => {
    cleanupScroll?.();
    clearTimeout(scrollTimeout);
  });

  const renderLeaf = (leaf: SidebarLeaf) => (
    <li>
      <a
        href={leaf.href}
        classList={{ [styles.active]: activeHref() === leaf.href }}
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

  const renderNode = (node: SidebarNode): JSX.Element => {
    if (!isGroup(node)) return renderLeaf(node as SidebarLeaf);
    return (
      <li class={styles.nestedGroup}>
        <details class={styles.sidebarNested} open={searching() || undefined}>
          <summary>{node.label}</summary>
          <ul>
            <For each={node.children}>
              {(child) => {
                if (!isGroup(child)) return renderLeaf(child as SidebarLeaf);
                return (
                  <li class={styles.nestedGroup}>
                    <details class={`${styles.sidebarNested} ${styles.depth2}`} open={searching() || undefined}>
                      <summary>{child.label}</summary>
                      <ul>
                        <For each={child.children}>
                          {(leaf) => renderLeaf(leaf as SidebarLeaf)}
                        </For>
                      </ul>
                    </details>
                  </li>
                );
              }}
            </For>
          </ul>
        </details>
      </li>
    );
  };

  return (
    <div ref={setWrapperRef} class={`${styles.sidebarWrapper} ${props.class ?? ""}`}>
      <div class={styles.sidebarHeader}>
        <span class={styles.sidebarTitle}>Design System</span>
      </div>
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
