import { splitProps, type ComponentProps } from "solid-js";
import styles from "./Input.module.css";

type InputProps = ComponentProps<"input"> & {
  invalid?: boolean;
};

const Input = (props: Readonly<InputProps>) => {
  const [local, rest] = splitProps(props, ["invalid", "class"]);

  return (
    <input
      {...rest}
      classList={{
        [styles.input]: true,
        [styles.invalid]: !!local.invalid,
        [local.class ?? ""]: !!local.class,
      }}
    />
  );
};

export default Input;
