// file: src/app/global-not-found.tsx
// Import global styles and fonts
import type { Metadata } from "next";
import { geistSans } from "@/assets/fonts";
import "../assets/styles/globals.css";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>
        <h1>404 - Page Not Found</h1>
        <p>This page does not exist.</p>
      </body>
    </html>
  );
}
