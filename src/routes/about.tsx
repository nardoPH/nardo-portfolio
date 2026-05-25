import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Portfolio" },
      { name: "description", content: "About the designer behind the portfolio." },
      { property: "og:title", content: "About — Portfolio" },
      { property: "og:description", content: "About the designer behind the portfolio." },
    ],
  }),
  component: About,
});

const stack = [
  "React", "TypeScript", "Next.js", "Tailwind", "Figma", "PostgreSQL",
  "Node", "Motion", "Vite", "Storybook",
];

function About() {
  return (
    <div className="container-prose pt-20 pb-24 md:pt-32">
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">About</p>
      <h1 className="font-serif mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">
        I help small teams ship products that feel inevitable.
      </h1>

      <div className="mt-16 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            For the last decade I've worked at the intersection of design and engineering — first as
            a designer who could code, now as an engineer who still cares deeply about how things
            look and feel.
          </p>
          <p>
            My work tends to be quiet. Restrained typography, generous whitespace, fewer interface
            elements than you'd expect. I believe the best interfaces get out of the way and let
            the work happen.
          </p>
          <p>
            When I'm not at a keyboard, I'm usually reading something old, walking somewhere new,
            or trying to make better coffee at home.
          </p>
        </div>

        <aside className="md:col-span-5 space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Currently</p>
            <p className="mt-2 font-serif text-xl">Available for new work — Q3 2026</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Stack</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {stack.map((s) => (
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
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Previously</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex justify-between gap-4 border-b border-border/60 pb-2">
                <span>Senior Designer, Studio Co.</span>
                <span className="text-muted-foreground">'22 — '25</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-border/60 pb-2">
                <span>Product Engineer, Foundry</span>
                <span className="text-muted-foreground">'19 — '22</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Designer, Independent</span>
                <span className="text-muted-foreground">'16 — '19</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
