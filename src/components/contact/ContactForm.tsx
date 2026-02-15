import { Portal } from "solid-js/web";
import { Show, createEffect, createSignal, on } from "solid-js";

import {
  type SubmitHandler,
  createForm,
  email,
  required,
} from "@modular-forms/solid";
import toast, { Toaster } from "solid-toast";
import Button from "@/components/shared/atoms/Button";
import Input from "@/components/shared/atoms/Input/Input";
import Textarea from "@/components/shared/atoms/Textarea/Textarea";
import FormField from "@/components/shared/molecules/FormField/FormField";
import styles from "./ContactForm.module.css";

type ContactFormType = {
  name: string;
  email: string;
  message: string;
};

enum FormState {
  unsend,
  sending,
  sended,
  error,
}

type Props = {
  accessToken: string;
};
const ContactForm = (props: Readonly<Props>) => {
  const [formState, setFormState] = createSignal<FormState>(FormState.unsend);
  const [error, setError] = createSignal<string | null>(null);
  const [_loginForm, { Form, Field }] = createForm<ContactFormType>();

  const submitHandler: SubmitHandler<ContactFormType> = async (
    values,
    _event,
  ) => {
    setFormState(FormState.sending);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("message", values.message);
      formData.append("access_key", props.accessToken);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setFormState(FormState.sended);
      } else {
        throw new Error(data.message || "Form submission failed");
      }
    } catch (error) {
      setError(`Error: ${error}`);
      setFormState(FormState.error);
    }
  };

  const inputsDisabled = () => formState() === FormState.sending;
  const buttonDisabled = () =>
    formState() === FormState.sending || formState() === FormState.sended;

  const buttonState = () => {
    if (formState() === FormState.sending) return "loading" as const;
    if (formState() === FormState.sended) return "success" as const;
    return "idle" as const;
  };

  const handleInput = () => {
    if (formState() === FormState.sended) {
      setFormState(FormState.unsend);
    }
  };

  const [toastId, setToastId] = createSignal<string>();

  createEffect(
    on(formState, () => {
      switch (formState()) {
        case FormState.sending:
          setToastId(toast.loading("Envoi en cours..."));
          break;
        case FormState.sended:
          toast.success(
            "Votre message a bien été envoyé. Je vous répondrai dans les plus brefs.",
            { id: toastId() },
          );
          break;
        case FormState.error:
          toast.error(
            "Une erreur est survenue. Veuillez réessayer plus tard.",
            {
              id: toastId(),
            },
          );
          break;
      }
    }),
  );

  return (
    <div class={styles.root}>
      <Portal>
        <Toaster
          gutter={8}
          toastOptions={{
            duration: 7000,
          }}
        />
      </Portal>
      <Show when={formState() === FormState.error}>
        <span class="error">{error()}</span>
      </Show>
      <Form onSubmit={submitHandler} class={styles.form} onInput={handleInput}>
        <div class={styles.meta}>
          <Field name="name" validate={[required("Name is required")]}>
            {(field, props) => (
              <FormField label="Votre nom">
                <Input
                  id="name"
                  disabled={inputsDisabled()}
                  invalid={field.error.length > 0}
                  placeholder="Claude Monet"
                  {...props}
                  type="text"
                />
              </FormField>
            )}
          </Field>
          <Field
            name="email"
            validate={[
              required("Please enter your email."),
              email("The email address is badly formatted."),
            ]}
          >
            {(field, props) => (
              <FormField label="Votre email">
                <Input
                  id="email"
                  disabled={inputsDisabled()}
                  invalid={field.error.length > 0}
                  placeholder="claude@giverny.fr"
                  {...props}
                  type="email"
                />
              </FormField>
            )}
          </Field>
          <Field name="message" validate={[required("Message is required")]}>
            {(field, props) => (
              <FormField label="Votre projet">
                <Textarea
                  id="message"
                  disabled={inputsDisabled()}
                  invalid={field.error.length > 0}
                  placeholder="Décrivez votre contexte, vos objectifs et les enjeux techniques. (Produit à lancer, refonte, renfort d'équipe…)"
                  {...props}
                />
              </FormField>
            )}
          </Field>
        </div>
        <div class={styles.actions}>
          <div class={styles.submitGroup}>
            <Button
              disabled={buttonDisabled()}
              variant="primary"
              state={buttonState()}
              type="submit"
            >
              {formState() === FormState.sending
                ? "Envoi…"
                : formState() === FormState.sended
                  ? "Message envoyé \u2713"
                  : "Discutons-en !"}
            </Button>
            <span class={styles.hint}>Réponse sous 24–48h.</span>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default ContactForm;
