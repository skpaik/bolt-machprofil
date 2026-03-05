import { mainToConfigTs } from "@/lib/scripts/generate-config-ts";
import { generateContentItemCounts } from "@/lib/scripts/generate-content-item-counts";
import { validateContents } from "@/lib/scripts/validate-contents";
import {convertMdToTs} from "@/lib/scripts/convert-md-to-ts";

// Run all preparation tasks
function main() {
  try {
    //generateMDF();
    // buildConfigsJson();
    mainToConfigTs();
    // generateRegistry();
    convertMdToTs();
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
