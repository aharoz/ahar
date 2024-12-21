"use client";

import Image from 'next/image';
import Link from 'next/link';
import BlogPosts from './components/BlogPosts';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Ahmet Arif
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            Diplomat & Uluslararası İlişkiler Uzmanı
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/hakkimda" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Hakkımda
            </Link>
            <Link 
              href="/iletisim" 
              className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              İletişim
            </Link>
          </div>
        </div>
      </main>

      {/* Öne Çıkan Bölümler */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Deneyim */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-4">Diplomatik Deneyim</h3>
              <p className="text-gray-600">
                Uluslararası ilişkiler ve diplomasi alanında kapsamlı deneyim
              </p>
            </div>

            {/* Uzmanlık */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-4">Uzmanlık Alanları</h3>
              <p className="text-gray-600">
                Dış politika, uluslararası hukuk ve kültürel diplomasi
              </p>
            </div>

            {/* Projeler */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-4">Projeler</h3>
              <p className="text-gray-600">
                Uluslararası projeler ve diplomatik girişimler
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog ve Haberler */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Son Yazılar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog kartları buraya gelecek */}
            <BlogPosts />
          </div>
        </div>
      </section>

      {/* İletişim CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">İletişime Geçin</h2>
          <p className="text-xl mb-8">
            Sorularınız veya işbirliği önerileriniz için benimle iletişime geçebilirsiniz.
          </p>
          <Link 
            href="/iletisim" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            İletişim Formu
          </Link>
        </div>
      </section>
    </div>
  );
} 