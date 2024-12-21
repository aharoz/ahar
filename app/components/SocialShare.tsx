'use client'

import { useTranslations } from 'next-intl'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp
} from 'react-icons/fa'

interface SocialShareProps {
  url: string
  title: string
  description?: string
  imageUrl?: string
}

export default function SocialShare({
  url,
  title,
  description = '',
  imageUrl = ''
}: SocialShareProps) {
  const t = useTranslations('social')

  const shareLinks = [
    {
      name: 'Facebook',
      icon: FaFacebookF,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&quote=${encodeURIComponent(title)}`,
      color: 'bg-[#1877f2] hover:bg-[#0d65d9]'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      color: 'bg-[#1da1f2] hover:bg-[#0c85d0]'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
        description
      )}`,
      color: 'bg-[#0a66c2] hover:bg-[#084e96]'
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        title + ' ' + url
      )}`,
      color: 'bg-[#25d366] hover:bg-[#1da851]'
    }
  ]

  const handleShare = (shareUrl: string, name: string) => {
    window.open(shareUrl, `share-${name}`, 'width=600,height=400')
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-600">{t('share')}:</span>
      <div className="flex space-x-2">
        {shareLinks.map(({ name, icon: Icon, url: shareUrl, color }) => (
          <button
            key={name}
            onClick={() => handleShare(shareUrl, name)}
            className={`p-2 rounded-full text-white transition-colors ${color}`}
            title={`${t('shareOn')} ${name}`}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  )
} 