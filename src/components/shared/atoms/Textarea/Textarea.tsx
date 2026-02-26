import { splitProps, type ComponentProps } from "solid-js";
import styles from "./Textarea.module.scss";

type TextareaProps = ComponentProps<"textarea"> & {
  invalid?: boolean;
};

const Textarea = (props: Readonly<TextareaProps>) => {
  const [local, rest] = splitProps(props, ["invalid", "class"]);

  return (
    <textarea
      {...rest}
      aria-invalid={local.invalid}
      classList={{
        [styles.textarea]: true,
        [styles.invalid]: !!local.invalid,
        [local.class ?? ""]: !!local.class,
      }}
    />
  );
};

export default Textarea;
