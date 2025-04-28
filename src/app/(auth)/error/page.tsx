"use client";

import { useSearchParams } from "next/navigation";

const errorMessages: Record<string, string> = {
    missing_params: "Missing login information. Please try again.",
    state_mismatch: "Login verification failed. Please try again.",
    invalid_code: "Invalid login code. Please try again.",
    internal_error: "Something went wrong. Please try again later."
};

export default function AuthErrorPage() {
    const searchParams = useSearchParams();
    const reason = searchParams.get("reason") ?? "internal_error";

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Login Failed</h1>
            <p className="text-lg text-center text-gray-700 max-w-md">
                {errorMessages[reason] ?? errorMessages["internal_error"]}
            </p>
            <a href="/login" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Try Again
            </a>
        </div>
    );
}
