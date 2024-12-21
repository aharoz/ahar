import { NextResponse } from 'next/server';
import api from '@/lib/api';

export async function GET() {
  try {
    // Blog yazılarını al
    const posts = await api.getBlogPosts();

    // Statik sayfalar
    const staticPages = [
      '',
      '/about',
      '/blog',
      '/contact',
      '/gallery',
    ];

    // XML başlığı
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    // Statik sayfaları ekle
    staticPages.forEach((page) => {
      xml += `
        <url>
          <loc>https://ahmetarif.com.tr${page}</loc>
          <changefreq>weekly</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
      `;
    });

    // Blog yazılarını ekle
    posts.forEach((post) => {
      xml += `
        <url>
          <loc>https://ahmetarif.com.tr/blog/${post.attributes.slug}</loc>
          <lastmod>${post.attributes.updatedAt}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.6</priority>
        </url>
      `;
    });

    xml += '</urlset>';

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
} 