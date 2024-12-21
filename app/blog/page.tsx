'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import BlogCard from '../components/BlogCard'
import BlogSearch from '../components/BlogSearch'

// Örnek blog yazıları
const samplePosts = [
  {
    id: '1',
    slug: 'uluslararasi-iliskiler-gelecegi',
    title: 'Uluslararası İlişkilerin Geleceği: Dijital Diplomasi',
    excerpt: 'Dijital çağda diplomasi nasıl şekilleniyor? Teknolojinin diplomatik ilişkilere etkisini ve geleceğin diplomatik yaklaşımlarını inceliyoruz.',
    coverImage: '/images/blog/digital-diplomacy.jpg',
    date: '2023-12-20',
    category: 'diplomatic',
    tags: ['diplomasi', 'teknoloji', 'dijital-dönüşüm'],
    readTime: 5
  },
  {
    id: '2',
    slug: 'kulturel-diplomasi-sanatin-gucu',
    title: 'Kültürel Diplomaside Sanatın Gücü',
    excerpt: 'Sanat ve kültürün uluslararası ilişkilerdeki rolü ve kültürel diplomasinin modern dünyada artan önemi üzerine bir inceleme.',
    coverImage: '/images/blog/cultural-art.jpg',
    date: '2023-12-15',
    category: 'cultural',
    tags: ['kültür', 'sanat', 'diplomasi'],
    readTime: 4
  }
]

export default function BlogPage() {
  const t = useTranslations('blog')
  const [filteredPosts, setFilteredPosts] = useState(samplePosts)

  const categories = ['diplomatic', 'cultural', 'education', 'strategy']

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredPosts(samplePosts)
      return
    }

    const searchResults = samplePosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
    setFilteredPosts(searchResults)
  }

  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      setFilteredPosts(samplePosts)
      return
    }

    const categoryResults = samplePosts.filter(post => post.category === category)
    setFilteredPosts(categoryResults)
  }

  const handleSortChange = (sort: string) => {
    const sortedPosts = [...filteredPosts]
    switch (sort) {
      case 'latest':
        sortedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'oldest':
        sortedPosts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'popular':
        // Burada popülerlik metriğine göre sıralama yapılabilir
        break
    }
    setFilteredPosts(sortedPosts)
  }

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

      {/* Blog Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <BlogSearch
            categories={categories}
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">{t('noResults')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 