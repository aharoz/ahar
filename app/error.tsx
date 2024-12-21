'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Bir şeyler yanlış gitti!
            </h1>
            <p className="text-gray-600 mb-6">
              Üzgünüz, bir hata oluştu. Teknik ekibimiz bu konuyla ilgileniyor.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => reset()}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Tekrar Dene
              </button>
              <a
                href="/"
                className="block text-center w-full border border-gray-300 text-gray-600 py-2 px-4 rounded hover:bg-gray-50 transition-colors"
              >
                Ana Sayfaya Dön
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
} 