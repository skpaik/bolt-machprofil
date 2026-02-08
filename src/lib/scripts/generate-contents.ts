import { buildConfigsJson } from "@/lib/scripts/generate-configs";
import { generateRegistry } from "@/lib/scripts/generate-registry";
import { convertMdToTs } from "@/lib/scripts/convert-md-to-ts";
import { generateJSONContent } from "@/lib/scripts/generate-json-content";
import { generateMDF } from "@/lib/scripts/json-to-md";
import { mainToConfigTs } from "@/lib/scripts/generate-config-ts";
import { generateContentItemCounts } from "@/lib/scripts/generate-content-item-counts";
import { generateContentItemStats } from "@/lib/scripts/generate-content-item-stats";
import { validateContents } from "@/lib/scripts/validate-contents";

// Run all preparation tasks
function main() {
  try {
    //generateMDF();
    // buildConfigsJson();
    mainToConfigTs();
    // generateRegistry();
    //convertMdToTs();
    // generateJSONContent();
    // convertContentListToObject();
    generateContentItemCounts();
    // generateContentItemStats();
    validateContents();
  } catch (error) {
    console.error("❌ Error generating content:", error);
    process.exit(1);
  }
}

export function generateContent(): void {
  main();
}
