import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText, Mail, Instagram, Linkedin, MessageCircle } from "lucide-react";
import portraitGrad from "@/assets/figma/portrait-grad.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NARDO" },
      {
        name: "description",
        content:
          "Lenhard Pedro Malana — freelance UX/UI Designer based in the Philippines with 3+ years of experience.",
      },
      { property: "og:title", content: "About — NARDO" },
      {
        property: "og:description",
        content:
          "Lenhard Pedro Malana — freelance UX/UI Designer based in the Philippines with 3+ years of experience.",
      },
    ],
  }),
  component: About,
});

const techStack = [
  "Figma", "Photoshop", "Illustrator", "Premiere", "After Effects",
  "Adobe XD", "Canva", "Framer", "Notion", "Slack", "Trello", "Asana",
];

const skills = [
  "Figma (Advanced)",
  "UI Design Systems",
  "Wireframing & Prototyping",
  "UX Research Basics",
  "Responsive Web Design",
  "User Flow & Information Architecture",
];

function About() {
  return (
    <div className="bg-radial-hero">
      <div className="container-prose pt-20 pb-24 md:pt-28">
        {/* Centered portrait + intro */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="relative mx-auto h-44 w-44 md:h-56 md:w-56">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-primary/40">
              <img src={portraitGrad} alt="Lenhard Pedro Malana" className="h-full w-full object-cover" />
            </div>
          </div>

          <p className="mt-8 text-xl text-brand md:text-2xl">
            I'm Lenhard Pedro Malana <span className="text-foreground">👋 🇵🇭</span>
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            UX/UI Designer <span className="text-foreground/40">|</span> Graphic Designer
          </h1>
          <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              I'm a freelance UX/UI Designer with{" "}
              <strong className="text-foreground">3 years of experience</strong>, recently
              graduated with a BS in Information Technology (July 2025). I focus on
              user-centered design, wireframing, prototyping, and research to create engaging
              digital experiences.
            </p>
            <p>
              Check out my CV via the "My Resume" button, or connect with me through my social
              media links or by visiting the Contact page.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              <FileText className="h-3.5 w-3.5" /> My Resume
            </a>
            {[
              { href: "mailto:malana.lenhard.02152003@gmail.com", Icon: Mail },
              { href: "https://instagram.com/nardo.me", Icon: Instagram },
              { href: "https://wa.me/639365513174", Icon: MessageCircle },
              { href: "https://linkedin.com", Icon: Linkedin },
            ].map(({ href, Icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Tech stacks */}
        <div className="mt-24">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Tech Stacks
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {techStack.map((t) => (
              <div
                key={t}
                className="grid h-14 w-14 place-items-center rounded-xl border border-border bg-card text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-all hover:border-primary hover:text-primary md:h-16 md:w-16"
                title={t}
              >
                {t.slice(0, 2)}
              </div>
            ))}
          </div>
        </div>

        {/* Certification */}
        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Certification
            </p>
            <p className="font-serif mt-3 text-3xl">Always learning.</p>
          </div>
          <div className="md:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-7">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>October 2024</span>
                <span>
                  Issued by: <strong className="text-foreground">Hytec Power Inc.</strong>
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold">Introduction to UI/UX Design</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Strengthened my foundation in user interface design, user experience principles,
                wireframing, and design thinking. Enhanced my ability to create structured design
                workflows, user-focused interfaces, and efficient prototyping processes using Figma.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Hire Me <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
