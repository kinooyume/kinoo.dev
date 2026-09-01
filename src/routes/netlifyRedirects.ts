import type { APIRoute } from "astro";
import { articleRedirects } from "@/lib/articles";

export const GET: APIRoute = async () => {
  const lines = (await articleRedirects()).map(
    ({ from, to }) => `${from} ${to} 301`,
  );

  return new Response(lines.length ? `${lines.join("\n")}\n` : "", {
    headers: { "Content-Type": "text/plain" },
  });
};
