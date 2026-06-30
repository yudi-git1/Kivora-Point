import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:pt-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary-foreground/90 backdrop-blur">
          <Zap className="h-3 w-3 text-secondary" /> Premium &amp; Verified
        </span>

        <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Gaming Account
          <br />
          <span className="text-gradient-brand">Marketplace</span>
        </h1>

        <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
          Akun Mobile Legends premium, aman &amp; terpercaya. Dikurasi langsung
          oleh tim Kivora Point.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="#stock"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-neon transition-transform hover:scale-[1.02]"
          >
            Lihat Stock
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#cara-beli"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/70 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-secondary/60 hover:text-secondary"
          >
            Cara Beli
          </a>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-md">
          {[
            { k: "500+", v: "Akun Terjual" },
            { k: "100%", v: "Garansi Aman" },
            { k: "24/7", v: "Admin Online" },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-xl border border-border bg-surface/60 px-3 py-2.5 text-center backdrop-blur"
            >
              <div className="font-display text-lg font-bold text-foreground">
                {s.k}
              </div>
              <div className="text-[11px] text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-secondary" />
          Pembayaran aman &middot; Pengiriman otomatis ke email kamu
        </div>
      </div>
    </section>
  );
}
