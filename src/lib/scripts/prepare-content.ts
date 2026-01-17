import {generateBlogPostsSlugsSlug} from "@/lib/scripts/generate-blog-slug";
import {generateContent} from "@/lib/scripts/generate-contents";
import {generateAllowedProfiles} from "@/lib/scripts/generate-allowed-profiles";

// Run all preparation tasks
function main() {
    generateBlogPostsSlugsSlug()
        .then(r => {
            console.log("✨ Content preparation completed successfully!");
        })
        .catch((error) => {
            console.error("❌ Error during content preparation:", error);
            process.exit(1);
        });
}

generateAllowedProfiles();
main();
generateContent();
