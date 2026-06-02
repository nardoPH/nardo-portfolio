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

    // 🌟 HARDCODE YOUR KEY HERE FOR AN IMMEDIATE QUICK FIX:
    const apiKey = "AQ.Ab8RN6JR7MvctNgrdQAY6Gr7IuDH66hbyQn2mo0ql2OcbQ2LpA"; 

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

    const coreMessages = messages.map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("assistant" as const),
      content: m.content,
    }));

    const result = streamText({
      model: google("gemini-1.5-flash", {
        apiKey: apiKey, 
      }),
      system: systemPrompt,
      messages: coreMessages,
    });

    return result.toDataStreamResponse();
    
  } catch (err: any) {
    return new Response(`Server error: ${err?.message || "Unknown breakdown"}`, { status: 500 });
  }
}
