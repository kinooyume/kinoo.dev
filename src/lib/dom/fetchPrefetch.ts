// Astro's built-in prefetch uses <link rel="prefetch"> which Firefox silently
// ignores (network.prefetch-next defaults to false). This does the same thing
// with fetch() so it works everywhere.
const prefetched = new Set<string>();
const listened = new WeakSet<HTMLAnchorElement>();

function prefetchUrl(url: string) {
  if (!canPrefetch(url)) return;
  prefetched.add(new URL(url, location.href).pathname);
  fetch(url, { priority: "low" } as RequestInit);
}

function canPrefetch(url: string) {
  try {
    const u = new URL(url, location.href);
    return u.origin === location.origin
      && u.pathname !== location.pathname
      && !prefetched.has(u.pathname);
  } catch { return false; }
}

// desktop: hover, mobile: touchstart before tap completes (no astro support for this yet)
function attachHover() {
  for (const a of document.getElementsByTagName("a")) {
    if (listened.has(a)) continue;
    listened.add(a);
    a.addEventListener("mouseenter", () => prefetchUrl(a.href), { passive: true });
  }
}

function attachTap() {
  for (const event of ["touchstart", "mousedown"] as const) {
    document.addEventListener(event, (e) => {
      const anchor = (e.target as Element).closest?.("a");
      if (anchor) prefetchUrl(anchor.href);
    }, { passive: true });
  }
}

export function initFetchPrefetch() {
  attachHover();
  attachTap();
  document.addEventListener("astro:page-load", attachHover);
}
