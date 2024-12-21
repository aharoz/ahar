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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: 'Ahmet Arif',
  description: 'Portfolio Website',
}; 