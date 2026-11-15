/**
 * Mirrors Next.js `out/` into the repository root so GitHub Pages can serve
 * from branch `main` path `/` without switching the Pages source to Actions.
 * Source directories listed in PRESERVE are never deleted.
 */
import { cpSync, existsSync, readdirSync, rmSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const OUT = join(ROOT, "out");

const PRESERVE = new Set([
  ".git",
  ".github",
  ".gitignore",
  ".cursor",
  "app",
  "node_modules",
  "out",
  "package.json",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "next.config.ts",
  "next.config.js",
  "next-env.d.ts",
  "postcss.config.mjs",
  "tsconfig.json",
  "README.md",
  "scripts",
  "public",
  ".DS_Store",
]);

if (!existsSync(OUT)) {
  console.error("Missing out/ — run next build first");
  process.exit(1);
}

for (const name of readdirSync(ROOT)) {
  if (PRESERVE.has(name)) continue;
  rmSync(join(ROOT, name), { recursive: true, force: true });
}

for (const name of readdirSync(OUT)) {
  if (PRESERVE.has(name)) {
    console.warn(`Skipping collide with source: ${name}`);
    continue;
  }
  cpSync(join(OUT, name), join(ROOT, name), { recursive: true });
}

if (!existsSync(join(ROOT, ".nojekyll"))) {
  writeFileSync(join(ROOT, ".nojekyll"), "");
}

console.log("Synced out/ → repository root for GitHub Pages (branch /).");
