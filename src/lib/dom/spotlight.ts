import { mouseTracker } from "./mouseTracker";
import { gyroTracker } from "./gyroTracker";

const isMobile = () => window.matchMedia("(hover: none)").matches;

let forceGyro = false;

/** Forces all spotlight instances to use the gyro tracker (dev only). */
export function setForceGyro(value: boolean) {
  forceGyro = value;
}

/**
 * Initialises a spotlight hover effect on a container.
 *
 * On desktop, tracks mouse movement. On mobile, uses the device
 * gyroscope to derive spotlight position from tilt angles.
 *
 * Both paths update `--mouse-x` / `--mouse-y` CSS custom properties
 * on every child matching `[data-spotlight-card]`.
 *
 * @param container - The parent element that receives the listener.
 * @returns A cleanup function that removes the listener.
 */
export function spotlight(container: HTMLElement): () => void {
  const cards = Array.from(
    container.querySelectorAll<HTMLElement>("[data-spotlight-card]"),
  );

  const track = forceGyro || isMobile() ? gyroTracker : mouseTracker;

  return track(container, (x, y) => {
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
