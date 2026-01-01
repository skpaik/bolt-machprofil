import { buildConfigsJson } from "@/lib/scripts/generate-configs";
import { generateRegistry } from "@/lib/scripts/generate-registry";
import { convertMdToTs } from "@/lib/scripts/convert-md-to-ts";
import { generateContent } from "@/lib/scripts/generate-json-content";
import { generateMDF } from "@/lib/scripts/json-to-md";

try {
  generateMDF();
  //buildConfigsJson();
  // generateRegistry();
  // convertMdToTs();
  generateContent();
} catch (error) {
  console.error("❌ Error generating content:", error);
  process.exit(1);
}
