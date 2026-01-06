import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Paths
const CONFIG_DIR = path.join(process.cwd(), "contents/configs");
const OUTPUT_DIR = path.join(process.cwd(), "src/data/configs/generated");

// Helper to parse a markdown file into JSON
function parseConfigFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);
  return { ...data, content };
}

// Convert JS object to TS string with unquoted keys
function objectToTs(obj: any, indent = 2): string {
  const spacing = " ".repeat(indent);
  if (typeof obj !== "object" || obj === null) {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    const arrayItems = obj.map((v) => objectToTs(v, indent + 2)).join(", ");
    return `[${arrayItems}]`;
  }

  const props = Object.entries(obj)
    .map(([k, v]) => {
      const key = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(k) ? k : `"${k}"`;
      return `${spacing}${key}: ${objectToTs(v, indent + 2)}`;
    })
    .join(",\n");

  return `{\n${props}\n${" ".repeat(indent - 2)}}`;
}

// Generate TS file for a single config
function writeTsFile(key: string, value: any) {
  const tsFilePath = path.join(OUTPUT_DIR, `${key}.ts`);
  const tsContent = `// This file is auto-generated from markdown
export const ${key}_const = ${objectToTs(value, 2)} as const;
`;
  fs.writeFileSync(tsFilePath, tsContent, "utf-8");
  console.log(`Generated TS file: ${tsFilePath}`);
}

// Main function to convert each markdown file into separate TS files
export function mainToTs() {
  if (!fs.existsSync(CONFIG_DIR)) {
    throw new Error("Configs folder not found: " + CONFIG_DIR);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(CONFIG_DIR).filter((f) => f.endsWith(".md"));

  files.forEach((file) => {
    const fileName = path.basename(file, ".md"); // e.g., languages, profile
    const filePath = path.join(CONFIG_DIR, file);
    const parsed = parseConfigFile(filePath);

    writeTsFile(fileName, parsed);
  });

  console.log("All markdown files converted to TS constants in:", OUTPUT_DIR);
}
