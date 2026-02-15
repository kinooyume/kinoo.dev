/** An element observed by {@link createViewDetection}. */
interface ViewDetectionElement {
  dom: Element;
  /** Called when the element is inside the detection bounds. */
  onInside?: () => void;
  /** Called when the element is outside the detection bounds. */
  onOutside?: () => void;
}

/** Options for {@link createViewDetection}. */
interface ViewDetectionOptions {
  /** Derives the offset from the viewport height. Defaults to half the viewport. */
  setOffset?: (height: number) => number;
  /** Derives `[min, max]` bounds from the offset. Defaults to `[offset, offset]`. */
  setBounds?: (offset: number) => number[];
  /** When set, called with the single closest in-bounds element (or null). */
  onBestMatch?: (entry: ViewDetectionElement | null) => void;
}

/**
 * Creates a view detection function that checks whether elements are within
 * a defined viewport region.
 *
 * @param elements - The elements to observe.
 * @param options - Optional configuration for offset and bounds calculation.
 * @returns A parameter-less detection function. The caller is responsible for invoking it (e.g. on scroll/resize).
 */
export const createViewDetection = (
  elements: ViewDetectionElement[],
  {
    setOffset = (height: number) => height / 2,
    setBounds = (offset: number) => [offset, offset],
    onBestMatch,
  }: ViewDetectionOptions = {},
): (() => void) => {
  return () => {
    const offset = setOffset(window.innerHeight);
    const [min, max] = setBounds(offset);

    let best: ViewDetectionElement | null = null;
    let bestDist = Infinity;

    elements.forEach((entry) => {
      const rect = entry.dom.getBoundingClientRect();
      if (rect.top <= min && rect.bottom >= max) {
        entry.onInside?.();
        const dist = Math.abs(rect.top);
        if (dist < bestDist) { best = entry; bestDist = dist; }
      } else {
        entry.onOutside?.();
      }
    });

    onBestMatch?.(best);
  };
};

/** Options for {@link anchorsQueryToViewDetectionElement}. */
interface AnchorDetectionOptions {
  /** Called when a target section is inside the detection bounds. Defaults to a no-op. */
  onInside?: (element: Element) => void;
  /** Called when a target section is outside the detection bounds. Defaults to a no-op. */
  onOutside?: (element: Element) => void;
}

/**
 * Queries anchor elements and resolves their `href` targets into
 * {@link ViewDetectionElement} entries.
 *
 * Anchors without an `href` or whose target cannot be found in the DOM are
 * skipped.
 *
 * @param query - CSS selector matching the anchor elements.
 * @param options - Optional callbacks invoked when a target enters or leaves the detection bounds.
 * @returns An array of {@link ViewDetectionElement} for each resolved target.
 */
export const anchorsQueryToViewDetectionElement = (
  query: string,
  {
    onInside = (_) => {},
    onOutside = (_) => {},
  }: AnchorDetectionOptions = {},
): ViewDetectionElement[] => {
  const anchors = document.querySelectorAll(query);

  return Array.from(anchors).reduce((acc, anchor) => {
    const href = anchor.getAttribute("href");
    if (!href) return acc;

    // Extract hash from href (handles both "#section" and "/#section" formats)
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return acc;
    const hash = href.slice(hashIndex);

    const target = document.querySelector(hash);
    if (!target) return acc;

    return [
      ...acc,
      {
        dom: target,
        onInside: () => onInside(anchor),
        onOutside: () => onOutside(anchor),
      },
    ];
  }, [] as ViewDetectionElement[]);
};
