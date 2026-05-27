import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, ArrowRight, Mail, Instagram, Linkedin, MessageCircle, Star, Eye, Package, PenTool, Layers } from "lucide-react";
import { fetchProjects } from "@/lib/projects";
import portrait from "@/assets/figma/portrait-hero.png";
import navigent from "@/assets/figma/navigent.png";
import sample2k25 from "@/assets/figma/sample-2k25.png";
import sampleRodel from "@/assets/figma/sample-rodel.png";
import sampleRj8 from "@/assets/figma/sample-rj8.png";
import sampleLaptop from "@/assets/figma/sample-laptop.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NARDO — UX/UI & Graphic Designer" },
      {
        name: "description",
        content:
          "Lenhard Pedro Malana (NARDO) — Philippines-based UX/UI & graphic designer crafting user-centered digital experiences for startups and brands worldwide.",
      },
      { property: "og:title", content: "NARDO — UX/UI & Graphic Designer" },
      {
        property: "og:description",
        content:
          "Philippines-based UX/UI & graphic designer crafting user-centered digital experiences.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { v: "3+", l: "Years of\nExperience" },
  { v: "12", l: "Projects\nDone" },
  { v: "8", l: "Happy\nClients" },
  { v: "5", l: "Countries\nServed" },
];

const services = [
  {
    Icon: Layers,
    t: "Branding",
    d: "Building strong brand identities through logos, color systems, and visual guidelines that make your business recognizable and memorable.",
  },
  {
    Icon: PenTool,
    t: "UX/UI Design",
    d: "Designing intuitive, user-centered interfaces that balance aesthetics with functionality for web and mobile platforms.",
    featured: true,
  },
  {
    Icon: Package,
    t: "Product Design",
    d: "Shaping complete digital product experiences — from research and strategy to prototypes and final designs that solve real user problems.",
  },
];


const promos = [
  { title: "Open for Commission", sub: "UX/UI Designer | Graphic Designer", note: "Open for Full-Time, Part-Time, And Commission" },
  { title: "Services I Offer", sub: "Design, Prototyping, and Interactive Experiences", list: ["Full Designs from Scratch", "Revise & Refine Existing Designs", "Prototyping (Clickable Flows)", "Poster & Print Design"] },
  { title: "Sample Designs", sub: "A Quick Look At Some of My Design Projects", img: sample2k25 },
  { title: "Sample Designs", sub: "A Quick Look At Some of My Design Projects", img: sampleRodel },
];

const testimonials = [
  { n: "G*****s N********t", q: "Awesome client! Communication was easy, and even with rush work, everything went smoothly. Definitely someone I'd love to work with again — highly recommended!" },
  { n: "D*** A***", q: "We saw an immediate improvement in engagement after launching the new design. Highly recommend!" },
  { n: "M*****", q: "Professional, creative, and attentive to details — everything we needed in a designer." },
  { n: "K******** R*", q: "Thank you for your hard work. The design looks beautiful, formal, and aligned with the branding. Superb quality compared to the last provider." },
  { n: "T*** D*", q: "Working with Lenhard was effortless — our brand now feels modern and professional, and our customers love it." },
  { n: "J* S*********", q: "Very accommodating throughout the whole process and highly comprehensive. Plus, I really appreciated the consistent updates and communication." },
];

