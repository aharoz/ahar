'use client'

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { localeLabels, Locale } from '../config';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (newLocale: string) => {
    // Remove the current locale from the pathname
    const newPathname = pathname.replace(`/${locale}`, '');
    
    // Redirect to the new locale
    router.push(`/${newLocale}${newPathname}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
      >
        <span>{localeLabels[locale as Locale]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
          {Object.entries(localeLabels).map(([code, name]) => (
            <button
              key={code}
              onClick={() => switchLanguage(code)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                locale === code
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 