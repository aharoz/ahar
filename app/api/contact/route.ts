import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit } from './rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 saniye
  uniqueTokenPerInterval: 500
});

export async function POST(request: Request) {
  try {
    // Rate limiting kontrolü
    await limiter.check(5, 'CONTACT_FORM'); // 60 saniyede maksimum 5 istek

    const { name, email, subject, message } = await request.json();

    // E-posta gönderimi için transporter oluştur
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Admin'e gönderilecek e-posta
    const adminMailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      subject: `İletişim Formu: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Yeni İletişim Formu Mesajı</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
            <p><strong>İsim:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Konu:</strong> ${subject}</p>
            <p><strong>Mesaj:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
          <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
            Bu e-posta ahmetarif.com.tr iletişim formundan gönderilmiştir.
          </p>
        </div>
      `,
    };

    // Kullanıcıya gönderilecek otomatik yanıt
    const userMailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: 'Mesajınız Alındı - Ahmet Arif',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Mesajınız Alındı</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
            <p>Sayın ${name},</p>
            <p>İletişim formundan gönderdiğiniz mesaj başarıyla alınmıştır. En kısa sürede size geri dönüş yapılacaktır.</p>
            <p>Mesaj detaylarınız:</p>
            <ul style="background-color: white; padding: 15px; border-radius: 4px;">
              <li><strong>Konu:</strong> ${subject}</li>
              <li><strong>Mesaj:</strong> ${message}</li>
            </ul>
            <p style="margin-top: 20px;">Saygılarımla,<br>Ahmet Arif</p>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px;">
              Bu bir otomatik yanıt e-postasıdır. Lütfen bu e-postayı yanıtlamayınız.
            </p>
          </div>
        </div>
      `,
    };

    // E-postaları gönder
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    // Strapi'ye veriyi gönder
    const strapiResponse = await fetch(`${process.env.STRAPI_API_URL}/api/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          name,
          email,
          subject,
          message,
          status: 'new'
        }
      })
    });

    if (!strapiResponse.ok) {
      throw new Error('Strapi API hatası');
    }

    return NextResponse.json(
      { message: 'Mesajınız başarıyla gönderildi.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('İletişim formu hatası:', error);
    return NextResponse.json(
      { error: 'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
} 