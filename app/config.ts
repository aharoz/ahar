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