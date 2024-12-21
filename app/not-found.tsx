import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-6">
          Sayfa Bulunamadı
        </h2>
        <p className="text-gray-500 mb-8">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
          <button
            onClick={() => window.history.back()}
            className="block w-full border border-gray-300 text-gray-600 py-2 px-4 rounded hover:bg-gray-50 transition-colors"
          >
            Geri Git
          </button>
        </div>
      </div>
    </div>
  );
} 