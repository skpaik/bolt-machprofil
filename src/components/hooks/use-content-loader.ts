// hooks/useContentLoader.ts
import { useState, useEffect } from 'react';
import {ContentsService} from "@/lib/services/contents.service";

export function useContentLoader<T>(
    profileType: string,
    languageType: string,
    contentKey: string,
    initialValue: T
) {
    const [data, setData] = useState<T>(initialValue);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadContent() {
            try {
                setLoading(true);
                setError(null);
                const result = await ContentsService.loadContentOf<T>(
                    profileType,
                    languageType,
                    contentKey
                );

                if (!cancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err : new Error('Unknown error'));
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadContent();

        return () => {
            cancelled = true;
        };
    }, [profileType, languageType, contentKey]);

    return { data, loading, error };
}