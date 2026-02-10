export type HeroAnimationStatus = "completed" | "cancelled";

type Listener = (status: HeroAnimationStatus) => void;

const EVENT = "done";
const bus = new EventTarget();
let firedStatus: HeroAnimationStatus | null = null;

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

export const emitHeroAnimationComplete = (status: HeroAnimationStatus): void => {
  firedStatus = status;
  bus.dispatchEvent(new CustomEvent(EVENT, { detail: status }));
};
