// ============================================
// FILE: app/routes/cara-beli.tsx - CARA BELI
// ============================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CheckCircle2, CreditCard, FileText, MailCheck, ShoppingCart, MessageCircle, ShieldCheck, Clock } from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";

export const Route = createFileRoute("/cara-beli")({
  component: CaraBeliPage,
});

const steps = [
  { icon: ShoppingCart, title: "Pilih Akun", desc: "Browse koleksi akun premium kami dan pilih sesuai selera." },
  { icon: FileText, title: "Isi Data Pembelian", desc: "Lengkapi data pesanan via WhatsApp untuk diproses admin." },
  { icon: CreditCard, title: "Lakukan Pembayaran", desc: "Pilih metode pembayaran yang paling nyaman buat kamu." },
  { icon: CheckCircle2, title: "Verifikasi Admin", desc: "Admin Kivora memverifikasi pembayaran dengan cepat & aman." },
  { icon: MailCheck, title: "Akun Dikirim", desc: "Detail login akun langsung dikirim ke email kamu." },
];

function CaraBeliPage() {
  const { settings } = useSettings();
  const whatsappNumber = settings?.whatsapp?.replace(/[^0-9]/g, '') || '6285717677980';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl font-bold">Cara <span className="text-gradient-brand">Beli</span></h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">Mudah dan cepat, ikuti langkah-langkah di bawah ini</p>
        </div>

        <div className="relative space-y-4 max-w-2xl mx-auto">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white font-bold shadow-neon">{i + 1}</span>
                  {i < steps.length - 1 && <div className="h-full w-px bg-gradient-to-b from-border to-transparent my-1" />}
                </div>
                <div className="glass-card rounded-2xl p-5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
                    <div>
                      <h3 className="font-display font-semibold">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="font-display text-xl font-bold mb-2">Siap Membeli?</h2>
            <p className="text-sm text-muted-foreground mb-6">Hubungi admin kami sekarang untuk konsultasi dan pembelian</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition">
                <MessageCircle className="h-5 w-5" /> Hubungi WhatsApp
              </a>
              <Link to="/stock" className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 font-semibold text-foreground hover:bg-accent/10 transition">
                Lihat Stock Akun
              </Link>
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-primary" /> Garansi Aman</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-primary" /> Proses Cepat</span>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}