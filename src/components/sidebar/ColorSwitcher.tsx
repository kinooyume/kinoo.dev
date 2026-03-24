import { createSignal, For, onMount } from "solid-js";
import { accentColors, applyAccentColor, restoreAccentColor, type AccentColor } from "@/lib/colors";
import Dropdown, { dropdownStyles } from "@/components/shared/atoms/Dropdown/Dropdown";
import styles from "./ColorSwitcher.module.scss";

export default function ColorSwitcher() {
  const [selected, setSelected] = createSignal(accentColors[0]);

  function select(color: AccentColor) {
    setSelected(color);
    applyAccentColor(color);
  }

  onMount(() => {
    const restored = restoreAccentColor();
    if (restored) setSelected(restored);
  });

  return (
    <Dropdown
      trigger={() => (
        <>
          <span class={styles.swatch} style={{ "background-color": `var(${selected().base})` }} />
          <span class={styles.label}>{selected().name}</span>
        </>
      )}
    >
      <For each={accentColors}>
        {(color) => (
          <button
            classList={{ [dropdownStyles.option]: true, [dropdownStyles.optionActive]: color.name === selected().name }}
            onClick={() => select(color)}
          >
            <span class={styles.swatch} style={{ "background-color": `var(${color.base})` }} />
            {color.name}
          </button>
        )}
      </For>
    </Dropdown>
  );
}
