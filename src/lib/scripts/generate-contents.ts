import { buildConfigsJson } from "@/lib/scripts/generate-configs";
import { generateRegistry } from "@/lib/scripts/generate-registry";
import { convertMdToTs } from "@/lib/scripts/convert-md-to-ts";
import { generateJSONContent } from "@/lib/scripts/generate-json-content";
import { generateMDF } from "@/lib/scripts/json-to-md";
import {mainToTs} from "@/lib/scripts/generate-config-ts";

// Run all preparation tasks
function main() {
  try {
    generateMDF();
    buildConfigsJson();
    mainToTs();
    // generateRegistry();
    convertMdToTs();
    generateJSONContent();
  } catch (error) {
    console.error("❌ Error generating content:", error);
    process.exit(1);
  }
}

export function generateContent(): void {
  main();
}