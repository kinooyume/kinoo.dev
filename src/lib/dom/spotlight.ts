import { rafDebounce } from "./rafDebounce";

/**
 * Initialises a spotlight hover effect on a container.
 *
 * Tracks mouse movement over the container and updates `--mouse-x` /
 * `--mouse-y` CSS custom properties on every child matching
 * `[data-spotlight-card]`, enabling a per-card radial-gradient highlight.
 *
 * The listener is throttled to one update per animation frame via
 * {@link rafDebounce}.
 *
 * @param container - The parent element that receives the `mousemove` listener.
 * @returns A cleanup function that removes the listener.
 */
export function spotlight(container: HTMLElement): () => void {
  const cards = Array.from(
    container.querySelectorAll<HTMLElement>("[data-spotlight-card]"),
  );

  function onMouseMove(e: Event) {
    const { clientX, clientY } = e as MouseEvent;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardX = x - (cardRect.left - rect.left);
      const cardY = y - (cardRect.top - rect.top);
      card.style.setProperty("--mouse-x", `${cardX}px`);
      card.style.setProperty("--mouse-y", `${cardY}px`);
    });
  }

  const onMouseMoveRaf = rafDebounce(onMouseMove);

  container.addEventListener("mousemove", onMouseMoveRaf);

  return () => {
    container.removeEventListener("mousemove", onMouseMoveRaf);
  };
}
