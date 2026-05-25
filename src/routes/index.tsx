import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { fetchProjects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NARDO — UX/UI & Graphic Designer" },
      {
        name: "description",
        content:
          "Lenhard Pedro Malana (NARDO) — Philippines-based UX/UI & graphic designer crafting user-centered digital experiences.",
      },
      { property: "og:title", content: "NARDO — UX/UI & Graphic Designer" },
      {
        property: "og:description",
        content:
          "Lenhard Pedro Malana (NARDO) — Philippines-based UX/UI & graphic designer crafting user-centered digital experiences.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { v: "3+", l: "Years experience" },
  { v: "8", l: "Happy clients" },
  { v: "12", l: "Projects done" },
  { v: "5", l: "Countries served" },
];

const services = [
  {
    t: "Branding",
    d: "Strong brand identities through logos, color systems, and visual guidelines that make your business recognizable and memorable.",
  },
  {
    t: "UX/UI Design",
    d: "Intuitive, user-centered interfaces that balance aesthetics with functionality for web and mobile platforms.",
  },
  {
    t: "Product Design",
    d: "Complete digital product experiences — from research and strategy to prototypes and final designs that solve real problems.",
  },
];

const testimonials = [
  {
    n: "G*****s N********t",
    q: "Awesome client! Communication was easy, and even with rush work, everything went smoothly. Definitely someone I'd love to work with again — highly recommended!",
  },
  {
    n: "D*** A***",
    q: "We saw an immediate improvement in engagement after launching the new design. Highly recommend!",
  },
  {
    n: "M*****",
    q: "Professional, creative, and attentive to details — everything we needed in a designer.",
  },
  {
    n: "K******** R*",
    q: "Thank you for your hard work. The design looks beautiful, formal, and aligned with the branding. The quality is superb compared to the last provider I worked with.",
  },
  {
    n: "T*** D*",
    q: "Working with Lenhard was effortless — our brand now feels modern and professional, and our customers love it.",
  },
  {
    n: "J* S*********",
    q: "Very accommodating throughout the whole process and highly comprehensive. Plus, I really appreciated the consistent updates and communication.",
  },
];

function Index() {
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="container-prose pt-24 pb-20 md:pt-36 md:pb-32">
        <p className="reveal text-sm uppercase tracking-[0.25em] text-muted-foreground">
          Portfolio · 2026
        </p>
        <h1
          className="reveal font-serif mt-6 text-5xl leading-[1.05] md:text-7xl lg:text-[5.5rem]"
          style={{ animationDelay: "0.1s" }}
        >
          Hi, I'm <em className="italic">Lenhard</em>
          <span className="text-muted-foreground"> 👋 🇵🇭</span>
          <br />
          UX/UI & Graphic
          <br />
          Designer.
        </h1>
        <p
          className="reveal mt-8 max-w-xl text-base text-muted-foreground md:text-lg"
          style={{ animationDelay: "0.2s" }}
        >
          I help businesses and startups create user-centered, visually engaging designs that
          improve usability, branding, and overall experience.
        </p>
        <div
          className="reveal mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
          >
            Hire Me <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/projects"
            className="link-underline text-sm text-muted-foreground hover:text-foreground"
          >
            View my work
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/60">
        <div className="container-prose grid grid-cols-2 divide-x divide-border/60 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.l} className={`py-10 px-4 md:py-14 ${i === 0 ? "" : "pl-6 md:pl-10"}`}>
              <p className="font-serif text-4xl md:text-6xl">{s.v}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container-prose py-20 md:py-28">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Services</p>
            <h2 className="font-serif mt-3 text-3xl md:text-5xl">
              What I do best.
            </h2>
          </div>
          <Link
            to="/services"
            className="link-underline text-sm text-muted-foreground hover:text-foreground"
          >
            All services →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.t}
              className="reveal rounded-lg border border-border bg-card p-8 transition-colors hover:border-foreground/40"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <p className="font-serif text-xs text-muted-foreground">
                0{i + 1}
              </p>
              <h3 className="font-serif mt-4 text-2xl">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section className="container-prose border-t border-border/60 py-20 md:py-28">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Recent work</p>
            <h2 className="font-serif mt-3 text-3xl md:text-5xl">Selected projects.</h2>
          </div>
          <Link
            to="/projects"
            className="link-underline text-sm text-muted-foreground hover:text-foreground"
          >
            View all →
          </Link>
        </div>

        <div className="mt-12 grid gap-12 md:gap-16">
          {featured.length === 0 && (
            <p className="text-sm text-muted-foreground">No featured projects yet.</p>
          )}
          {featured.map((p, i) => (
            <Link
              key={p.id}
              to="/projects"
              className="group grid gap-6 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-7">
                <div className="aspect-[4/3] overflow-hidden rounded-md bg-muted">
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-serif text-7xl text-muted-foreground/40">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-5 md:pt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {p.tags.slice(0, 2).join(" · ")}
                </p>
                <h3 className="font-serif mt-3 text-2xl md:text-3xl">
                  <span className="link-underline">{p.title}</span>
                </h3>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-prose border-t border-border/60 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Kind words</p>
        <h2 className="font-serif mt-3 text-3xl md:text-5xl">Listen to my clients.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="rounded-lg border border-border bg-card p-7"
            >
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                — {t.n}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
