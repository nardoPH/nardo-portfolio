import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const SUGGESTIONS = [
  "Who are you?",
  "What services do you offer?",
  "Show me your projects",
  "How can I hire you?",
];

const transport = new DefaultChatTransport({ api: "/api/chat" });

function getText(m: UIMessage) {
  return (m.parts ?? [])
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("");
}

export function NardoAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport,
  });

  const loading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" });
  }, [messages, open]);

  function submit(text: string) {
    const trimmed = text.trim().slice(0, 1500);
    if (!trimmed || loading) return;
    setInput("");
    void sendMessage({ text: trimmed });
  }

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close NARDO assistant" : "Open NARDO assistant"}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_40px_-10px_var(--brand)] transition-all hover:scale-105 active:scale-95 md:bottom-8 md:right-8"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        {!open && (
          <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-background">
            <Sparkles className="h-2.5 w-2.5 text-primary" />
          </span>
        )}
      </button>

      {/* Panel */}
      <div
        className={`fixed inset-x-3 bottom-24 z-50 origin-bottom-right transition-all md:inset-auto md:bottom-28 md:right-8 md:w-[400px] ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="flex h-[70vh] max-h-[600px] flex-col overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-primary/15 to-transparent px-5 py-4">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">NARDO Assistant</p>
              <p className="text-[11px] text-muted-foreground">Ask me anything about Lenhard</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm">
                  Hi! I'm <span className="font-semibold text-brand">NARDO</span> 👋 Ask me about my
                  work, services, or how we can collaborate.
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => {
              const text = getText(m);
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      isUser
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-muted text-foreground"
                    }`}
                  >
                    {text || (loading && !isUser ? "…" : "")}
                  </div>
                </div>
              );
            })}

            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/50 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/50 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/50" />
                </div>
              </div>
            )}

            {error && (
              <p className="text-center text-xs text-destructive">
                Something went wrong. Please try again.
              </p>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-background/60 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message NARDO…"
              maxLength={1500}
              className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
