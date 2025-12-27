import {buildConfigsJson} from "@/lib/scripts/generate-configs";
import {generateRegistry} from "@/lib/scripts/generate-registry";


try {
    buildConfigsJson();
    generateRegistry();
} catch (error) {
    console.error("❌ Error generating content:", error);
    process.exit(1);
}
