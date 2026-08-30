import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const [nameArg, dirArg] = process.argv.slice(2);

const slug = ((nameArg ?? "").trim() || "helloworld")
  .replace(/\.mdx?$/i, "")
  .trim()
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

if (!slug) {
  console.error("Nom de fichier vide apres slugification.");
  process.exit(1);
}

const dir = dirArg
  ? dirArg.includes("/")
    ? dirArg
    : join("src/content", dirArg)
  : "src/content/articles";

const target = join(dir, `${slug}.mdx`);

if (existsSync(target)) {
  console.error(`${target} existe deja.`);
  process.exit(1);
}

const template = await readFile("templates/article.mdx", "utf8");
const title = slug.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
const date = new Date().toISOString().slice(0, 10);

await mkdir(dirname(target), { recursive: true });
await writeFile(
  target,
  template.replaceAll("{{title}}", title).replaceAll("{{date}}", date),
);

process.stdout.write(`${target}\n`);
