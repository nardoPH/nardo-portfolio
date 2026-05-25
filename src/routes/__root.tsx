import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="container-prose flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-serif text-7xl">404</p>
      <h2 className="mt-4 text-lg">This page wandered off.</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90"
      >
        Back home
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="container-prose flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="font-serif text-3xl">Something broke.</h1>
      <p className="mt-2 text-sm text-muted-foreground">Try refreshing the page.</p>
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="mt-8 inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
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
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "NARDO" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
