import { Portal } from "solid-js/web";
import { Show, createEffect, createSignal, on } from "solid-js";

import {
  type SubmitHandler,
  createForm,
  email,
  required,
} from "@modular-forms/solid";
import toast, { Toaster } from "solid-toast";

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
const ContactForm = (props: Props) => {
  const [formState, setFormState] = createSignal<FormState>(FormState.unsend);
  const [error, setError] = createSignal<string | null>(null);
  const [_loginForm, { Form, Field }] =
    createForm<ContactFormType>();

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

  const disabled = () => formState() === FormState.sending;

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
    <div class="about-contact">
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
      <Form onSubmit={submitHandler} class="contact-form">
        <div class="contact-meta">
          <Field name="name" validate={[required("Name is required")]}>
            {(field, props) => (
              <div
                class="input-wrapper"
                classList={{ invalid: field.error.length > 0 }}
              >
                <label for="name">{"Nom"}</label>
                <input
                  id="name"
                  disabled={disabled()}
                  {...props}
                  type="txt"
                  placeholder="Nom"
                  required
                />
              </div>
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
              <div
                class="input-wrapper"
                classList={{ invalid: field.error.length > 0 }}
              >
                <label for="email">{"Email"}</label>
                <input
                  id="email"
                  disabled={disabled()}
                  {...props}
                  type="email"
                  placeholder="email"
                  required
                />
              </div>
            )}
          </Field>
          <Field name="message" validate={[required("Message is required")]}>
            {(field, props) => (
              <div
                class="input-wrapper textarea-wrapper"
                classList={{ invalid: field.error.length > 0 }}
              >
                <label for="message">{"Message"}</label>
                <textarea
                  id="message"
                  disabled={disabled()}
                  {...props}
                  placeholder="message"
                  required
                />
              </div>
            )}
          </Field>
        </div>
        <div class="actions">
          <button
            disabled={disabled()}
            class="primary"
            type="submit"
          >
            Envoyer
          </button>
        </div>
      </Form>
    </div>
  );
};
export default ContactForm;
