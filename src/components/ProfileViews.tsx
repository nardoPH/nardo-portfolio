import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function ProfileViews({ page = "home" }: { page?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      // Increment once per session
      const key = `viewed:${page}`;
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        const { data } = await supabase.rpc("increment_page_view", { _page: page });
        if (!cancelled && typeof data === "number") setCount(data);
      } else {
        const { data } = await supabase
          .from("page_views")
          .select("count")
          .eq("page", page)
          .maybeSingle();
        if (!cancelled && data) setCount(data.count as number);
      }
    }
    init();

    const channel = supabase
      .channel(`page_views:${page}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "page_views", filter: `page=eq.${page}` },
        (payload) => {
          const next = (payload.new as { count: number }).count;
          setCount(next);
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [page]);

  return (
    <div className="reveal inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground">
      <Eye className="h-3.5 w-3.5" />
      <span className="font-medium text-foreground">
        {count !== null ? count.toLocaleString() : "—"}
      </span>{" "}
      Profile Views
    </div>
  );
}
