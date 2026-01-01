import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SRC_BASE = path.join(process.cwd(), "src/data/en");
const OUT_BASE = path.join(process.cwd(), "contents/en");

function ensureDir(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function generateMarkdownFiles(jsonFilePath: string) {
    const fileName = path.basename(jsonFilePath, ".json"); // blog_list
    const outDir = path.join(OUT_BASE, fileName);

    ensureDir(outDir);

    const raw = fs.readFileSync(jsonFilePath, "utf-8");
    const items = JSON.parse(raw);
    console.log('generateMarkdownFiles jsonFilePath > ', jsonFilePath)
    console.log('generateMarkdownFiles items> ', items)

    if (!Array.isArray(items)) {
        throw new Error(`${fileName}.json must contain an array`);
    }

    items.forEach((item) => {
        if (!item.id) {
            throw new Error(`Missing id in ${fileName}.json item`);
        }

        const { id, content, body, ...frontmatter } = item;

        const mdContent = matter.stringify(
            body || content || "Sample content",
            {
                id,
                ...frontmatter,
            }
        );

        const outFile = path.join(outDir, `${id}.md`);
        fs.writeFileSync(outFile, mdContent);
    });

    console.log(`✔ Generated ${items.length} files for ${fileName}`);
}




export function generateMDF(){
    // Run for all JSON files
    fs.readdirSync(SRC_BASE)
        .filter((f) => f.endsWith(".json"))
        .forEach((file) => {
            generateMarkdownFiles(path.join(SRC_BASE, file));
        });
}