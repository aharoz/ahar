# Ahmet Arif - Kişisel Portföy Sitesi

Bu proje, kişisel portföy ve blog sitesi olarak geliştirilmiştir. Modern web teknolojileri kullanılarak oluşturulmuş, performans ve kullanıcı deneyimi odaklı bir web uygulamasıdır.

## 🚀 Teknolojiler

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **CMS**: Strapi
- **Deployment**: Vercel
- **DNS & CDN**: Cloudflare
- **Analytics**: Vercel Analytics
- **Hata İzleme**: Sentry
- **Test**: Jest, React Testing Library
- **CI/CD**: Vercel CI/CD
- **Çoklu Dil**: next-intl

## 🛠️ Kurulum

1. Repoyu klonlayın:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda http://localhost:3000 adresini açın

## 🔧 Ortam Değişkenleri

`.env.local` dosyasında aşağıdaki değişkenleri ayarlayın:

```env
NEXT_PUBLIC_STRAPI_API_URL=your_strapi_url
STRAPI_API_TOKEN=your_strapi_token
NEXT_PUBLIC_SITE_URL=your_site_url
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

## 📦 Yapı

```
├── app/                    # Next.js app router
│   ├── [locale]/          # Dil bazlı sayfalar
│   ├── api/               # API rotaları
│   └── components/        # React bileşenleri
├── public/                # Statik dosyalar
├── src/
│   ├── lib/              # Yardımcı fonksiyonlar
│   └── types/            # TypeScript tipleri
├── messages/             # Çoklu dil mesajları
└── tests/               # Test dosyaları
```

## 🧪 Testler

Testleri çalıştırmak için:

```bash
npm test               # Tüm testleri çalıştır
npm run test:watch    # Watch modunda testleri çalıştır
npm run test:coverage # Test coverage raporu oluştur
```

## 📈 Performans

- Lighthouse Score:
  - Performance: 95+
  - Accessibility: 100
  - Best Practices: 100
  - SEO: 100

## 🔒 Güvenlik

- SSL/TLS şifreleme
- Rate limiting
- CORS politikaları
- Güvenlik başlıkları
- XSS koruması

## 🌐 SEO

- Meta etiketleri
- Yapılandırılmış veri
- Sitemap.xml
- robots.txt
- Open Graph etiketleri

## 📱 Responsive Tasarım

- Mobile-first yaklaşım
- Tüm ekran boyutlarına uygun tasarım
- Touch-friendly etkileşimler

## 🚀 Deployment

1. Vercel'de yeni bir proje oluşturun
2. GitHub reposunu bağlayın
3. Ortam değişkenlerini ayarlayın
4. Deploy edin

## 📄 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- Website: [ahmetarif.com.tr](https://ahmetarif.com.tr)
- Email: [contact@ahmetarif.com.tr](mailto:contact@ahmetarif.com.tr) 