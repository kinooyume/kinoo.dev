import { mouseTracker } from "./mouseTracker";

/**
 * Initialises a spotlight hover effect on a container.
 *
 * Tracks mouse movement over the container and updates `--mouse-x` /
 * `--mouse-y` CSS custom properties on every child matching
 * `[data-spotlight-card]`, enabling a per-card radial-gradient highlight.
 *
 * @param container - The parent element that receives the `mousemove` listener.
 * @returns A cleanup function that removes the listener.
 */
export function spotlight(container: HTMLElement): () => void {
  const cards = Array.from(
    container.querySelectorAll<HTMLElement>("[data-spotlight-card]"),
  );

  return mouseTracker(container, (x, y) => {
    const rect = container.getBoundingClientRect();
    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardX = x - (cardRect.left - rect.left);
      const cardY = y - (cardRect.top - rect.top);
      card.style.setProperty("--mouse-x", `${cardX}px`);
      card.style.setProperty("--mouse-y", `${cardY}px`);
    });
  });
}
