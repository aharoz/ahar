'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { tr, enUS } from 'date-fns/locale'
import { useTranslations, useLocale } from 'next-intl'
import SocialShare from './SocialShare'

interface BlogCardProps {
  post: {
    id: string
    slug: string
    title: string
    excerpt: string
    coverImage: string
    date: string
    category: string
    tags: string[]
    readTime: number
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations('blog')
  const locale = useLocale()

  const dateLocale = locale === 'tr' ? tr : enUS
  const formattedDate = format(new Date(post.date), 'dd MMMM yyyy', { locale: dateLocale })

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {t(`categories.${post.category}`)}
          </span>
          <span className="text-sm text-gray-500">
            {formattedDate}
          </span>
          <span className="text-sm text-gray-500">
            {post.readTime} {t('minuteRead')}
          </span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-3 hover:text-primary-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <Link
              key={tag}
              href={`/blog/tags/${tag}`}
              className="text-sm text-gray-600 hover:text-primary-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t">
          <Link
            href={`/blog/${post.slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            {t('readMore')} →
          </Link>
          <SocialShare
            url={`${window.location.origin}/blog/${post.slug}`}
            title={post.title}
            description={post.excerpt}
            imageUrl={post.coverImage}
          />
        </div>
      </div>
    </motion.article>
  )
} 