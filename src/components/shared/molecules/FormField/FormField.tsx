import type { JSX } from "solid-js";
import styles from "./FormField.module.css";

type FormFieldProps = {
  label: string;
  children: JSX.Element;
};

const FormField = (props: Readonly<FormFieldProps>) => {
  return (
    <div class={styles.field}>
      <label>{props.label}</label>
      {props.children}
    </div>
  );
};

export default FormField;
