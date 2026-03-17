import { createSignal, For, Show, onMount, onCleanup } from "solid-js";
import { accentColors, applyAccentColor, type AccentColor } from "@/lib/colors";
import styles from "./ColorSwitcher.module.scss";

export default function ColorSwitcher() {
  const [open, setOpen] = createSignal(false);
  const [selected, setSelected] = createSignal(accentColors[0]);
  const [ref, setRef] = createSignal<HTMLDivElement>();

  function select(color: AccentColor) {
    setSelected(color);
    applyAccentColor(color);
    setOpen(false);
  }

  function handleClickOutside(e: MouseEvent) {
    const el = ref();
    if (el && !el.contains(e.target as Node)) setOpen(false);
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    onCleanup(() => document.removeEventListener("click", handleClickOutside));
  });

  return (
    <div ref={setRef} class={styles.switcher}>
      <button class={styles.trigger} onClick={() => setOpen((o) => !o)}>
        <span class={styles.swatch} style={{ "background-color": `var(${selected().base})` }} />
        <span class={styles.label}>{selected().name}</span>
        <span classList={{ [styles.chevron]: true, [styles.chevronOpen]: open() }}>▾</span>
      </button>
      <Show when={open()}>
        <div class={styles.dropdown}>
          <For each={accentColors}>
            {(color) => (
              <button
                classList={{ [styles.option]: true, [styles.optionActive]: color.name === selected().name }}
                onClick={() => select(color)}
              >
                <span class={styles.swatch} style={{ "background-color": `var(${color.base})` }} />
                {color.name}
              </button>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
