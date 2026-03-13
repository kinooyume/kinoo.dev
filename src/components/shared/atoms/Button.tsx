import { Show, splitProps, type ComponentProps } from "solid-js";
import styles from "./Button.module.scss";

type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "default" | "tiny";
  state?: "idle" | "loading" | "success";
  href?: string;
  external?: boolean;
} & ComponentProps<"button">;

const Button = (props: Readonly<ButtonProps>) => {
  const [local, rest] = splitProps(props, [
    "variant",
    "size",
    "state",
    "class",
    "children",
    "href",
    "external",
  ]);

  const variant = () => local.variant ?? "primary";
  const state = () => local.state ?? "idle";
  const classes = () => ({
    [styles.button]: true,
    [styles.primary]: variant() === "primary",
    [styles.secondary]: variant() === "secondary",
    [styles.tertiary]: variant() === "tertiary",
    [styles.tiny]: local.size === "tiny",
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
      <a
        href={local.href}
        classList={classes()}
        target={local.external ? "_blank" : undefined}
        rel={local.external ? "noreferrer nofollow noopener" : undefined}
      >
        {local.children}
      </a>
    </Show>
  );
};

export default Button;
