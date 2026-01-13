"use client";

import {useEffect} from "react";
import {useSearchParams} from "next/navigation";
import {LocalStorageService} from "@/lib/services/local.s.service";

export function ProfileSync() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const profile = searchParams.get("profile");
        console.log('ProfileSync > profile', profile)

        if (!profile) return;
        console.log('LocalStorageService > profile', profile)
        try {
            LocalStorageService.set("activeProfile", profile);
        } catch {
            // fail silently (private mode, etc.)
        }
    }, [searchParams]);

    return null;
}
