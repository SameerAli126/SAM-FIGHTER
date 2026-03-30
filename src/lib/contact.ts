export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type ContactSubmissionResult =
  | { mode: "endpoint" }
  | { mode: "mailto"; href: string };

const DEFAULT_CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || "khsameer626@gmail.com";
const DEFAULT_CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ||
  `https://formsubmit.co/ajax/${encodeURIComponent(DEFAULT_CONTACT_EMAIL)}`;

const MAX_MESSAGE_CHARS = 2000;

function sanitize(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function isFormSubmitEndpoint(endpoint: string): boolean {
  return endpoint.includes("formsubmit.co/ajax/");
}

function buildMailtoHref(payload: ContactPayload, recipientEmail = DEFAULT_CONTACT_EMAIL): string {
  const subject = `Portfolio Inquiry - ${sanitize(payload.name)}`;
  const body = [
    `Name: ${sanitize(payload.name)}`,
    `Email: ${sanitize(payload.email)}`,
    "",
    sanitize(payload.message),
  ].join("\n");

  const subjectParam = encodeURIComponent(subject);
  const bodyParam = encodeURIComponent(body.slice(0, MAX_MESSAGE_CHARS));

  return `mailto:${recipientEmail}?subject=${subjectParam}&body=${bodyParam}`;
}

async function postToEndpoint(
  payload: ContactPayload,
  endpoint: string,
  recipientEmail: string,
  signal?: AbortSignal,
): Promise<void> {
  const isFormSubmit = isFormSubmitEndpoint(endpoint);
  const basePayload = {
    name: sanitize(payload.name),
    email: sanitize(payload.email),
    message: sanitize(payload.message),
  };

  const requestBody = isFormSubmit
    ? {
        ...basePayload,
        _subject: `Portfolio Inquiry - ${basePayload.name}`,
        _replyto: basePayload.email,
        _template: "table",
        _captcha: "true",
      }
    : basePayload;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    signal,
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      `Contact request failed with status ${response.status}${
        responseText ? `: ${responseText.slice(0, 120)}` : ""
      }`,
    );
  }

  if (isFormSubmit) {
    const formSubmitResponse = (await response.json().catch(() => null)) as
      | { success?: string }
      | null;
    const isSuccess = formSubmitResponse?.success === "true";
    if (!isSuccess) {
      throw new Error(`FormSubmit did not confirm delivery to ${recipientEmail}.`);
    }
  }
}

export async function submitContactForm(
  payload: ContactPayload,
  options?: {
    endpoint?: string;
    recipientEmail?: string;
    signal?: AbortSignal;
  },
): Promise<ContactSubmissionResult> {
  const endpoint = options?.endpoint?.trim() || DEFAULT_CONTACT_ENDPOINT;
  const recipientEmail = options?.recipientEmail?.trim() || DEFAULT_CONTACT_EMAIL;

  if (endpoint) {
    try {
      await postToEndpoint(payload, endpoint, recipientEmail, options?.signal);
      return { mode: "endpoint" };
    } catch (error) {
      if (!options?.endpoint) {
        return {
          mode: "mailto",
          href: buildMailtoHref(payload, recipientEmail),
        };
      }
      throw error;
    }
  }

  return {
    mode: "mailto",
    href: buildMailtoHref(payload, recipientEmail),
  };
}

export { buildMailtoHref, DEFAULT_CONTACT_EMAIL };
