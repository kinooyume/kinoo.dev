import { spawn, spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
};

export function findBrowser() {
  if (process.env.CHROME) return process.env.CHROME;
  return ["chromium", "google-chrome", "google-chrome-stable"].find(
    (b) => spawnSync("which", [b]).status === 0,
  );
}

export async function printPdf(browser: string, url: string, out: string) {
  const profile = await mkdtemp(join(tmpdir(), "cv-pdf-"));
  await new Promise<void>((resolve, reject) => {
    const proc = spawn(browser, [
      "--headless",
      `--user-data-dir=${profile}`,
      "--no-sandbox",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=5000",
      `--print-to-pdf=${out}`,
      url,
    ]);
    proc.on("error", reject);
    proc.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${browser} exited with ${code}`)),
    );
  }).finally(() => rm(profile, { recursive: true, force: true }));
}

export function serve(dir: string) {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
    const file = join(dir, path.endsWith("/") || !extname(path) ? join(path, "index.html") : path);
    let body: Buffer;
    try {
      body = await readFile(file);
    } catch {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  });
  return new Promise<{ url: string; close: () => void }>((resolve) =>
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as { port: number };
      resolve({ url: `http://127.0.0.1:${port}`, close: () => server.close() });
    }),
  );
}

export default function cvPdf({ page = "/cv/", out = "cv.pdf" } = {}): AstroIntegration {
  return {
    name: "cv-pdf",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const browser = findBrowser();
        if (!browser) {
          logger.warn("No Chromium found, CV PDF not generated (set CHROME).");
          return;
        }
        const root = fileURLToPath(dir);
        const server = await serve(root);
        try {
          await printPdf(browser, server.url + page, join(root, out));
          logger.info(`${out} generated from ${page}`);
        } finally {
          server.close();
        }
      },
    },
  };
}
