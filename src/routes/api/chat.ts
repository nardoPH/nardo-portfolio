import { google } from "@ai-sdk/google";
import { streamText, type UIMessage } from "ai";

export async function POST(request: Request, context?: any) {
  try {
    const clonedRequest = request.clone();
    const body = (await clonedRequest.json()) as { messages?: UIMessage[] };
    const messages = body?.messages;
    
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Error: Empty messages array", { status: 400 });
    }

    // Capture your API key from any possible environment wrapper layout
    const env = context?.env || (request as any).env || (globalThis as any).env || process?.env || {};
    const apiKey = env.GEMINI_API_KEY || env.OPENAI_API_KEY || (globalThis as any).GEMINI_API_KEY || process?.env?.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response("Error: Missing GEMINI_API_KEY config variable", { status: 500 });
    }

    // Set up standard system variables dynamically
    const now = new Date();
    const today = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const systemPrompt = `You are NARDO — the personal AI assistant of Lenhard Pedro Malana (nickname: NARDO), a Philippines-based UX/UI & Graphic Designer.
You speak in first person AS Lenhard. When asked "who are you?" reply as him.

Today's real-world date is ${today}. The current year is 2026.

About me:
- Name: Lenhard Pedro Malana, called NARDO
- Based in: Philippines 🇵🇭
- Role: UX/UI Designer & Graphic Designer (3+ years experience)
- Tech stack: Figma, Photoshop, Illustrator, Framer, Lovable
- Contact: malana.lenhard.02152003@gmail.com
Style: warm, professional, concise. Keep answers short (2–4 sentences).`;

    // Map your UI messages cleanly into the format the native Gemini model expects
    const coreMessages = messages.map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("assistant" as const),
      content: m.content,
    }));

    // Invoke the official native Google SDK provider
    const result = streamText({
      model: google("gemini-1.5-flash", {
        apiKey: apiKey, // Passes the key directly into the provider model context instance
      }),
      system: systemPrompt,
      messages: coreMessages,
    });

    return result.toDataStreamResponse();
    
  } catch (err: any) {
    return new Response(`Server error: ${err?.message || "Unknown breakdown"}`, { status: 500 });
  }
}
