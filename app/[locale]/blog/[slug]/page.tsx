'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { format } from 'date-fns'
import { tr, enUS } from 'date-fns/locale'
import ShareButtons from '../../../components/ShareButtons'
import CommentSection from '../../../components/CommentSection'

interface BlogPost {
  title: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
}

const blogPosts: Record<string, Record<string, BlogPost>> = {
  'digital-diplomacy': {
    tr: {
      title: 'Modern Diplomaside Dijital Dönüşüm',
      content: `
        <h2>Dijital Diplomasinin Önemi</h2>
        <p>
          Günümüzde diplomatik iletişimin büyük bir kısmı dijital platformlar üzerinden gerçekleşiyor.
          Bu durum, geleneksel diplomasi anlayışını değiştirirken, yeni zorlukları ve fırsatları da
          beraberinde getiriyor.
        </p>
        <h2>Teknolojinin Etkisi</h2>
        <p>
          Yapay zeka, büyük veri analizi ve blockchain gibi teknolojiler, diplomatik süreçleri
          daha şeffaf ve verimli hale getiriyor. Bu teknolojiler sayesinde uluslararası
          ilişkilerde yeni kapılar açılıyor.
        </p>
      `,
      date: '2024-01-15',
      category: 'Dijital Diplomasi',
      tags: ['diplomasi', 'dijital', 'teknoloji']
    },
    en: {
      title: 'Digital Transformation in Modern Diplomacy',
      content: `
        <h2>The Importance of Digital Diplomacy</h2>
        <p>
          Today, a significant portion of diplomatic communication takes place through digital platforms.
          While this transforms traditional diplomacy, it also brings new challenges and opportunities.
        </p>
        <h2>Impact of Technology</h2>
        <p>
          Technologies such as artificial intelligence, big data analytics, and blockchain are making
          diplomatic processes more transparent and efficient. These technologies are opening new
          doors in international relations.
        </p>
      `,
      date: '2024-01-15',
      category: 'Digital Diplomacy',
      tags: ['diplomacy', 'digital', 'technology']
    }
  }
}

export default function BlogPost({
  params: { slug, locale }
}: {
  params: { slug: string; locale: string }
}) {
  const t = useTranslations('blog')
  const post = blogPosts[slug]?.[locale as 'tr' | 'en']

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Image
          src="/images/blog/digital-diplomacy.jpg"
          alt={post.title}
          width={1200}
          height={600}
          className="rounded-xl shadow-lg w-full h-[400px] object-cover"
        />
      </div>

      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-4">
          {post.title}
        </h1>
        <div className="flex items-center justify-between text-gray-600 mb-6">
          <div className="flex items-center space-x-4">
            <span>John Doe</span>
            <span>•</span>
            <span>
              {format(new Date(post.date), 'dd MMMM yyyy', {
                locale: locale === 'tr' ? tr : enUS
              })}
            </span>
          </div>
          <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
            {post.category}
          </span>
        </div>
      </div>

      <div 
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="border-t border-b border-gray-200 py-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          <ShareButtons title={post.title} />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-8">{t('comments')}</h2>
        <CommentSection
          postId={slug}
          comments={[
            {
              id: '1',
              name: 'Alice Johnson',
              email: 'alice@example.com',
              comment: 'Great insights on digital diplomacy!',
              date: '2024-01-16T10:30:00Z',
              avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=random'
            },
            {
              id: '2',
              name: 'Bob Smith',
              email: 'bob@example.com',
              comment: 'Very informative article. Looking forward to more content like this.',
              date: '2024-01-16T11:15:00Z',
              avatar: 'https://ui-avatars.com/api/?name=Bob+Smith&background=random'
            }
          ]}
        />
      </div>
    </article>
  )
} 