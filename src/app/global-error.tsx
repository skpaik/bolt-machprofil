'use client';
// app/global-error.tsx
export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <div className="max-w-md w-full text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                    Critical Error
                </h2>
                <p className="text-gray-400 mb-8">
                    A critical error occurred. Please refresh the page.
                </p>
                <button
                    onClick={reset}
                    className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}