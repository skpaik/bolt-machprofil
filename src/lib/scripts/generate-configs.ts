import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Paths
const CONFIG_DIR = path.join(process.cwd(), "contents/configs");
const OUTPUT_FILE = path.join(process.cwd(), "src/data/configs.json");

// Helper to parse a markdown file into JSON
function parseConfigFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);
  return { ...data, content };
}

// Read all md files in configs folder
export function main () {
  if (!fs.existsSync(CONFIG_DIR)) {
    throw new Error("Configs folder not found: " + CONFIG_DIR);
  }

  const files = fs.readdirSync(CONFIG_DIR).filter((f) => f.endsWith(".md"));

  const configs: Record<string, any> = {};

  files.forEach((file) => {
    const fileName = path.basename(file, ".md"); // e.g., languages, profile
    const filePath = path.join(CONFIG_DIR, file);
    const parsed = parseConfigFile(filePath);

    configs[fileName] = parsed;
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(configs, null, 2), "utf-8");
  console.log("Config JSON generated at:", OUTPUT_FILE);
}

export function buildConfigsJson(): void {
  main();
}