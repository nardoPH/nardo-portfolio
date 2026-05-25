import { Link } from "@tanstack/react-router";
import { Mail, Phone, Instagram, Linkedin, MessageCircle } from "lucide-react";

const links = [
  { href: "mailto:malana.lenhard.02152003@gmail.com", label: "Email", Icon: Mail },
  { href: "https://wa.me/639365513174", label: "Whatsapp", Icon: MessageCircle },
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://linkedin.com", label: "Linkedin", Icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="container-prose py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Let's talk</p>
            <h3 className="font-serif mt-4 text-3xl md:text-5xl">
              Let's collaborate on your next project.
            </h3>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center rounded-full border border-border px-6 py-3 text-sm transition-colors hover:bg-muted"
            >
              Work With Me →
            </Link>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Pages</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-muted-foreground">Home</Link></li>
              <li><Link to="/about" className="hover:text-muted-foreground">About</Link></li>
              <li><Link to="/services" className="hover:text-muted-foreground">Services</Link></li>
              <li><Link to="/projects" className="hover:text-muted-foreground">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-muted-foreground">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              {links.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-muted-foreground"
                  >
                    <Icon className="h-3.5 w-3.5" /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} NARDO — Lenhard Pedro Malana. All rights reserved.</p>
          <Link to="/admin" className="hover:text-foreground">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
