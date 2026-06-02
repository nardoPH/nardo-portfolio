import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

function buildSystemPrompt() {
  const now = new Date();
  const today = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `You are NARDO — the personal AI assistant of Lenhard Pedro Malana (nickname: NARDO), a Philippines-based UX/UI & Graphic Designer.
Today's date is ${today}.`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request, context }) => {
        try {
          const clonedRequest = request.clone();
          const body = (await clonedRequest.json()) as { messages?: UIMessage[] };
          const messages = body?.messages;
          
          if (!Array.isArray(messages) || messages.length === 0) {
            return new Response("Error: The message array sent by the frontend UI is empty.", { status: 400 });
          }

          // Gather all environment buckets to see what Cloudflare is passing us
          const env = (context as any)?.env || (request as any).env || (globalThis as any).env || process?.env || {};
          const apiKey = env.GEMINI_API_KEY || env.OPENAI_API_KEY || (globalThis as any).GEMINI_API_KEY || process?.env?.GEMINI_API_KEY;

          // DEBUG CHECK 1: If keys are empty, output exactly what the server sees
          if (!apiKey) {
            const availableKeys = Object.keys(env).join(", ") || "none";
            return new Response(
              `Backend Error: API Key missing. Available keys in your environment setup: [${availableKeys}]. Please add GEMINI_API_KEY to your Cloudflare dashboard environment variables.`,
              { status: 200, headers: { "Content-Type": "text/plain" } }
            );
          }

          const gateway = createOpenAICompatible({
            name: "gemini",
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
            apiKey: apiKey,
          });
          
          // DEBUG CHECK 2: Catch LLM connection or package initialization blocks
          try {
            const result = streamText({
              model: gateway("gemini-1.5-flash"),
              system: buildSystemPrompt(),
              messages: await convertToModelMessages(messages),
            });

            return result.toDataStreamResponse();
          } catch (streamError: any) {
            return new Response(
              `Gateway Stream Error: ${streamError?.message || "Unknown error during text generation setup."}`,
              { status: 200, headers: { "Content-Type": "text/plain" } }
            );
          }
          
        } catch (err: any) {
          // DEBUG CHECK 3: Global parsing / runtime breakdowns
          return new Response(
            `Global Request Error: ${err?.message || "Failed to process the incoming payload request."}`,
            { status: 200, headers: { "Content-Type": "text/plain" } }
          );
        }
      },
    },
  },
});
