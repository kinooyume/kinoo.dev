import type { JSX } from "solid-js";
import styles from "./FormField.module.css";

type FormFieldProps = {
  label: string;
  for?: string;
  children: JSX.Element;
};

const FormField = (props: Readonly<FormFieldProps>) => {
  return (
    <div class={styles.field}>
      <label for={props.for}>{props.label}</label>
      {props.children}
    </div>
  );
};

export default FormField;
