'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import ContactForm from '../components/ContactForm'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function ContactPage() {
  const t = useTranslations('contact')

  const contactInfo = [
    {
      icon: FiMail,
      title: t('info.email'),
      content: 'contact@diplomat.com'
    },
    {
      icon: FiPhone,
      title: t('info.phone'),
      content: '+90 (555) 123 45 67'
    },
    {
      icon: FiMapPin,
      title: t('info.address'),
      content: 'Ankara, Türkiye'
    }
  ]

  const workingHours = [
    {
      days: t('hours.weekdays'),
      hours: '09:00 - 18:00'
    },
    {
      days: t('hours.weekends'),
      hours: t('hours.closed')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
              Uluslararası ilişkiler ve diplomasi alanındaki sorularınız için benimle iletişime geçin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="md:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('info.title')}
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {info.title}
                        </h3>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          {info.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {t('hours.title')}
                </h2>
                <div className="space-y-4">
                  {workingHours.map((schedule, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-600 dark:text-gray-300">{schedule.days}</span>
                      <span className="text-gray-900 dark:text-white font-medium">{schedule.hours}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 