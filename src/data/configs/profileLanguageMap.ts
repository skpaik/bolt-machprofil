// src/data/configs/profileLanguageMap.ts

import {allowed_profiles} from "@/data/configs/generated/allowed_profile_list";

export const profileLanguageMap = Object.fromEntries(
    allowed_profiles.map(p => [p.value, p.allowed_languages])
) as Record<
    typeof allowed_profiles[number]["value"],
    typeof allowed_profiles[number]["allowed_languages"]
>;
