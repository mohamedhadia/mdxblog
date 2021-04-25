import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Icon, VisuallyHidden } from "reflexjs";

export function ContactForm() {
  const [state, handleSubmit] = useForm("xoqyvopy");
  if (state.succeeded) {
    return <p>Thanks for reaching out!</p>;
  }
  return (
    <form
      display="grid"
      col="1|2"
      gap="4"
      mt="4"
      w="full|auto"
      onSubmit={handleSubmit}
    >
      <div>
        <VisuallyHidden>
          <label htmlFor="name">Name</label>
        </VisuallyHidden>
        <input
          variant="input"
          type="name"
          id="name"
          name="name"
          placeholder="Name"
          required
        />
        <ValidationError prefix="name" field="name" errors={state.errors} />
      </div>

      <div>
        <VisuallyHidden>
          <label htmlFor="phone">Phone</label>
        </VisuallyHidden>
        <input
          variant="input"
          type="tel"
          id="phone"
          name="phone"
          placeholder="Phone"
        />
      </div>
      <div colStart="span 2">
        <VisuallyHidden>
          <label htmlFor="email">Email</label>
        </VisuallyHidden>
        <input
          variant="input"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <ValidationError prefix="email" field="email" errors={state.errors} />
      </div>
      <div colStart="span 2">
        <VisuallyHidden>
          <label htmlFor="message">Message</label>
        </VisuallyHidden>
        <textarea
          variant="textarea"
          placeholder="Message"
          id="message"
          name="message"
          rows={10}
          required
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>
      <div display="grid" col="1" gap="4" colStart="span 2">
        <button
          type="submit"
          variant="button.primary"
          disabled={state.submitting}
        >
          Send message <Icon name="arrow-right" ml="2" />
        </button>
      </div>
    </form>
  );
}
