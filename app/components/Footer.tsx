'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  const t = useTranslations()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          <div className="pb-6">
            <Link href="/" className="text-sm leading-6 text-gray-300 hover:text-white">
              {t('navigation.home')}
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/hakkimda" className="text-sm leading-6 text-gray-300 hover:text-white">
              {t('navigation.about')}
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/calismalarim" className="text-sm leading-6 text-gray-300 hover:text-white">
              {t('navigation.works')}
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/blog" className="text-sm leading-6 text-gray-300 hover:text-white">
              {t('navigation.blog')}
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/iletisim" className="text-sm leading-6 text-gray-300 hover:text-white">
              {t('navigation.contact')}
            </Link>
          </div>
        </nav>

        <div className="mt-10 flex justify-center space-x-10">
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">Twitter</span>
            <FaTwitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">LinkedIn</span>
            <FaLinkedinIn className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">Instagram</span>
            <FaInstagram className="h-6 w-6" />
          </a>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-8">
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; {currentYear} Diplomat. {t('footer.rights')}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-center text-sm leading-5 text-gray-400 max-w-2xl mx-auto">
            {t('footer.description')}
          </p>
        </div>
      </div>
    </footer>
  )
} 