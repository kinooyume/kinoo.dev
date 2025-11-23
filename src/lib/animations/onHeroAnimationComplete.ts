export type HeroAnimationStatus = "completed" | "cancelled";

type Listener = (status: HeroAnimationStatus) => void;

const EVENT = "done";
const bus = new EventTarget();
let firedStatus: HeroAnimationStatus | null = null;

/**
 * Registers a callback that runs once the hero animation is done.
 *
 * The callback receives a status:
 * - `"completed"` — animation played to the end naturally.
 * - `"cancelled"` — user scrolled during the animation, it was fast-forwarded.
 *
 * If the event has already fired, the callback is invoked on the next
 * microtask with the stored status.
 *
 * @param fn - Callback to invoke with the animation status.
 * @returns A cleanup function that removes the listener (no-op if already fired).
 */
export const onHeroAnimationComplete = (fn: Listener): (() => void) => {
  if (firedStatus) {
    const status = firedStatus;
    queueMicrotask(() => fn(status));
    return () => {};
  }

  const handler = (e: Event) => fn((e as CustomEvent<HeroAnimationStatus>).detail);
  bus.addEventListener(EVENT, handler, { once: true });
  return () => bus.removeEventListener(EVENT, handler);
};

/**
 * Marks the hero animation as done and notifies all subscribers.
 *
 * Should be called exactly once by the hero animation code.
 *
 * @param status - Whether the animation completed naturally or was cancelled.
 */
export const emitHeroAnimationComplete = (status: HeroAnimationStatus): void => {
  firedStatus = status;
  bus.dispatchEvent(new CustomEvent(EVENT, { detail: status }));
};
