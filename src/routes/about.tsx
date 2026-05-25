import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText } from "lucide-react";

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

const skills = [
  "Figma (Advanced)",
  "UI Design Systems",
  "Wireframing & Prototyping",
  "UX Research Basics",
  "Responsive Web Design",
  "User Flow & IA",
  "Adobe Photoshop",
  "Adobe Illustrator",
];

function About() {
  return (
    <div className="container-prose pt-20 pb-24 md:pt-32">
      <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">About</p>
      <h1 className="font-serif mt-4 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
        I'm Lenhard Pedro Malana <span className="text-muted-foreground">— a freelance UX/UI designer from the Philippines.</span>
      </h1>

      <div className="mt-16 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            I'm a freelance UX/UI Designer with <strong className="text-foreground">3 years of experience</strong>,
            recently graduated with a BS in Information Technology (July 2025).
          </p>
          <p>
            I focus on user-centered design, wireframing, prototyping, and research to create
            engaging digital experiences. My work spans AI SaaS platforms, mobile apps, web games,
            pitch decks, and brand systems for clients across five countries.
          </p>
          <p>
            Check out my CV via the <em>My Resume</em> button, or get in touch if you'd like to
            collaborate on something new.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <FileText className="h-3.5 w-3.5" /> My Resume
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              Hire Me <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <aside className="md:col-span-5 space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Currently</p>
            <p className="mt-2 font-serif text-xl">Open to new projects — 2026</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Tech stack</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Certification</p>
            <div className="mt-3 rounded-lg border border-border bg-card p-5">
              <p className="text-xs text-muted-foreground">October 2024</p>
              <p className="font-serif mt-1 text-lg">Introduction to UI/UX Design</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Issued by Hytec Power Inc. — strengthened foundations in UI design, UX
                principles, wireframing, and design thinking.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
