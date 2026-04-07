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

function notify() {
  if (!pos) return;
  for (const cb of subs) cb(pos);
}

function updatePos(e: Event) {
  const { clientX, clientY } = e as MouseEvent;
  pos = { x: clientX, y: clientY };
  notify();
}

function attach() {
  onMove = rafDebounce(updatePos);
  onScroll = rafDebounce(() => notify());
  onEnter = updatePos;

  document.addEventListener("mousemove", onMove);
  document.addEventListener("pointerenter", onEnter);
  window.addEventListener("scroll", onScroll);
}

function detach() {
  if (onMove) document.removeEventListener("mousemove", onMove);
  if (onEnter) document.removeEventListener("pointerenter", onEnter);
  if (onScroll) window.removeEventListener("scroll", onScroll);
  onMove = null;
  onScroll = null;
  onEnter = null;
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
