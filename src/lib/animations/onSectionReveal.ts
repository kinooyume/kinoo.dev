const bus = new EventTarget();
const revealed = new Set<string>();

const eventName = (id: string) => `reveal:${id}`;

export const onSectionReveal = (
  sectionId: string,
  fn: () => void,
): (() => void) => {
  if (revealed.has(sectionId)) {
    queueMicrotask(fn);
    return () => {};
  }

  const name = eventName(sectionId);
  bus.addEventListener(name, fn, { once: true });
  return () => bus.removeEventListener(name, fn);
};

export const emitSectionReveal = (sectionId: string): void => {
  revealed.add(sectionId);
  bus.dispatchEvent(new Event(eventName(sectionId)));
};
