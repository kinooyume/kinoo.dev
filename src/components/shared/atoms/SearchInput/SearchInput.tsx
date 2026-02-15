import { splitProps, type ComponentProps } from "solid-js";
import Input from "@/components/shared/atoms/Input/Input";
import styles from "./SearchInput.module.css";

const SearchInput = (props: Readonly<ComponentProps<"input">>) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <Input
      type="search"
      {...rest}
      classList={{
        [styles.searchInput]: true,
        [local.class ?? ""]: !!local.class,
      }}
    />
  );
};

export default SearchInput;
