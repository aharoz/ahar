"use client";

import { useState } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function SentryTestPage() {
    const [error, setError] = useState<Error | null>(null);

    const handleTestError = () => {
        try {
            throw new Error('Bu bir test hatasıdır!');
        } catch (err) {
            if (err instanceof Error) {
                Sentry.captureException(err);
                setError(err);
            }
        }
    };

    const handleTestMessage = () => {
        Sentry.captureMessage('Bu bir test mesajıdır!', 'info');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Sentry Test Sayfası</h1>
            
            <div className="space-y-4">
                <button
                    onClick={handleTestError}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Test Hatası Oluştur
                </button>

                <button
                    onClick={handleTestMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4"
                >
                    Test Mesajı Gönder
                </button>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p className="font-bold">Hata:</p>
                        <p>{error.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
