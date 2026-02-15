import { splitProps, type ComponentProps } from "solid-js";
import styles from "./Input.module.css";

type InputProps = ComponentProps<"input"> & {
  invalid?: boolean;
};

const Input = (props: InputProps) => {
  const [local, rest] = splitProps(props, ["invalid", "class"]);

  return (
    <input
      {...rest}
      class={`${styles.input} ${local.invalid ? styles.invalid : ""} ${local.class ?? ""}`}
    />
  );
};

export default Input;
