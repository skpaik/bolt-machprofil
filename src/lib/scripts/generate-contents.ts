import { buildConfigsJson } from "@/lib/scripts/generate-configs";
import { generateRegistry } from "@/lib/scripts/generate-registry";
import { convertMdToTs } from "@/lib/scripts/convert-md-to-ts";
import { generateJSONContent } from "@/lib/scripts/generate-json-content";
import { generateMDF } from "@/lib/scripts/json-to-md";
import { mainToConfigTs } from "@/lib/scripts/generate-config-ts";
import {generateAllowedProfiles} from "@/lib/scripts/generate-allowed-profiles";
import {convertContentListToObject} from "@/lib/scripts/convert-content-list-to-object";

// Run all preparation tasks
function main() {
  try {
    generateMDF();
    // buildConfigsJson();
    mainToConfigTs();
    // generateRegistry();
    convertMdToTs();
    // generateJSONContent();
    convertContentListToObject();
  } catch (error) {
    console.error("❌ Error generating content:", error);
    process.exit(1);
  }
}

export function generateContent(): void {
  main();
}
