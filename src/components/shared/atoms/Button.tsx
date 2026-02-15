import { Show, splitProps, type ComponentProps } from "solid-js";
import styles from "./Button.module.css";

type ButtonProps = {
  variant?: "primary" | "secondary";
  state?: "idle" | "loading" | "success";
  href?: string;
} & ComponentProps<"button">;

const Button = (props: Readonly<ButtonProps>) => {
  const [local, rest] = splitProps(props, [
    "variant",
    "state",
    "class",
    "children",
    "href",
  ]);

  const variant = () => local.variant ?? "primary";
  const state = () => local.state ?? "idle";
  const classes = () => ({
    [styles.button]: true,
    [styles.primary]: variant() === "primary",
    [styles.secondary]: variant() === "secondary",
    [styles.loading]: state() === "loading",
    [styles.success]: state() === "success",
    [local.class ?? ""]: !!local.class,
  });

  return (
    <Show
      when={local.href}
      fallback={
        <button {...rest} classList={classes()}>
          {local.children}
        </button>
      }
    >
      <a href={local.href} classList={classes()}>
        {local.children}
      </a>
    </Show>
  );
};

export default Button;
