import { createSignal, For, type JSX } from "solid-js";
import { accentColors, type AccentColor } from "@/lib/colors";
import styles from "./ChromaticPreview.module.scss";

const defaultColor = accentColors[0];

function cssVars(color: AccentColor): Record<string, string> {
  return {
    "--accent-color": `var(${color.base})`,
    "--accent-bright": `var(${color.bright})`,
    "--accent-tint": `var(${color.tint})`,
    "--secondary-accent-color": `var(${color.secondary})`,
  };
}

export default function ChromaticPreview(props: { children?: JSX.Element; class?: string }) {
  const [selected, setSelected] = createSignal<AccentColor>(defaultColor);

  return (
    <div classList={{ [styles.preview]: true, [props.class ?? ""]: !!props.class }}>
      <div class={styles.toolbar}>
        <For each={accentColors}>
          {(color) => (
            <button
              classList={{ [styles.dot]: true, [styles.active]: color.name === selected().name }}
              onClick={() => setSelected(color)}
              title={color.name}
              style={{ "--dot-color": `var(${color.base})` }}
            />
          )}
        </For>
      </div>
      <div class={styles.content} style={cssVars(selected())}>
        {props.children}
      </div>
    </div>
  );
}
