import { createSignal, For } from "solid-js";
import Dropdown, { dropdownStyles } from "./Dropdown";

const options = ["Option A", "Option B", "Option C"];

export default function DropdownDemo() {
  const [selected, setSelected] = createSignal(options[0]);

  return (
    <Dropdown trigger={() => <span>{selected()}</span>}>
      <For each={options}>
        {(opt) => (
          <button
            classList={{ [dropdownStyles.option]: true, [dropdownStyles.optionActive]: opt === selected() }}
            onClick={() => setSelected(opt)}
          >
            {opt}
          </button>
        )}
      </For>
    </Dropdown>
  );
}
