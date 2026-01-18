import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { toTsObject } from "@/lib/scripts/helpers/to-ts-helper";

/**
 * CONFIG
 */
const CONTENT_DIR = path.resolve("contents");
const DATA_DIR = path.resolve("src/data/contents");

/**
 * Folders that should be converted as:
 * {
 *   fileName: content
 * }
 * instead of list
 */
const OBJECT_BY_FILENAME_FOLDERS = new Set<string>([
  "about_content",
  "static_contents",
  "info",
]);

/**
 * HELPERS
 */
function isDir(p: string): boolean {
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
}

function readDirs(p: string): string[] {
  return fs.existsSync(p)
      ? fs.readdirSync(p).filter((d) => isDir(path.join(p, d)))
      : [];
}

function readMarkdown(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: data,
    html: marked.parse(content),
  };
}

/**
 * PROCESSORS
 */

/**
 * Converts:
 * contents/.../type/file.md
 * →
 * export const data = { file: content }
 */
function processObjectByFilename(inputDir: string, outputFile: string) {
  const mdFiles = fs.readdirSync(inputDir).filter((f) => f.endsWith(".md"));

  const result: Record<string, any> = {};

  for (const file of mdFiles) {
    const key = path.basename(file, ".md");
    const { meta, html } = readMarkdown(path.join(inputDir, file));

    // Preserve array front-matter exactly
    if (Array.isArray(meta)) {
      result[key] = meta;
    } else {
      result[key] = {
        ...meta,
        content: html,
      };
    }
  }

  const ts = `
export const data = ${toTsObject(result)} as const satisfies unknown;
export default data;
`.trim();

  fs.writeFileSync(outputFile, ts, "utf-8");
}

/**
 * Converts:
 * contents/.../type/1.md
 * contents/.../type/2.md
 * →
 * export const data = [ ... ]
 */
function processList(inputDir: string, outputFile: string) {
  const mdFiles = fs.readdirSync(inputDir).filter((f) => f.endsWith(".md"));

  const items = mdFiles.map((file) => {
    const id = path.basename(file, ".md");
    const { meta, html } = readMarkdown(path.join(inputDir, file));

    // If front-matter is an array, return it directly
    if (Array.isArray(meta)) {
      return meta;
    }

    return {
      id,
      ...meta,
      content: html,
    };
  });

  const ts = `
export const data = ${toTsObject(items)} as const satisfies unknown;
export default data;
`.trim();

  fs.writeFileSync(outputFile, ts, "utf-8");
}

/**
 * DISPATCHER
 */
function processContentType(
    inputDir: string,
    type: string,
    outputFile: string
) {
  if (OBJECT_BY_FILENAME_FOLDERS.has(type)) {
    processObjectByFilename(inputDir, outputFile);
    return;
  }

  processList(inputDir, outputFile);
}

/**
 * MAIN WALKER
 */
function main() {
  for (const profile of readDirs(CONTENT_DIR)) {
    for (const lang of readDirs(path.join(CONTENT_DIR, profile))) {
      for (const type of readDirs(path.join(CONTENT_DIR, profile, lang))) {
        const inputDir = path.join(CONTENT_DIR, profile, lang, type);
        const outDir = path.join(DATA_DIR, profile, lang);

        fs.mkdirSync(outDir, { recursive: true });

        const outFile = path.join(outDir, `${type}.ts`);
        processContentType(inputDir, type, outFile);
      }
    }
  }

  console.log("✅ Markdown converted to TypeScript");
}

export function convertMdToTs() {
  main();
}
