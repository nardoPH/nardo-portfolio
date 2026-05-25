import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Portfolio" },
      { name: "description", content: "Get in touch about new projects and collaborations." },
      { property: "og:title", content: "Contact — Portfolio" },
      { property: "og:description", content: "Get in touch about new projects and collaborations." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project inquiry from ${fd.get("name")}`);
    const body = encodeURIComponent(`${fd.get("message")}\n\n— ${fd.get("name")} (${fd.get("email")})`);
    await new Promise((r) => setTimeout(r, 400));
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
    setSubmitting(false);
    e.currentTarget.reset();
  }

  return (
    <div className="container-prose pt-20 pb-24 md:pt-32">
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
      <h1 className="font-serif mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">
        Have something in mind? Let's talk.
      </h1>

      <div className="mt-16 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5 space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</p>
            <a
              href="mailto:hello@example.com"
              className="link-underline mt-2 inline-flex items-center gap-2 font-serif text-xl"
            >
              <Mail className="h-4 w-4" />
              hello@example.com
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Availability</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Booking new work starting Q3 2026. Typical response time under 24 hours.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="md:col-span-7 space-y-6">
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={6}
              className="mt-2 w-full resize-none border-b border-border bg-transparent py-2 text-base outline-none transition-colors focus:border-foreground"
              placeholder="Tell me about the project…"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Sending…" : "Send message"}
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-border bg-transparent py-2 text-base outline-none transition-colors focus:border-foreground"
      />
    </div>
  );
}
