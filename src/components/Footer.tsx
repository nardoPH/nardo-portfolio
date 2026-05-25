import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="container-prose flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
        <div>
          <p className="font-serif text-lg">Let's make something together.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            © {new Date().getFullYear()} — All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/contact" className="link-underline hover:text-foreground">
            Contact
          </Link>
          <Link to="/admin" className="link-underline hover:text-foreground">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
