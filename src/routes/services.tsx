import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — NARDO" },
      {
        name: "description",
        content:
          "UI/UX, graphic design, testing & multimedia services by Lenhard Pedro Malana (NARDO).",
      },
      { property: "og:title", content: "Services — NARDO" },
      {
        property: "og:description",
        content:
          "UI/UX, graphic design, testing & multimedia services by Lenhard Pedro Malana (NARDO).",
      },
    ],
  }),
  component: ServicesPage,
});

type Service = { t: string; d: string; cat: Cat };
type Cat = "UI/UX" | "Graphic Design" | "Testing" | "Multimedia";

const services: Service[] = [
  { t: "Website Design", d: "Modern, responsive website designs that elevate your brand.", cat: "UI/UX" },
  { t: "Mobile App Design", d: "User-centered mobile interfaces designed for seamless, engaging experiences.", cat: "UI/UX" },
  { t: "User Interface Design", d: "Clean, intuitive interfaces that enhance usability and visual consistency.", cat: "UI/UX" },
  { t: "Interactive UI Design", d: "Dynamic, engaging interface elements that improve user interaction.", cat: "UI/UX" },
  { t: "Wireframing & Prototyping", d: "Blueprinting and testing product ideas through structured layouts and interactive prototypes.", cat: "UI/UX" },
  { t: "Design Systems & Components", d: "Scalable design frameworks ensuring consistency across products and teams.", cat: "UI/UX" },
  { t: "Landing Page Design", d: "Conversion-focused pages optimized to turn visitors into leads or customers.", cat: "UI/UX" },
  { t: "Portfolio Design", d: "Clean, visually engaging layouts to showcase your work and personal brand.", cat: "UI/UX" },
  { t: "Social Media Design", d: "Eye-catching visuals tailored for Instagram, Facebook, and LinkedIn to boost engagement.", cat: "Graphic Design" },
  { t: "Ad Creative Design", d: "High-converting static and carousel ads designed to capture attention and drive clicks.", cat: "Graphic Design" },
  { t: "Presentation Design", d: "Professionally designed slides that communicate ideas clearly and leave a strong visual impression.", cat: "Graphic Design" },
  { t: "Pitch Deck Design", d: "Persuasive, visually compelling decks crafted to attract investors and stakeholders.", cat: "Graphic Design" },
  { t: "Mock-Up Design", d: "Realistic visual representations of products or designs to showcase concepts effectively.", cat: "Graphic Design" },
  { t: "Email Design", d: "Responsive email layouts designed to improve open and click-through rates.", cat: "Graphic Design" },
  { t: "Web & Mobile Testing", d: "Usability and functionality testing to identify issues and improve user experience.", cat: "Testing" },
  { t: "Basic Video Editing", d: "Clean, engaging video edits for social media, ads, or presentations.", cat: "Multimedia" },
];

const cats: ("All" | Cat)[] = ["All", "UI/UX", "Graphic Design", "Testing", "Multimedia"];

function ServicesPage() {
  const [active, setActive] = useState<(typeof cats)[number]>("All");
  const list = active === "All" ? services : services.filter((s) => s.cat === active);

  return (
    <div className="container-prose pt-20 pb-24 md:pt-32">
      <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Services</p>
      <h1 className="font-serif mt-4 max-w-3xl text-4xl leading-[1.05] md:text-6xl">
        Elevate every experience, simplify your everyday needs.
      </h1>

      <div className="mt-12 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors ${
              active === c
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => (
          <article
            key={s.t}
            className="reveal flex flex-col gap-3 bg-card p-7 transition-colors hover:bg-accent"
            style={{ animationDelay: `${i * 0.03}s` }}
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {s.cat}
            </p>
            <h3 className="font-serif text-xl">{s.t}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </article>
        ))}
      </div>

      <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-lg border border-border bg-card p-10 md:flex-row md:items-center md:p-14">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Got a project?</p>
          <p className="font-serif mt-3 text-2xl md:text-3xl">Let's build it together.</p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
        >
          Start a project <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
