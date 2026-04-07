import { rafDebounce } from "./rafDebounce";

export interface MousePos {
  x: number;
  y: number;
}

type Subscriber = (pos: MousePos) => void;
type Unsubscribe = () => void;

let pos: MousePos | null = null;
const subs = new Set<Subscriber>();

let onMove: EventListener | null = null;
let onScroll: EventListener | null = null;
let onEnter: EventListener | null = null;
let onLeave: EventListener | null = null;
let onVisibility: (() => void) | null = null;

function notify() {
  if (!pos) return;
  for (const cb of subs) cb(pos);
}

function updatePos(e: Event) {
  const { clientX, clientY } = e as MouseEvent;
  pos = { x: clientX, y: clientY };
  notify();
}

function invalidate() { pos = null; }

function attach() {
  onMove = rafDebounce(updatePos);
  onScroll = rafDebounce(() => notify());
  onEnter = updatePos;
  onLeave = invalidate;
  onVisibility = () => { if (document.hidden) invalidate(); };

  document.addEventListener("mousemove", onMove);
  document.addEventListener("pointerenter", onEnter);
  document.addEventListener("pointerleave", onLeave);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("scroll", onScroll);
}

function detach() {
  if (onMove) document.removeEventListener("mousemove", onMove);
  if (onEnter) document.removeEventListener("pointerenter", onEnter);
  if (onLeave) document.removeEventListener("pointerleave", onLeave);
  if (onVisibility) document.removeEventListener("visibilitychange", onVisibility);
  if (onScroll) window.removeEventListener("scroll", onScroll);
  onMove = null;
  onScroll = null;
  onEnter = null;
  onLeave = null;
  onVisibility = null;
  pos = null;
}

export function peek(): MousePos | null {
  return pos;
}

export function subscribe(cb: Subscriber): Unsubscribe {
  if (subs.size === 0) attach();
  subs.add(cb);

  return () => {
    subs.delete(cb);
    if (subs.size === 0) detach();
  };
}

export function dispose() {
  detach();
  subs.clear();
  pos = null;
}
