import { rafDebounce } from "./rafDebounce";

/**
 * Tracks the mouse position relative to a container, updating on both
 * `mousemove` and `scroll` so the position stays accurate while scrolling.
 *
 * Calls the provided callback with container-relative coordinates,
 * throttled to one update per animation frame via {@link rafDebounce}.
 *
 * @param container - The element to track mouse movement over.
 * @param onUpdate - Called with `(x, y)` relative to the container's top-left.
 * @returns A cleanup function that removes the event listeners.
 */
export function mouseTracker(
  container: HTMLElement,
  onUpdate: (x: number, y: number) => void,
): () => void {
  let lastClientX = 0;
  let lastClientY = 0;

  const update = () => {
    const rect = container.getBoundingClientRect();
    onUpdate(lastClientX - rect.left, lastClientY - rect.top);
  };

  const onMouseMove = rafDebounce((e: Event) => {
    const { clientX, clientY } = e as MouseEvent;
    lastClientX = clientX;
    lastClientY = clientY;
    update();
  });

  const onScroll = rafDebounce(() => update());

  container.addEventListener("mousemove", onMouseMove);
  window.addEventListener("scroll", onScroll);

  return () => {
    container.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("scroll", onScroll);
  };
}
