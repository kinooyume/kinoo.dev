import { createMousePosition } from "@solid-primitives/mouse";
import {
  type JSX,
  type Component,
  createSignal,
  createEffect,
  on,
  untrack,
} from "solid-js";

type Props = {
  children: JSX.Element;
};

const Spotlight: Component<Props> = (props) => {
  let spotElement: HTMLDivElement;

  const mousePos = createMousePosition();

  createEffect(() => {

  });

  return (
    <div
      class="relative h-full bg-slate-800 rounded-3xl p-px before:absolute before:w-80 before:h-80 before:-left-40 before:-top-40 before:bg-slate-400 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:group-hover:opacity-100 before:z-10 before:blur-[100px] after:absolute after:w-96 after:h-96 after:-left-48 after:-top-48 after:bg-indigo-500 after:rounded-full after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-500 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:hover:opacit-10 after:z-30 after:blur-[100px]  overflow-hidden"
      ref={spotElement!}
    >
      {props.children}
    </div>
  );
};

export default Spotlight;
