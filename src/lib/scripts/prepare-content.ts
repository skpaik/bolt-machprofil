import { generateBlogPostsSlugsSlug } from "@/lib/scripts/generate-blog-slug";

// Run all preparation tasks
function main() {
  try {
    generateBlogPostsSlugsSlug();

    console.log("✨ Content preparation completed successfully!");
  } catch (error) {
    console.error("❌ Error during content preparation:", error);
    process.exit(1);
  }
}

main();
