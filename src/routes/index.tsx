import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { fetchProjects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Selected Work" },
      {
        name: "description",
        content: "Designer & developer crafting clean, modern digital products.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="container-prose pt-24 pb-16 md:pt-40 md:pb-32">
        <p className="reveal text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Portfolio · 2026
        </p>
        <h1
          className="reveal font-serif mt-6 text-5xl leading-[1.05] md:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          Hello, I'm <em className="italic">Alex</em>.
          <br />
          I design & build
          <br />
          quiet interfaces.
        </h1>
        <p
          className="reveal mt-8 max-w-xl text-base text-muted-foreground md:text-lg"
          style={{ animationDelay: "0.2s" }}
        >
          Independent product designer and front-end engineer focused on clarity, typography, and
          the small details that make software feel considered.
        </p>
        <div
          className="reveal mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
          >
            View work
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="link-underline text-sm text-muted-foreground hover:text-foreground">
            Get in touch
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="container-prose border-t border-border/60 py-20 md:py-28">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">Selected work</h2>
          <Link to="/projects" className="link-underline text-sm text-muted-foreground hover:text-foreground">
            All projects →
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
    </div>
  );
}
