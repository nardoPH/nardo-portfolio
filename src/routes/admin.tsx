import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, X, Upload, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  createProject,
  deleteProject,
  fetchProjects,
  updateProject,
  uploadProjectImage,
  type Project,
  type ProjectInsert,
} from "@/lib/projects";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Portfolio" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type Session = Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"];

function AdminPage() {
  const [session, setSession] = useState<Session>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(false);
      setChecking(false);
      return;
    }
    setChecking(true);
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => {
        setIsAdmin(!!data);
        setChecking(false);
      });
  }, [session]);

  if (!session) return <AuthForm />;
  if (checking)
    return (
      <div className="container-prose pt-32 text-sm text-muted-foreground">Checking access…</div>
    );
  if (!isAdmin) return <NotAdmin email={session.user.email ?? ""} userId={session.user.id} />;

  return <Dashboard />;
}

function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Signing you in…");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-prose flex min-h-[70vh] items-center justify-center pt-20">
      <div className="w-full max-w-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin access</p>
        <h1 className="font-serif mt-3 text-3xl">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full border-b border-border bg-transparent py-2 outline-none focus:border-foreground"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-2 w-full border-b border-border bg-transparent py-2 outline-none focus:border-foreground"
            />
          </div>
          <button
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "…" : mode === "signin" ? "Sign in" : "Sign up"}
          </button>
        </form>
        <button
          onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
          className="mt-6 text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "signin" ? "No account? Create one →" : "Have an account? Sign in →"}
        </button>
      </div>
    </div>
  );
}

function NotAdmin({ email, userId }: { email: string; userId: string }) {
  return (
    <div className="container-prose flex min-h-[70vh] flex-col items-center justify-center pt-20 text-center">
      <h1 className="font-serif text-3xl">Almost there.</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        You're signed in as <strong>{email}</strong>, but this account is not yet an admin. Run the
        snippet below in Lovable Cloud to grant yourself access.
      </p>
      <pre className="mt-6 max-w-full overflow-x-auto rounded-md bg-muted p-4 text-left text-xs">
{`insert into public.user_roles (user_id, role)
values ('${userId}', 'admin');`}
      </pre>
      <button
        onClick={() => supabase.auth.signOut()}
        className="mt-8 text-xs text-muted-foreground hover:text-foreground"
      >
        Sign out
      </button>
    </div>
  );
}

function Dashboard() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Project | "new" | null>(null);
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const del = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success("Project deleted");
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="container-prose pt-20 pb-24 md:pt-28">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin</p>
          <h1 className="font-serif mt-2 text-4xl">Manage projects</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing("new")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> New project
          </button>
          <button
            onClick={() => supabase.auth.signOut()}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="mt-12 divide-y divide-border border-y border-border">
        {isLoading && <p className="py-6 text-sm text-muted-foreground">Loading…</p>}
        {projects.map((p) => (
          <div key={p.id} className="flex items-center gap-4 py-4">
            <div className="aspect-square h-16 w-16 shrink-0 overflow-hidden rounded bg-muted">
              {p.images?.[0] && (
                <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-lg">{p.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {p.tags.join(" · ") || "No tags"} · {p.images.length} image
                {p.images.length === 1 ? "" : "s"}
                {p.featured && " · Featured"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setEditing(p)}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete "${p.title}"?`)) del.mutate(p.id);
                }}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-destructive"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {!isLoading && projects.length === 0 && (
          <p className="py-6 text-sm text-muted-foreground">No projects yet.</p>
        )}
      </div>

      {editing && (
        <ProjectEditor
          project={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            qc.invalidateQueries({ queryKey: ["projects"] });
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function ProjectEditor({
  project,
  onClose,
  onSaved,
}: {
  project: Project | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [tags, setTags] = useState((project?.tags ?? []).join(", "));
  const [github_url, setGithub] = useState(project?.github_url ?? "");
  const [demo_url, setDemo] = useState(project?.demo_url ?? "");
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [display_order, setOrder] = useState(project?.display_order ?? 0);
  const [images, setImages] = useState<string[]>(project?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadProjectImage));
      setImages((prev) => [...prev, ...urls]);
      toast.success(`Uploaded ${urls.length} image${urls.length === 1 ? "" : "s"}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function onSave() {
    setSaving(true);
    try {
      const payload: ProjectInsert = {
        title,
        description,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        github_url: github_url || null,
        demo_url: demo_url || null,
        featured,
        display_order: Number(display_order) || 0,
        images,
      };
      if (project) await updateProject(project.id, payload);
      else await createProject(payload);
      toast.success("Saved");
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/90 p-4 backdrop-blur-sm md:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-lg border border-border bg-card p-8 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="font-serif text-2xl">{project ? "Edit project" : "New project"}</h2>

        <div className="mt-6 space-y-5">
          <Input label="Title" value={title} onChange={setTitle} />
          <div>
            <Label>Description</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-2 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
            />
          </div>
          <Input label="Tags (comma separated)" value={tags} onChange={setTags} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input label="GitHub URL" value={github_url} onChange={setGithub} />
            <Input label="Demo URL" value={demo_url} onChange={setDemo} />
          </div>

          <div>
            <Label>Images</Label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {images.map((src) => (
                <div key={src} className="group relative aspect-square overflow-hidden rounded bg-muted">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <button
                    onClick={() => setImages((p) => p.filter((s) => s !== src))}
                    className="absolute right-1 top-1 rounded-full bg-background/90 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Remove"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <label className="flex aspect-square cursor-pointer items-center justify-center rounded border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground">
                <input type="file" accept="image/*" multiple onChange={onFile} className="hidden" />
                {uploading ? "…" : <Upload className="h-5 w-5" />}
              </label>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Display order"
              value={String(display_order)}
              onChange={(v) => setOrder(Number(v) || 0)}
            />
            <label className="flex items-end gap-2 pb-2">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm">Featured on homepage</span>
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-full px-5 py-2 text-sm hover:bg-muted">
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving || !title}
            className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{children}</label>;
}
function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}
