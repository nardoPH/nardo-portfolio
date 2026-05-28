// Tech stack icons matching the Figma "My Tools" section.
// Uses Iconify CDN so icons stay crisp and lightweight.
const tools: { name: string; icon: string }[] = [
  { name: "Figma", icon: "skill-icons:figma-light" },
  { name: "Photoshop", icon: "devicon:photoshop" },
  { name: "Illustrator", icon: "devicon:illustrator" },
  { name: "Adobe Fresco", icon: "simple-icons:adobefresco" },
  { name: "Framer", icon: "logos:framer" },
  { name: "Lottie", icon: "material-icon-theme:lottie" },
  { name: "CapCut", icon: "simple-icons:capcut" },
  { name: "Filmora", icon: "simple-icons:wondersharefilmora" },
  { name: "ChatGPT", icon: "simple-icons:openai" },
  { name: "Lovable", icon: "devicon:lovable" },
  { name: "Google Drive", icon: "logos:google-drive" },
  { name: "Asana", icon: "devicon:asana" },
  { name: "Trello", icon: "logos:trello" },
  { name: "Slack", icon: "devicon:slack" },
];

interface Props {
  label?: string;
  className?: string;
}

export function TechStack({ label = "Tech Stacks", className = "" }: Props) {
  return (
    <div className={className}>
      <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {tools.map((t) => (
          <div
            key={t.name}
            title={t.name}
            className="group grid h-14 w-14 place-items-center rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-primary hover:shadow-lg hover:shadow-primary/20 md:h-16 md:w-16"
          >
            <img
              src={`https://api.iconify.design/${t.icon}.svg`}
              alt={t.name}
              loading="lazy"
              className="h-8 w-8 md:h-9 md:w-9 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
