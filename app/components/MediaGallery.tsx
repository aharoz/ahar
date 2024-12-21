'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SocialShare from './SocialShare'

interface MediaItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: 'diplomatic' | 'cultural' | 'conference'
  date: string
}

export default function MediaGallery() {
  const t = useTranslations('gallery')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null)

  // Örnek medya öğeleri
  const mediaItems: MediaItem[] = [
    {
      id: '1',
      title: 'Uluslararası Diplomatik Konferans',
      description: 'Birleşmiş Milletler Genel Merkezi\'nde gerçekleşen diplomatik konferans.',
      imageUrl: '/images/gallery/diplomatic-1.jpg',
      category: 'diplomatic',
      date: '2023-12-15'
    },
    {
      id: '2',
      title: 'Kültürel Değişim Programı',
      description: 'Türkiye-Japonya kültürel değişim programı kapsamında düzenlenen etkinlik.',
      imageUrl: '/images/gallery/cultural-1.jpg',
      category: 'cultural',
      date: '2023-11-20'
    },
    // Daha fazla medya öğesi eklenecek
  ]

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'diplomatic', label: t('categories.diplomatic') },
    { id: 'cultural', label: t('categories.cultural') },
    { id: 'conference', label: t('categories.conference') }
  ]

  const filteredItems = selectedCategory === 'all'
    ? mediaItems
    : mediaItems.filter(item => item.category === selectedCategory)

  return (
    <div className="py-12">
      {/* Kategori Filtreleri */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Galeri Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative group"
            >
              <div 
                className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300" />
                <div className="absolute inset-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-4">
                <SocialShare
                  url={`${window.location.origin}/galeri/${item.id}`}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-w-16 aspect-h-9">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {new Date(selectedImage.date).toLocaleDateString()}
                  </p>
                  <SocialShare
                    url={`${window.location.origin}/galeri/${selectedImage.id}`}
                    title={selectedImage.title}
                    description={selectedImage.description}
                    imageUrl={selectedImage.imageUrl}
                  />
                </div>
              </div>
              <button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 