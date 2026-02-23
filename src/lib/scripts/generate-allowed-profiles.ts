import fs from "fs";
import path from "path";
import { AllowedProfile, LanguageItem } from "@/lib/types/portfolio";
import { LanguageType, ProfileType } from "@/lib/types/type.config";

/* ============================
 * Paths
 * ============================ */
const CONTENTS_DIR = path.join(process.cwd(), "contents");
const LANGUAGE_LIST_FILE = path.join(
  process.cwd(),
  "src/data/configs/constants/language_list.json",
);
const OUTPUT_FILE = path.join(
  process.cwd(),
  "src/data/configs/generated/allowed_profile_list.ts",
);

/* ============================
 * Types
 * ============================ */

/* ============================
 * Helpers
 * ============================ */
function toTitleCase(value: string): string {
  return value.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function loadLanguageList(): Map<string, string> {
  const raw = fs.readFileSync(LANGUAGE_LIST_FILE, "utf-8");
  const list: LanguageItem[] = JSON.parse(raw);

  return new Map(list.map((l) => [l.value, l.label]));
}

function getProfiles(): string[] {
  return fs
    .readdirSync(CONTENTS_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name !== "configs")
    .map((dirent) => dirent.name);
}

function getProfileLanguages(profile: string): string[] {
  const profilePath = path.join(CONTENTS_DIR, profile);

  return fs
    .readdirSync(profilePath, { withFileTypes: true })
    .filter(
      (dirent) =>
        dirent.isDirectory() ||
        (dirent.isFile() && dirent.name.endsWith(".md")),
    )
    .map((dirent) =>
      dirent.isDirectory() ? dirent.name : dirent.name.replace(/\.md$/, ""),
    );
}

function serializeTS(value: unknown, indent = 0): string {
  const space = "  ".repeat(indent);

  if (Array.isArray(value)) {
    return `[\n${value
      .map((v) => `${space}  ${serializeTS(v, indent + 1)}`)
      .join(",\n")}\n${space}]`;
  }

  if (typeof value === "object" && value !== null) {
    return `{\n${Object.entries(value)
      .map(([key, val]) => `${space}  ${key}: ${serializeTS(val, indent + 1)}`)
      .join(",\n")}\n${space}}`;
  }

  if (typeof value === "string") {
    return `"${value}"`;
  }

  return String(value);
}

/* ============================
 * Main
 * ============================ */
function main(): void {
  const languageMap = loadLanguageList();
  const profiles = getProfiles();

  const allowedProfiles: AllowedProfile[] = [];

  for (const profile of profiles) {
    const detectedLanguages = getProfileLanguages(profile);

    const allowedLanguages: LanguageItem[] = detectedLanguages
      .filter((lang): lang is LanguageType =>
        languageMap.has(lang as LanguageType),
      )
      .map((lang) => ({
        value: lang,
        label: languageMap.get(lang)!,
      }))
      .sort((a, b) => a.value.localeCompare(b.value));
    if (allowedLanguages.length === 0) continue;

    allowedProfiles.push({
      value: profile as ProfileType,
      label: toTitleCase(profile),
      description: "Clean & simple",
      allowed_languages: allowedLanguages,
    });
  }

  const output = `export const allowed_profiles = ${serializeTS(
    allowedProfiles,
  )};\n`;

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, output, "utf-8");

  console.log("allowed_profiles generated successfully.");
}

/* ============================
 * Execute
 * ============================ */
export function generateAllowedProfiles() {
  main();
}
