const EVENT = "complete";
const bus = new EventTarget();
let fired = false;

/**
 * Registers a callback that runs once the hero animation has completed.
 *
 * If the event has already fired, the callback is invoked on the next
 * microtask. Otherwise it waits for the internal event.
 *
 * @param fn - Callback to invoke once the hero animation is done.
 * @returns A cleanup function that removes the listener (no-op if already fired).
 */
export const onHeroAnimationComplete = (fn: () => void): (() => void) => {
  if (fired) {
    queueMicrotask(fn);
    return () => {};
  }

  const handler = () => fn();
  bus.addEventListener(EVENT, handler, { once: true });
  return () => bus.removeEventListener(EVENT, handler);
};

/**
 * Marks the hero animation as complete and notifies all subscribers.
 *
 * Should be called exactly once by the hero animation code.
 */
export const emitHeroAnimationComplete = (): void => {
  fired = true;
  bus.dispatchEvent(new Event(EVENT));
};
