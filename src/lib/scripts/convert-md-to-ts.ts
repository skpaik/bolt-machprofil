import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * CONFIG
 */
const CONTENT_DIR = path.resolve("contents");
const DATA_DIR = path.resolve("src/data");

/**
 * HELPERS
 */
function isDir(p: string) {
    return fs.existsSync(p) && fs.statSync(p).isDirectory();
}

function readDirs(p: string): string[] {
    return fs.existsSync(p)
        ? fs.readdirSync(p).filter(d => isDir(path.join(p, d)))
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
 * PROCESS CONTENT TYPE
 */
function processContentType(
    inputDir: string,
    outputFile: string
) {
    const mdFiles = fs
        .readdirSync(inputDir)
        .filter(f => f.endsWith(".md"));

    // SINGLE FILE PAGE
    if (mdFiles.length === 1) {
        const file = mdFiles[0];
        const id = path.basename(file, ".md");
        const { meta, html } = readMarkdown(path.join(inputDir, file));

        const ts = `
export const data = {
  id: "${id}",
  ${Object.entries(meta)
            .map(([k, v]) => `${k}: ${JSON.stringify(v)},`)
            .join("\n  ")}
  content: ${JSON.stringify(html)},
} as const;

export default data;
`.trim();

        fs.writeFileSync(outputFile, ts, "utf-8");
        return;
    }

    // MULTI FILE PAGE (LIST)
    const items = mdFiles.map(file => {
        const id = path.basename(file, ".md");
        const { meta, html } = readMarkdown(path.join(inputDir, file));
        return { id, ...meta, content: html };
    });

    const ts = `
export const data = ${JSON.stringify(items, null, 2)} as const;
export default data;
`.trim();

    fs.writeFileSync(outputFile, ts, "utf-8");
}

/**
 * MAIN WALKER
 */
function main() {
    for (const profile of readDirs(CONTENT_DIR)) {
        for (const lang of readDirs(path.join(CONTENT_DIR, profile))) {
            for (const type of readDirs(
                path.join(CONTENT_DIR, profile, lang)
            )) {
                const inputDir = path.join(
                    CONTENT_DIR,
                    profile,
                    lang,
                    type
                );

                const outDir = path.join(
                    DATA_DIR,
                    profile,
                    lang
                );

                fs.mkdirSync(outDir, { recursive: true });

                const outFile = path.join(outDir, `${type}.ts`);
                processContentType(inputDir, outFile);
            }
        }
    }

    console.log("✅ Markdown converted to TypeScript");
}

export function convertMdToTs() {
    main();
}
