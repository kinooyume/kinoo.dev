import { subscribe } from "./mousePosition";
import { gyroTracker } from "./gyroTracker";

const _isMobile = () => window.matchMedia("(hover: none)").matches;

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

  // TODO: re-enable gyroTracker for mobile when calibration is refined
  if (forceGyro) {
    return gyroTracker(container, (x, y) => {
      const rect = container.getBoundingClientRect();
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${x - (cardRect.left - rect.left)}px`);
        card.style.setProperty("--mouse-y", `${y - (cardRect.top - rect.top)}px`);
      });
    });
  }

  return subscribe((pos) => {
    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${pos.x - cardRect.left}px`);
      card.style.setProperty("--mouse-y", `${pos.y - cardRect.top}px`);
    });
  });
}
