import { supabase } from "@/integrations/supabase/client";

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar_url: string | null;
  created_at: string;
};

export async function fetchApprovedReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, rating, comment, avatar_url, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(12);
  if (error) throw error;
  return (data ?? []) as Review[];
}
