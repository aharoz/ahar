'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { tr, enUS } from 'date-fns/locale'
import { useTranslations, useLocale } from 'next-intl'
import { FiClock, FiTag, FiCalendar } from 'react-icons/fi'
import SocialShare from '../../components/SocialShare'
import BlogCard from '../../components/BlogCard'

// Örnek blog yazısı verisi
const samplePost = {
  id: '1',
  slug: 'uluslararasi-iliskiler-gelecegi',
  title: 'Uluslararası İlişkilerin Geleceği: Dijital Diplomasi',
  excerpt: 'Dijital çağda diplomasi nasıl şekilleniyor? Teknolojinin diplomatik ilişkilere etkisini ve geleceğin diplomatik yaklaşımlarını inceliyoruz.',
  content: `
    <p>Dijital diplomasi, modern dünyada uluslararası ilişkilerin vazgeçilmez bir parçası haline geldi. Sosyal medya platformları, anlık iletişim araçları ve dijital teknolojiler, diplomatik ilişkileri dönüştürüyor ve yeni fırsatlar sunuyor.</p>

    <h2>Dijital Diplomasinin Önemi</h2>
    <p>Günümüzde diplomatik iletişimin büyük bir kısmı dijital platformlar üzerinden gerçekleşiyor. Bu durum, geleneksel diplomasi anlayışını değiştirirken, yeni zorlukları ve fırsatları da beraberinde getiriyor.</p>

    <h2>Teknolojinin Diplomatik İlişkilere Etkisi</h2>
    <p>Yapay zeka, büyük veri analizi ve blockchain gibi teknolojiler, diplomatik süreçleri daha şeffaf ve verimli hale getiriyor. Bu teknolojiler sayesinde:</p>
    <ul>
      <li>Daha hızlı karar alma süreçleri</li>
      <li>Veri odaklı diplomatik stratejiler</li>
      <li>Gelişmiş güvenlik protokolleri</li>
      <li>Daha etkili kriz yönetimi</li>
    </ul>

    <h2>Geleceğe Bakış</h2>
    <p>Dijital diplomasinin gelecekte daha da önem kazanacağı öngörülüyor. Metaverse gibi sanal gerçeklik platformları, diplomatik görüşmelere yeni bir boyut kazandırabilir.</p>
  `,
  coverImage: '/images/blog/digital-diplomacy.jpg',
  date: '2023-12-20',
  category: 'diplomatic',
  tags: ['diplomasi', 'teknoloji', 'dijital-dönüşüm'],
  readTime: 5,
  author: {
    name: 'Diplomat',
    image: '/images/author.jpg',
    title: 'Kıdemli Diplomat'
  }
}

// Örnek benzer yazılar
const relatedPosts = [
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

export default function BlogPost({ params }: { params: { slug: string } }) {
  const t = useTranslations('blog')
  const locale = useLocale()
  const [post, setPost] = useState(samplePost)

  const dateLocale = locale === 'tr' ? tr : enUS
  const formattedDate = format(new Date(post.date), 'dd MMMM yyyy', { locale: dateLocale })

  useEffect(() => {
    // Burada API'den blog yazısı verisi çekilebilir
    // setPost(fetchedPost)
  }, [params.slug])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-primary-900 to-primary-800">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center text-white"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {t(`categories.${post.category}`)}
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <FiCalendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <FiClock className="w-4 h-4" />
                  {post.readTime} {t('minuteRead')}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-sm text-gray-300">{post.author.title}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Blog Content */}
              <article className="prose prose-lg max-w-none mb-12">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blog/tags/${tag}`}
                    className="text-sm text-gray-600 hover:text-primary-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                  >
                    <span className="flex items-center gap-1">
                      <FiTag className="w-4 h-4" />
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Share */}
              <div className="border-t border-b py-6 mb-12">
                <SocialShare
                  url={`${window.location.origin}/blog/${post.slug}`}
                  title={post.title}
                  description={post.excerpt}
                  imageUrl={post.coverImage}
                />
              </div>

              {/* Related Posts */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{t('relatedPosts')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">{t('comments')}</h2>
                {/* Yorum sistemi buraya eklenecek */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 