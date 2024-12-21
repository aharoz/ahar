import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import Header from './components/Header'
import Footer from './components/Footer'
import { siteConfig, Locale } from './config'

const inter = Inter({ subsets: ['latin'] })

export function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Metadata {
  return {
    title: siteConfig[locale].title,
    description: siteConfig[locale].description,
  }
}

async function getMessages(locale: string) {
  try {
    return (await import(`../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 