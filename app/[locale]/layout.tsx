import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Suspense } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { siteConfig, Locale } from '../config'

const inter = Inter({ subsets: ['latin'] })

export function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Metadata {
  return {
    title: siteConfig[locale].title,
    description: siteConfig[locale].description,
    manifest: '/manifest.json',
    themeColor: '#000000',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: siteConfig[locale].title,
    },
  }
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages(locale)

  return (
    <html 
      lang={locale} 
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body 
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black"
          >
            İçeriğe atla
          </a>
          <Header />
          <main id="main-content" className="min-h-screen pt-16" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <Suspense fallback={null}>
            <Analytics />
            <SpeedInsights />
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 