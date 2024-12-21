'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import MediaGallery from '../components/MediaGallery'

export default function GalleryPage() {
  const t = useTranslations('gallery')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <MediaGallery />
        </div>
      </section>
    </div>
  )
} 