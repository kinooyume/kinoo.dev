import { createSignal, Show, onMount, onCleanup, type JSX, type Accessor } from "solid-js";
import styles from "./Dropdown.module.scss";

export interface DropdownProps {
  trigger: (open: Accessor<boolean>) => JSX.Element;
  children: JSX.Element;
  class?: string;
}

export default function Dropdown(props: Readonly<DropdownProps>) {
  const [open, setOpen] = createSignal(false);
  const [ref, setRef] = createSignal<HTMLDivElement>();

  function handleClickOutside(e: MouseEvent) {
    const el = ref();
    if (el && !el.contains(e.target as Node)) setOpen(false);
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    onCleanup(() => document.removeEventListener("click", handleClickOutside));
  });

  return (
    <div ref={setRef} class={`${styles.dropdown} ${props.class ?? ""}`}>
      <button class={styles.trigger} onClick={() => setOpen((o) => !o)}>
        {props.trigger(open)}
        <span classList={{ [styles.chevron]: true, [styles.chevronOpen]: open() }}>▾</span>
      </button>
      <Show when={open()}>
        <div class={styles.panel} role="menu" onClick={() => setOpen(false)} onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}>
          {props.children}
        </div>
      </Show>
    </div>
  );
}

export { styles as dropdownStyles };
