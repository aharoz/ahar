export const locales = ['tr', 'en'] as const
export const defaultLocale = 'tr' as const

export type Locale = (typeof locales)[number]

// Dil seçenekleri için etiketler
export const localeLabels: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English'
}

// Metadata için başlıklar
export const siteConfig = {
  tr: {
    title: 'Diplomat Portfolyosu',
    description: 'Profesyonel diplomat portfolyo sitesi'
  },
  en: {
    title: 'Diplomat Portfolio',
    description: 'Professional diplomat portfolio website'
  }
}

export const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
export const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export const getStrapiURL = (path = '') => {
    return `${STRAPI_URL}${path}`;
};

export const fetchAPI = async (path: string) => {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl, {
        headers: {
            'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
    });
    
    if (!response.ok) {
        throw new Error(`Strapi API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
}; 