import { Link } from "@tanstack/react-router";
import { Mail, Instagram, Linkedin, MessageCircle, ArrowUpRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import logoLight from "@/assets/figma/nardo-logo-light.png";
import logoDark from "@/assets/figma/nardo-logo-dark.png";

const contacts = [
  { href: "mailto:malana.lenhard.02152003@gmail.com", label: "Email", Icon: Mail },
  { href: "https://instagram.com/nardo.me", label: "Instagram", Icon: Instagram },
  { href: "https://wa.me/639365513174", label: "Whatsapp", Icon: MessageCircle },
  { href: "https://linkedin.com", label: "Linkedin", Icon: Linkedin },
];

export function Footer() {
  const { theme } = useTheme();
  return (
    <footer className="mt-32 border-t border-border/40">
      <div className="container-prose py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <img
              src={theme === "light" ? logoDark : logoLight}
              alt="NARDO"
              className="h-8 w-auto"
            />
            <p className="mt-6 max-w-md text-sm text-muted-foreground leading-relaxed">
              Let's collaborate on your next project and bring your ideas to life
              with thoughtful design, clear strategy, and impactful results.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Work With Me <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="md:col-span-3">
            <p className="font-serif text-2xl">Pages</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/projects" className="hover:text-foreground">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-serif text-2xl">Contacts</p>
            <ul className="mt-5 space-y-3 text-sm">
              {contacts.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-border">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-border/40 pt-6 text-xs text-muted-foreground md:grid-cols-3">
          <div>
            <p className="uppercase tracking-[0.2em] text-foreground/60">My email</p>
            <a href="mailto:malana.lenhard.02152003@gmail.com" className="mt-1 block hover:text-foreground break-all">
              malana.lenhard.02152003@gmail.com
            </a>
          </div>
          <div>
            <p className="uppercase tracking-[0.2em] text-foreground/60">My phone</p>
            <a href="tel:+639365513174" className="mt-1 block hover:text-foreground">
              +63 936 551 3174
            </a>
          </div>
          <div className="md:text-right">
            © {new Date().getFullYear()} NARDO. All Rights Reserved.{" "}
            <Link to="/admin" className="ml-2 underline-offset-4 hover:text-foreground hover:underline">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
