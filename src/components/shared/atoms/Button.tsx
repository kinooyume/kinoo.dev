import { Show, splitProps, type ComponentProps } from "solid-js";
import styles from "./Button.module.scss";

type ButtonProps = {
  variant?: "solid" | "surface" | "ghost" | "tint";
  size?: "default" | "tiny";
  state?: "idle" | "loading" | "success";
  href?: string;
  external?: boolean;
  icon?: string;
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
    "icon",
  ]);

  const variant = () => local.variant ?? "solid";
  const state = () => local.state ?? "idle";
  const classes = () => ({
    [styles.button]: true,
    [styles.solid]: variant() === "solid",
    [styles.surface]: variant() === "surface",
    [styles.ghost]: variant() === "ghost",
    [styles.tint]: variant() === "tint",
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
          {/* eslint-disable-next-line solid/no-innerhtml */}
          {local.icon && <span class={styles.icon} innerHTML={local.icon} />}
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
        {/* eslint-disable-next-line solid/no-innerhtml */}
          {local.icon && <span class={styles.icon} innerHTML={local.icon} />}
        {local.children}
      </a>
    </Show>
  );
};

export default Button;
