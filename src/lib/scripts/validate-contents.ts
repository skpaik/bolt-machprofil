import { allowed_profiles } from "@/data/configs/generated/allowed_profile_list";
import { settings_const } from "@/data/configs/generated/settings";

function getProfileValues() {
  return allowed_profiles.map((p) => p.value);
}

function getLanguagesForProfile(profile: string): string[] {
  const found = allowed_profiles.find((p) => p.value === profile);
  return found ? found.allowed_languages.map((l) => l.value) : [];
}

export function main() {
  // --- profiles ---
  if (allowed_profiles.length < 1) {
    throw new Error("Must be at least one profile");
  }

  const profileValues = getProfileValues();

  if (!profileValues.includes(settings_const.active.Profile)) {
    settings_const.active.Profile = profileValues[0];
  }

  // --- languages ---
  const allowedLanguagesForProfile = getLanguagesForProfile(
    settings_const.active.Profile,
  );

  if (allowedLanguagesForProfile.length < 1) {
    throw new Error(
      `Profile "${settings_const.active.Profile}" has no allowed languages`,
    );
  }

  if (!allowedLanguagesForProfile.includes(settings_const.active.Language)) {
    settings_const.active.Language = allowedLanguagesForProfile[0];
  }
}

export function validateContents() {
  main();
}
