import { splitProps, type ComponentProps } from "solid-js";
import styles from "./Textarea.module.css";

type TextareaProps = ComponentProps<"textarea"> & {
  invalid?: boolean;
};

const Textarea = (props: TextareaProps) => {
  const [local, rest] = splitProps(props, ["invalid", "class"]);

  return (
    <textarea
      {...rest}
      class={`${styles.textarea} ${local.invalid ? styles.invalid : ""} ${local.class ?? ""}`}
    />
  );
};

export default Textarea;
