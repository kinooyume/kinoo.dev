export function createEventBus() {
  const target = new EventTarget();
  const fired = new Set<string>();

  return {
    on(event: string, fn: () => void): () => void {
      if (fired.has(event)) {
        queueMicrotask(fn);
        return () => {};
      }
      target.addEventListener(event, fn, { once: true });
      return () => target.removeEventListener(event, fn);
    },

    emit(event: string): void {
      fired.add(event);
      target.dispatchEvent(new Event(event));
    },
  };
}
