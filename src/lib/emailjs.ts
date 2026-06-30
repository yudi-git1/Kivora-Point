// ============================================
// FILE: lib/emailjs.ts
// ============================================

import emailjs from '@emailjs/browser';

// 🔥 GANTI DENGAN PUNYA KAMU DARI EMAILJS DASHBOARD
const SERVICE_ID = 'service_2yv1w9v';  // Dapat dari dashboard
const TEMPLATE_ID = 'template_ygx796o'; // Dapat dari dashboard
const PUBLIC_KEY = 'jFYWBQ1ZhaFPmAovM'; // Dapat dari dashboard

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
  to_email: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        name: data.name,
        email: data.email,
        message: data.message,
        to_email: data.to_email,
      },
      PUBLIC_KEY
    );

    console.log('✅ Email sent:', response);
    return { success: true, message: 'Pesan berhasil dikirim!' };
  } catch (error) {
    console.error('❌ Email failed:', error);
    return { success: false, message: 'Gagal mengirim pesan. Coba lagi nanti.' };
  }
}