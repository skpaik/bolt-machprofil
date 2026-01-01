import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SRC_BASE = path.join(process.cwd(), "src/data/en");
const OUT_BASE = path.join(process.cwd(), "contents/en");

/* ----------------------------- Utils ----------------------------- */

function ensureDir(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function readJSON(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

/* ---------------------- Content Writers -------------------------- */

/**
 * 1. List-based JSON
 * blog_list.json → blog_list/{id}.md
 */
function handleListJSON(
    data: any[],
    outputDir: string
) {
    ensureDir(outputDir);

    data.forEach((item) => {
        if (!item.id) {
            throw new Error("List item missing `id` field");
        }

        const { id, body, content, ...frontmatter } = item;

        const md = matter.stringify(
            body || content || "",
            { id, ...frontmatter }
        );

        fs.writeFileSync(
            path.join(outputDir, `${id}.md`),
            md
        );
    });
}

/**
 * 2. Structured object JSON
 * about.json → about/bio.md, about/interests.md, etc.
 */
function handleStructuredObjectJSON(
    data: Record<string, any>,
    outputDir: string
) {
    ensureDir(outputDir);

    Object.entries(data).forEach(([key, value]) => {
        let frontmatter: any = {};
        let body = "";

        if (typeof value === "string") {
            body = value;
        } else if (Array.isArray(value)) {
            frontmatter.items = value;
        } else if (typeof value === "object") {
            frontmatter = value;
        }

        const md = matter.stringify(body, frontmatter);

        fs.writeFileSync(
            path.join(outputDir, `${key}.md`),
            md
        );
    });
}

/**
 * 3. Single object JSON
 * site.json → site.md
 */
function handleSingleObjectJSON(
    data: Record<string, any>,
    outputDir: string,
    fileName: string
) {
    ensureDir(outputDir);

    const md = matter.stringify("", data);

    fs.writeFileSync(
        path.join(outputDir, `${fileName}.md`),
        md
    );
}

/* ------------------------ Dispatcher ----------------------------- */

function processJSONFile(filePath: string) {
    const fileName = path.basename(filePath, ".json");
    const data = readJSON(filePath);

    const outputDir = path.join(OUT_BASE, fileName);

    if (Array.isArray(data)) {
        // blog_list, certificate_list, etc.
        handleListJSON(data, outputDir);
        return;
    }

   else if (
        typeof data === "object" &&
        Object.values(data).some(Array.isArray)
    ) {
        // about.json, profile.json
        handleStructuredObjectJSON(data, outputDir);
        return;
    }
else
    if (typeof data === "object") {
        // site.json, theme.json
        handleSingleObjectJSON(data, OUT_BASE, fileName);
        return;
    }

    throw new Error(`Unsupported JSON structure: ${fileName}`);
}

/* ---------------------------- Runner ----------------------------- */



export function generateMDF(){
    // Run for all JSON files
    fs.readdirSync(SRC_BASE)
        .filter((f) => f.endsWith(".json"))
        .forEach((file) => {
            processJSONFile(path.join(SRC_BASE, file));
        });

    console.log("✔ JSON → Markdown generation completed");
}