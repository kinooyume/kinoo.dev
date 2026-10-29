import { existsSync, rmSync } from "node:fs";
import { createServer } from "node:http";
import { resolve } from "node:path";
import { findBrowser, printPdf } from "../integrations/cv-pdf";

const [url = "http://localhost:4321/cv", out = "cv-preview.pdf"] =
  process.argv.slice(2);

const browser = findBrowser();
if (!browser) {
  console.error("Chromium introuvable, definir CHROME.");
  process.exit(1);
}

const res = await fetch(url).catch(() => null);
if (!res?.ok) {
  console.error(`${url} inaccessible, lancer bun run dev.`);
  process.exit(1);
}

// The dev HMR client swaps in a stale stylesheet, so serve a script-free copy
// and proxy everything else (images, fonts) to the dev server.
const html = (await res.text()).replace(/<script[\s\S]*?<\/script>/g, "");

const server = createServer(async (req, reply) => {
  if (req.url === "/") {
    reply.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    reply.end(html);
    return;
  }
  const asset = await fetch(new URL(req.url ?? "/", url));
  reply.writeHead(asset.status, {
    "content-type": asset.headers.get("content-type") ?? "application/octet-stream",
  });
  reply.end(Buffer.from(await asset.arrayBuffer()));
});
await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
const { port } = server.address() as { port: number };

rmSync(out, { force: true });
await printPdf(browser, `http://127.0.0.1:${port}/`, resolve(out));
server.close();

if (!existsSync(out)) {
  console.error("Rien genere.");
  process.exit(1);
}
