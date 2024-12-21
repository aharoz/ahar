'use client'

import { useTranslations } from 'next-intl'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram
} from 'react-icons/fa'

interface SocialFollowProps {
  variant?: 'default' | 'footer'
  className?: string
}

export default function SocialFollow({
  variant = 'default',
  className = ''
}: SocialFollowProps) {
  const t = useTranslations('social')

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      url: 'https://www.linkedin.com/in/your-profile',
      color: variant === 'footer' 
        ? 'text-gray-400 hover:text-white'
        : 'text-[#0a66c2] hover:text-[#084e96]'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com/your-profile',
      color: variant === 'footer'
        ? 'text-gray-400 hover:text-white'
        : 'text-[#1da1f2] hover:text-[#0c85d0]'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com/your-profile',
      color: variant === 'footer'
        ? 'text-gray-400 hover:text-white'
        : 'text-[#e4405f] hover:text-[#d62e4c]'
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      url: 'https://facebook.com/your-profile',
      color: variant === 'footer'
        ? 'text-gray-400 hover:text-white'
        : 'text-[#1877f2] hover:text-[#0d65d9]'
    }
  ]

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {variant === 'default' && (
        <span className="text-sm text-gray-600">{t('followUs')}:</span>
      )}
      <div className="flex space-x-4">
        {socialLinks.map(({ name, icon: Icon, url, color }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${color}`}
            title={`${t('followOn')} ${name}`}
          >
            <Icon className={variant === 'footer' ? 'w-5 h-5' : 'w-6 h-6'} />
          </a>
        ))}
      </div>
    </div>
  )
} 