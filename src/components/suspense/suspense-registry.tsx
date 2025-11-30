// export const suspenseFallbacks2: Record<string, React.ReactNode> = {
//     "/blog": null,       // we will override below
//     "/dashboard": null,  // example
// };
import { BlogSkeleton } from "@/components/suspense/blog-skeleton";

export const suspenseFallbacks: Record<string, React.ReactNode> = {
  "/blog": <BlogSkeleton />,
  "/dashboard": <BlogSkeleton />,
};
