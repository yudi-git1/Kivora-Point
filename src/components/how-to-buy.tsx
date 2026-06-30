// ============================================
// FILE: components/how-to-buy.tsx
// ============================================

import {
  CheckCircle2,
  CreditCard,
  FileText,
  MailCheck,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";

const steps = [
  {
    icon: ShoppingCart,
    title: "Pilih Akun",
    desc: "Browse koleksi akun premium kami dan pilih sesuai selera.",
  },
  {
    icon: FileText,
    title: "Isi Data Pembelian",
    desc: "Lengkapi data pesanan via WhatsApp untuk diproses admin.",
  },
  {
    icon: CreditCard,
    title: "Lakukan Pembayaran",
    desc: "Pilih metode pembayaran yang paling nyaman buat kamu.",
  },
  {
    icon: CheckCircle2,
    title: "Verifikasi Admin",
    desc: "Admin Kivora memverifikasi pembayaran dengan cepat & aman.",
  },
  {
    icon: MailCheck,
    title: "Akun Dikirim",
    desc: "Detail login akun langsung dikirim ke email kamu.",
  },
];

interface HowToBuyProps {
  whatsapp?: string;
}

export function HowToBuy({ whatsapp }: HowToBuyProps) {
  const whatsappNumber = whatsapp?.replace(/[^0-9]/g, '') || '6285717677980';

  return (
    <section id="cara-beli" className="mx-auto max-w-6xl px-4 pt-14">
      <div className="mb-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
          Cara Beli
        </span>
        <h2 className="mt-1 font-display text-2xl font-bold">
          5 langkah <span className="text-gradient-brand">simpel & aman</span>
        </h2>
      </div>

      <ol className="relative space-y-3 border-l border-dashed border-border/80 pl-5 sm:pl-6">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <li key={s.title} className="relative">
              <span className="absolute -left-[34px] sm:-left-[38px] grid h-8 w-8 place-items-center rounded-xl bg-gradient-brand text-xs font-bold text-white shadow-neon ring-4 ring-background">
                {i + 1}
              </span>
              <div className="rounded-2xl border border-border bg-surface/70 p-4 shadow-card-glow">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-background/60 text-secondary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-semibold">
                      {s.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* 🔥 TOMBOL WHATSAPP */}
      <div className="mt-8 flex justify-center">
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 transition shadow-lg"
        >
          <MessageCircle className="h-5 w-5" />
          Hubungi Admin via WhatsApp
        </a>
      </div>
    </section>
  );
}