const bus = new EventTarget();
const fired = new Set<string>();

export const on = (name: string, fn: () => void): (() => void) => {
  if (fired.has(name)) {
    queueMicrotask(fn);
    return () => {};
  }

  bus.addEventListener(name, fn, { once: true });
  return () => bus.removeEventListener(name, fn);
};

export const emit = (name: string): void => {
  fired.add(name);
  bus.dispatchEvent(new Event(name));
};
