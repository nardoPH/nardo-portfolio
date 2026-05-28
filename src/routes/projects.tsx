import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchProjects, type Project } from "@/lib/projects";
import navigent from "@/assets/figma/navigent.png";
import sample2k25 from "@/assets/figma/sample-2k25.png";
import sampleRj8 from "@/assets/figma/sample-rj8.png";
import sampleLaptop from "@/assets/figma/sample-laptop.png";
import sampleRodel from "@/assets/figma/sample-rodel.png";

const FALLBACK_IMAGES = [navigent, sample2k25, sampleRj8, sampleLaptop, sampleRodel];
const imagesFor = (p: Project, i: number) =>
  p.images && p.images.length > 0 ? p.images : [FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]];

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Portfolio" },
      { name: "description", content: "A selection of recent projects and case studies." },
      { property: "og:title", content: "Projects — Portfolio" },
      { property: "og:description", content: "A selection of recent projects and case studies." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const open = openIdx !== null ? projects[openIdx] : null;

  return (
    <div className="container-prose pt-20 pb-24 md:pt-32">
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Projects</p>
      <h1 className="font-serif mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">
        A small, curated body of work.
      </h1>

      <div className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/3] rounded-md bg-muted" />
              <div className="mt-4 h-4 w-1/3 bg-muted" />
              <div className="mt-2 h-6 w-2/3 bg-muted" />
            </div>
          ))}

        {projects.map((p, i) => (
          <article
            key={p.id}
            className="reveal group cursor-pointer"
            style={{ animationDelay: `${i * 0.05}s` }}
            onClick={() => setOpen(p)}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-md bg-muted">
              {p.images?.[0] ? (
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-serif text-6xl text-muted-foreground/40">
                  {String(i + 1).padStart(2, "0")}
                </div>
              )}
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {p.tags.slice(0, 3).join(" · ")}
                </p>
                <h2 className="font-serif mt-2 text-2xl">
                  <span className="link-underline">{p.title}</span>
                </h2>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
          </article>
        ))}
      </div>

      {open && <ProjectDialog project={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const images = project.images ?? [];
  const has = images.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-border bg-card p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {project.tags.join(" · ")}
        </p>
        <h2 className="font-serif mt-3 text-3xl md:text-5xl">{project.title}</h2>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{project.description}</p>

        {has && (
          <div className="mt-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-muted">
              <img src={images[idx]} alt="" className="h-full w-full object-cover" />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIdx((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setIdx(i)}
                    className={`aspect-square h-16 shrink-0 overflow-hidden rounded border-2 transition-colors ${
                      i === idx ? "border-foreground" : "border-transparent opacity-60"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              Live demo <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm transition-colors hover:bg-muted"
            >
              Source <Github className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
