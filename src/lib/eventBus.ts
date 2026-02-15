/**
 * Creates a one-shot event bus. Each event fires once — late listeners
 * are called immediately with `queueMicrotask`.
 */
export function createEventBus() {
  const target = new EventTarget();
  const fired = new Set<string>();

  return {
    /** Listen for an event. Returns an unsubscribe function. */
    on(event: string, fn: () => void): () => void {
      if (fired.has(event)) {
        queueMicrotask(fn);
        return () => {};
      }
      target.addEventListener(event, fn, { once: true });
      return () => target.removeEventListener(event, fn);
    },

    /** Emit an event. Subsequent calls with the same name are no-ops. */
    emit(event: string): void {
      fired.add(event);
      target.dispatchEvent(new Event(event));
    },
  };
}
