import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, Send, Instagram, Linkedin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NARDO" },
      {
        name: "description",
        content: "Get in touch with Lenhard Pedro Malana for UX/UI and graphic design projects.",
      },
      { property: "og:title", content: "Contact — NARDO" },
      {
        property: "og:description",
        content: "Get in touch with Lenhard Pedro Malana for UX/UI and graphic design projects.",
      },
    ],
  }),
  component: Contact,
});

const socials = [
  { href: "https://wa.me/639365513174", label: "Whatsapp", Icon: MessageCircle },
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://linkedin.com", label: "Linkedin", Icon: Linkedin },
];

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Project inquiry from ${fd.get("name")}`);
    const body = encodeURIComponent(
      `${fd.get("message")}\n\n— ${fd.get("name")} (${fd.get("email")})`,
    );
    await new Promise((r) => setTimeout(r, 300));
    window.location.href = `mailto:malana.lenhard.02152003@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
    setSubmitting(false);
    e.currentTarget.reset();
  }

  return (
    <div className="container-prose pt-20 pb-24 md:pt-32">
      <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Contact</p>
      <h1 className="font-serif mt-4 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
        Let's work together on your next project.
      </h1>
      <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
        Let's collaborate and bring your ideas to life with thoughtful design, clear strategy, and
        impactful results.
      </p>

      <div className="mt-16 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5 space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">My email</p>
            <a
              href="mailto:malana.lenhard.02152003@gmail.com"
              className="link-underline mt-2 inline-flex items-center gap-2 font-serif text-lg break-all"
            >
              <Mail className="h-4 w-4 shrink-0" />
              malana.lenhard.02152003@gmail.com
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">My phone</p>
            <a
              href="tel:+639365513174"
              className="link-underline mt-2 inline-flex items-center gap-2 font-serif text-lg"
            >
              <Phone className="h-4 w-4 shrink-0" />
              +63 936 551 3174
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Socials</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs transition-colors hover:bg-muted"
                  >
                    <Icon className="h-3.5 w-3.5" /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={onSubmit} className="md:col-span-7 space-y-6">
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <div>
            <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
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
      <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-border bg-transparent py-2 text-base outline-none transition-colors focus:border-foreground"
      />
    </div>
  );
}
