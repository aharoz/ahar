'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiFilter } from 'react-icons/fi'

interface BlogSearchProps {
  categories: string[]
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
  onSortChange: (sort: string) => void
}

export default function BlogSearch({
  categories,
  onSearch,
  onCategoryChange,
  onSortChange
}: BlogSearchProps) {
  const t = useTranslations('blog')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSort, setSelectedSort] = useState('latest')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    onCategoryChange(category)
  }

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort)
    onSortChange(sort)
  }

  const sortOptions = [
    { value: 'latest', label: t('sort.latest') },
    { value: 'oldest', label: t('sort.oldest') },
    { value: 'popular', label: t('sort.popular') }
  ]

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
          />
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        <button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
        >
          <FiFilter className="w-5 h-5" />
          {t('filters')}
        </button>
      </form>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="mb-4">
                <h3 className="font-medium mb-2">{t('categories.title')}</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {t('categories.all')}
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-full transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {t(`categories.${category}`)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">{t('sort.title')}</h3>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`px-4 py-2 rounded-full transition-colors ${
                        selectedSort === option.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 