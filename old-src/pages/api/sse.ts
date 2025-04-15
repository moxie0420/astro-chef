import { createReadable, getEventEmitter } from "@lib/events";

export async function GET() {
  const readable = createReadable(getEventEmitter());
  return new Response(readable, {
    headers: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    },
  });
}
