'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { format } from 'date-fns'
import { tr, enUS } from 'date-fns/locale'
import Image from 'next/image'

interface Comment {
  id: string
  name: string
  email: string
  comment: string
  date: string
  avatar?: string
}

interface CommentSectionProps {
  postId: string
  comments: Comment[]
}

export default function CommentSection({ postId, comments: initialComments }: CommentSectionProps) {
  const t = useTranslations('blog.commentForm')
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  })
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = t('required')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('emailInvalid')
    }

    if (!formData.comment.trim()) {
      newErrors.comment = t('required')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setFormState('sending')

    try {
      // Simüle edilmiş başarılı yanıt
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newComment: Comment = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
      }

      setComments(prev => [newComment, ...prev])
      setFormData({ name: '', email: '', comment: '' })
      setFormState('success')

      setTimeout(() => {
        setFormState('idle')
      }, 3000)
    } catch (error) {
      setFormState('error')
      setTimeout(() => {
        setFormState('idle')
      }, 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div>
      {/* Comment Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-6">{t('title')}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              {t('comment')}
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              value={formData.comment}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.comment ? 'border-red-500' : 'border-gray-300'
              } focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors`}
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-500">{errors.comment}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={formState === 'sending'}
              className={`w-full md:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors ${
                formState === 'sending' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {formState === 'sending' ? t('sending') : t('submit')}
            </button>
          </div>
        </form>

        {/* Form Messages */}
        <AnimatePresence>
          {formState === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-green-50 text-green-800 rounded-lg"
            >
              {t('success')}
            </motion.div>
          )}
          {formState === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-red-50 text-red-800 rounded-lg"
            >
              {t('error')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map(comment => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-start gap-4">
              <Image
                src={comment.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.name)}`}
                alt={comment.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{comment.name}</h4>
                  <span className="text-sm text-gray-500">
                    {format(new Date(comment.date), 'dd MMMM yyyy', {
                      locale: typeof window !== 'undefined' && window.navigator.language === 'tr' ? tr : enUS
                    })}
                  </span>
                </div>
                <p className="text-gray-600">{comment.comment}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 