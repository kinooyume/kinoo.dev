import { splitProps, type ComponentProps } from "solid-js";
import Input from "@/components/shared/atoms/Input/Input";
import styles from "./SearchInput.module.css";

const SearchInput = (props: ComponentProps<"input">) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Input
      type="search"
      {...rest}
      class={`${styles.searchInput} ${local.class ?? ""}`}
    />
  );
};

export default SearchInput;
