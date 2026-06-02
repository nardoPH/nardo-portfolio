import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export function ReviewModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      name: name.trim(),
      comment: comment.trim(),
      rating,
      approved: false,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Couldn't submit review. Try again.");
      return;
    }
    toast.success("Thanks! Your review is pending approval.");
    setOpen(false);
    setName("");
    setComment("");
    setRating(5);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Leave a review</DialogTitle>
          <DialogDescription>
            Worked with me? I'd love to hear from you. Reviews appear publicly after approval.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="mt-2 space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            maxLength={80}
          />
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(n)}
                className="p-1 transition-transform hover:scale-110"
                aria-label={`Rate ${n} stars`}
              >
                <Star
                  className={`h-6 w-6 transition-colors ${
                    n <= (hover || rating) ? "fill-primary text-primary" : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience working with me…"
            required
            rows={4}
            maxLength={500}
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-primary py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit review"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function maskName(name: string) {
  return name
    .split(/\s+/)
    .map((part) => (part.length <= 1 ? part : part[0] + "*".repeat(part.length - 2) + part.slice(-1)))
    .join(" ");
}

export { maskName };
