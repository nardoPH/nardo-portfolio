import { Link, useRouterState } from "@tanstack/react-router";
import { Moon, Sun, Menu, X, Mail } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import logoLight from "@/assets/figma/nardo-logo-light.png";
import logoDark from "@/assets/figma/nardo-logo-dark.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="container-prose flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="NARDO home">
          <img
            src={theme === "light" ? logoDark : logoLight}
            alt="NARDO"
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((item) => {
            const active = path === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_8px_30px_-8px_var(--brand)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_40px_-8px_var(--brand-glow)]"
          >
            <Mail className="h-3.5 w-3.5" /> Let's Talk!
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/40 md:hidden">
          <nav className="container-prose flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground"
            >
              <Mail className="h-3.5 w-3.5" /> Let's Talk!
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
