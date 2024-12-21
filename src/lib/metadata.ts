import type { Metadata } from 'next';

const defaultMetadata: Metadata = {
  title: {
    default: 'Ahmet Arif - Kişisel Portföy',
    template: '%s | Ahmet Arif',
  },
  description: 'Yazılım geliştirici Ahmet Arif\'in kişisel portföy sitesi. Projeler, blog yazıları ve daha fazlası.',
  keywords: ['yazılım geliştirici', 'web geliştirme', 'frontend', 'backend', 'full stack', 'blog'],
  authors: [{ name: 'Ahmet Arif' }],
  creator: 'Ahmet Arif',
  publisher: 'Ahmet Arif',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://ahmetarif.com.tr',
    siteName: 'Ahmet Arif - Kişisel Portföy',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ahmet Arif - Kişisel Portföy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ahmetarif',
    creator: '@ahmetarif',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://ahmetarif.com.tr',
    languages: {
      'tr-TR': 'https://ahmetarif.com.tr',
      'en-US': 'https://ahmetarif.com.tr/en',
    },
  },
};

export function generateMetadata(
  title?: string,
  description?: string,
  image?: string,
  type: 'website' | 'article' = 'website',
  path?: string
): Metadata {
  const url = path ? `https://ahmetarif.com.tr${path}` : 'https://ahmetarif.com.tr';
  
  return {
    ...defaultMetadata,
    title: title || defaultMetadata.title,
    description: description || defaultMetadata.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title || defaultMetadata.title?.default,
      description: description || defaultMetadata.description,
      type,
      url,
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || defaultMetadata.title?.default,
        },
      ] : defaultMetadata.openGraph?.images,
    },
    alternates: {
      ...defaultMetadata.alternates,
      canonical: url,
    },
  };
} 