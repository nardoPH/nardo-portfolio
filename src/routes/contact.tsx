import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Instagram, Linkedin, MessageCircle, ArrowRight } from "lucide-react";

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
  { href: "https://linkedin.com", label: "Lenhard Pedro Malana", Icon: Linkedin },
  { href: "https://wa.me/639365513174", label: "09365513174", Icon: MessageCircle },
  { href: "https://instagram.com/nardo.me", label: "nardo.me", Icon: Instagram },
];

function Contact() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 200));
    const subject = encodeURIComponent("Project inquiry from portfolio");
    const body = encodeURIComponent(`Hi Lenhard,\n\nMy email: ${email}\n\n`);
    window.location.href = `mailto:malana.lenhard.02152003@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
    setSubmitting(false);
  }

  return (
    <div className="bg-radial-hero">
      <div className="container-prose pt-24 pb-32 md:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-8xl">
            Let's Chat
          </h1>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Do you speak filipino? It's okay if you don't, I speak english too.
          </p>

          <form onSubmit={onSubmit} className="mx-auto mt-12 max-w-xl space-y-5">
            <label className="flex items-center gap-3 rounded-full border border-border bg-card/60 px-5 py-4 transition-colors focus-within:border-primary">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary/40 text-primary">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="malana.lenhard.02152003@gmail.com"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground md:text-base"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Opening…" : "Get in touch"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-20 grid gap-6 sm:grid-cols-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex flex-col items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
