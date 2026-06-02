import { Sparkles } from "lucide-react";

export type JourneyEra = {
  range: string;
  title: string;
  body: string;
  skills: string[];
};

export const journeyEras: JourneyEra[] = [
  {
    range: "2019 – 2021",
    title: "Foundation Era",
    body:
      "Discovered design through curiosity — sketching layouts, exploring Photoshop and Illustrator, and learning what makes visuals click. Self-taught the fundamentals of color, typography, and composition.",
    skills: ["Photoshop", "Illustrator", "Composition", "Typography"],
  },
  {
    range: "2021 – 2023",
    title: "Exploration Era",
    body:
      "Transitioned from graphic design into UX/UI. Built my first design systems in Figma, ran small user interviews, and started shipping real interfaces for local startups and friends' brands.",
    skills: ["Figma", "Design Systems", "Wireframing", "User Interviews"],
  },
  {
    range: "2023 – 2024",
    title: "Specialization Era",
    body:
      "Focused on product thinking — accessibility, responsive design, and prototyping clickable flows. Started collaborating with international clients and refining a personal design process.",
    skills: ["Prototyping", "Accessibility", "Responsive", "QA"],
  },
  {
    range: "2024 – Present",
    title: "Integration Era",
    body:
      "Blending design with AI-assisted workflows, frontend collaboration, and product optimization. Building this portfolio as a living case study in modern product experience.",
    skills: ["AI Workflows", "Frontend Collab", "Product Optimization", "Lovable"],
  },
];

export function MiniJourney() {
  return (
    <section className="container-prose py-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          My Journey
        </p>
        <h2 className="font-serif mt-3 text-4xl md:text-5xl">From sketches to systems.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          A short look at how I got here — the full timeline lives on the about page.
        </p>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-4">
        {journeyEras.map((era, i) => (
          <article
            key={era.range}
            className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {era.range}
            </p>
            <h3 className="mt-1 text-lg font-semibold">{era.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{era.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FullJourney() {
  return (
    <section className="container-prose py-20">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          The Long Story
        </p>
        <h2 className="font-serif mt-3 text-4xl md:text-5xl">My full design journey.</h2>
      </div>
      <ol className="relative mx-auto mt-16 max-w-3xl border-l border-border pl-8">
        {journeyEras.map((era, i) => (
          <li key={era.range} className="reveal relative pb-14 last:pb-0" style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="absolute -left-[37px] grid h-7 w-7 place-items-center rounded-full border border-primary/40 bg-background text-[10px] font-bold text-primary">
              {i + 1}
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
              {era.range}
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{era.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{era.body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {era.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-card px-3 py-1 text-[11px] text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
