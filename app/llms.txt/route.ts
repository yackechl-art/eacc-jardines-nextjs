import { loadContent } from "@/sanity/lib/content";
import { llmsText } from "@/lib/llms";

export async function GET() {
  return new Response(llmsText(false, await loadContent("es", false)), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