function Index() {
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const fallbackImages = [navigent, sample2k25, sampleRj8, sampleLaptop];

  return (
    <div>
      {/* HERO */}
      <section className="bg-radial-hero relative overflow-hidden">
        <div className="container-prose grid items-center gap-12 pt-16 pb-24 md:grid-cols-12 md:pt-24 md:pb-32">
          <div className="md:col-span-7">
            <div className="reveal inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground">
              <Eye className="h-3.5 w-3.5" /> 1,037 Profile Views
            </div>
            <p className="reveal mt-6 text-lg" style={{ animationDelay: "0.1s" }}>
              Hi I'm <span className="text-brand font-semibold">Lenhard</span>{" "}
              <span className="text-xl">👋 🇵🇭</span>
            </p>
            <h1
              className="reveal mt-3 text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]"
              style={{ animationDelay: "0.2s" }}
            >
              UX/UI Designer
              <span className="block text-foreground/80">| Graphic Designer</span>
            </h1>
            <p
              className="reveal mt-8 max-w-xl text-base text-muted-foreground md:text-lg"
              style={{ animationDelay: "0.3s" }}
            >
              I help businesses and startups create user-centered, visually engaging
              designs that improve usability, branding, and overall experience.
            </p>
            <div
              className="reveal mt-8 flex items-center gap-3"
              style={{ animationDelay: "0.4s" }}
            >
              {[
                { href: "mailto:malana.lenhard.02152003@gmail.com", Icon: Mail, label: "Email" },
                { href: "https://instagram.com/nardo.me", Icon: Instagram, label: "Instagram" },
                { href: "https://wa.me/639365513174", Icon: MessageCircle, label: "Whatsapp" },
                { href: "https://linkedin.com", Icon: Linkedin, label: "Linkedin" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* stats inline */}
            <div
              className="reveal mt-14 grid max-w-lg grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4"
              style={{ animationDelay: "0.5s" }}
            >
              {stats.map((s) => (
                <div key={s.l}>
                  <p className="text-4xl font-bold">{s.v}</p>
                  <p className="mt-1 whitespace-pre-line text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* portrait */}
          <div className="reveal relative md:col-span-5" style={{ animationDelay: "0.2s" }}>
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl" />
              <img
                src={portrait}
                alt="Lenhard Pedro Malana"
                className="relative z-10 h-full w-full object-contain"
              />
              {/* floating tech icons */}
              {["Ps", "Ai", "Fr", "Fi"].map((t, i) => (
                <div
                  key={t}
                  className={`absolute z-20 grid h-12 w-12 place-items-center rounded-xl border border-border bg-card/80 text-xs font-bold text-foreground backdrop-blur ${
                    ["top-0 -left-4", "top-1/3 -right-2", "bottom-1/4 -left-6", "bottom-0 right-4"][i]
                  } ${["float-slow", "float-med", "float-fast", "float-slow"][i]}`}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-prose py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Services</p>
          <h2 className="font-serif mt-3 text-4xl md:text-5xl">What I do best.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.t}
              className={`reveal relative rounded-2xl border p-8 transition-all hover:-translate-y-1 ${
                s.featured
                  ? "border-primary/50 bg-gradient-to-b from-primary/10 to-card shadow-[0_20px_60px_-20px_var(--brand)]"
                  : "border-border bg-card"
              }`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary">
                <s.Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            See all services <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* TECH STACKS */}
      <section className="border-y border-border/40 bg-card/30 py-16">
        <div className="container-prose">
          <TechStack />
        </div>
      </section>


      {/* PROMO CARDS */}
      <section className="py-24">
        <div className="container-prose">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Highlights</p>
              <h2 className="font-serif mt-3 text-3xl md:text-4xl">A quick look at my work.</h2>
            </div>
          </div>
          <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 no-scrollbar md:mx-0 md:px-0">
            {promos.map((p, i) => (
              <article
                key={i}
                className="relative aspect-square w-[78%] shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/25 via-card to-background p-6 md:w-[calc((100%-3rem)/4)]"
              >
                <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/70">NARDO</p>
                <div className="mt-4 rounded-xl border border-border/60 bg-background/40 p-5 backdrop-blur-sm">
                  <h3 className="text-center text-lg font-bold uppercase tracking-wider">{p.title}</h3>
                  <p className="mt-2 text-center text-[11px] text-muted-foreground">{p.sub}</p>
                  {p.img && (
                    <div className="mt-4 aspect-square overflow-hidden rounded-lg bg-muted">
                      <img src={p.img} alt={p.title} className="h-full w-full object-cover" />
                    </div>
                  )}
                  {p.list && (
                    <ul className="mt-4 space-y-1.5 text-[11px] text-muted-foreground">
                      {p.list.map((l) => (
                        <li key={l} className="flex gap-1.5">
                          <span className="text-primary">•</span> {l}
                        </li>
                      ))}
                    </ul>
                  )}
                  {p.note && (
                    <p className="mt-4 text-center text-[10px] text-muted-foreground">{p.note}</p>
                  )}
                </div>
                <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
                  DM for inquiries!
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-prose py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Kind words</p>
          <h2 className="font-serif mt-3 text-4xl md:text-5xl">Listen to my clients.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40"
            >
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                — {t.n}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* RECENT WORKS */}
      <section className="container-prose py-24">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">My Recent Works</p>
          <h2 className="font-serif mt-3 text-4xl md:text-5xl">Selected projects.</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {(featured.length ? featured : Array(4).fill(null)).map((p, i) => (
            <Link
              key={p?.id ?? i}
              to="/projects"
              className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={p?.images?.[0] ?? fallbackImages[i] ?? navigent}
                  alt={p?.title ?? `Project ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {p?.tags?.slice(0, 2).join(" · ") ?? "Design · Branding"}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{p?.title ?? "Untitled"}</h3>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container-prose pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/20 via-card to-background p-10 md:p-16">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <h2 className="font-serif max-w-2xl text-4xl leading-[1.05] md:text-6xl">
              Let's work together on your next project!
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Contact <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
