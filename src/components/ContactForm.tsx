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
  access_key?: string;
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
  const [loginForm, { Form, Field, FieldArray }] =
    createForm<ContactFormType>();

  const submitHandler: SubmitHandler<ContactFormType> = async (
    values,
    event,
  ) => {
    const form = {
      ...values,
      access_key: props.accessToken,
    };

    setFormState(FormState.sending);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        // const data = await response.json();
        setFormState(FormState.sended);
      } else {
        // Custom message for failed HTTP codes
        if (response.status === 404) throw new Error("404, Not found");
        if (response.status === 500)
          throw new Error("500, internal server error");
        throw new Error(response.status.toString());
      }
    } catch (error) {
      setError("Error: " + error);
      setFormState(FormState.error);
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
    <div class="about-contact">
      <Toaster
        position="bottom-right"
        gutter={8}
        toastOptions={{
          duration: 7000,
        }}
      />
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
                <p>{"Nom"}</p>
                <input
                  disabled={formState() === FormState.sending}
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
                <p>{"Email"}</p>
                <input
                  disabled={formState() === FormState.sending}
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
                <p>{"Message"}</p>
                <textarea
                  disabled={formState() === FormState.sending}
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
            disabled={formState() === FormState.sending}
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
