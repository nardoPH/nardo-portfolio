import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { getChatStreamResponse } from "./api/-chat"; // Note the clean local hyphen import path

export const Route = createFileRoute("/chat")({
  component: ChatComponent,
});

function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    // Custom intercept handler to stream processing entirely inside the client sandbox
    fetch: async (url, options) => {
      try {
        const body = JSON.parse(options?.body as string);
        const streamResult = await getChatStreamResponse(body.messages);
        
        // Return standard raw stream response configuration directly back to useChat
        return streamResult.toDataStreamResponse();
      } catch (err: any) {
        console.error("Direct execution failure:", err);
        return new Response(
          JSON.stringify({ error: err?.message || "Failed to process chat pipeline locally" }), 
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4 font-sans bg-background text-foreground">
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Chat with NARDO</h1>
        <p className="text-sm text-muted-foreground">AI Assistant to Lenhard Pedro Malana</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <p className="text-lg font-medium">Hello! I am NARDO.</p>
            <p className="text-sm max-w-sm mx-auto mt-1">
              Ask me anything about Lenhard's UX/UI projects, tech stack, or how to collaborate on design work!
            </p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 p-4 rounded-lg border ${
              m.role === "user" ? "bg-muted/40 ml-12 border-muted" : "bg-card mr-12 border-border"
            }`}
          >
            <div className="mt-0.5 p-1.5 rounded-md bg-secondary">
              {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {m.role === "user" ? "You" : "NARDO"}
              </p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground p-2">
            <Loader2 size={16} className="animate-spin" />
            <span>NARDO is thinking...</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            Something went wrong connecting to the assistant. Please verify your VITE_GEMINI_API_KEY setup inside your hosting environment controls.
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t pt-4 bg-background">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about design services, branding, projects..."
          className="flex-1 min-w-0 px-4 py-2 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground h-9 w-9 hover:bg-primary/90 disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
