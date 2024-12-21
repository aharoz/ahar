'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations()

  const expertiseAreas = [
    {
      key: 'international',
      title: t('expertise.areas.international.title'),
      description: t('expertise.areas.international.description')
    },
    {
      key: 'cultural',
      title: t('expertise.areas.cultural.title'),
      description: t('expertise.areas.cultural.description')
    },
    {
      key: 'strategic',
      title: t('expertise.areas.strategic.title'),
      description: t('expertise.areas.strategic.description')
    }
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/hakkimda" className="bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('hero.cta')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('about.title')}</h2>
              <p className="text-gray-600 mb-6">
                {t('about.description')}
              </p>
              <Link href="/calismalarim" className="text-primary-600 font-semibold hover:text-primary-700">
                {t('about.cta')} →
              </Link>
            </div>
            <div className="relative h-[400px]">
              <div className="absolute inset-0 bg-gray-200 rounded-lg"></div>
              {/* Buraya diplomat fotoğrafı eklenecek */}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('expertise.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertiseAreas.map((service) => (
              <div key={service.key} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 