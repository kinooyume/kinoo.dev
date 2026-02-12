import { Show, splitProps, type ComponentProps } from "solid-js";
import styles from "./Button.module.css";

type ButtonProps = {
  variant?: "primary" | "secondary";
  state?: "idle" | "loading" | "success";
  href?: string;
} & ComponentProps<"button">;

const Button = (props: ButtonProps) => {
  const [local, rest] = splitProps(props, [
    "variant",
    "state",
    "class",
    "children",
    "href",
  ]);

  const variant = () => local.variant ?? "primary";
  const state = () => local.state ?? "idle";
  const variantClass = () =>
    variant() === "primary" ? styles.primary : styles.secondary;
  const classes = () =>
    `${styles.button} ${variantClass()} ${state() === "loading" ? styles.loading : ""} ${state() === "success" ? styles.success : ""} ${local.class ?? ""}`;

  return (
    <Show
      when={local.href}
      fallback={
        <button {...rest} class={classes()}>
          {local.children}
        </button>
      }
    >
      <a href={local.href} class={classes()}>
        {local.children}
      </a>
    </Show>
  );
};

export default Button;
