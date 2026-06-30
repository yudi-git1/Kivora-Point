// ============================================
// FILE: app/routes/index.tsx - HOMEPAGE
// FULL SCRIPT - LENGKAP
// ============================================

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AccountCard } from "@/components/account-card";
import { useSettings } from "@/components/SettingsProvider";
import { getAccounts, type Account } from "@/lib/accounts";
import { BackToTop } from "@/components/BackToTop";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Loader2,
  TrendingUp,
  Star,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

// ================= 4 KATEGORI (PAKAI GRADIENT) =================
const categoryItems = [
  {
    label: "Mythic",
    id: "mythic",
    gradient: "from-indigo-700/90 via-indigo-800/80 to-indigo-950/90",
    border: "hover:border-indigo-500/50",
  },
  {
    label: "Legend",
    id: "legend",
    gradient: "from-orange-700/90 via-orange-800/80 to-orange-950/90",
    border: "hover:border-orange-500/50",
  },
  {
    label: "Epic",
    id: "epic",
    gradient: "from-red-700/90 via-red-800/80 to-red-950/90",
    border: "hover:border-red-500/50",
  },
  {
    label: "Grandmaster",
    id: "grandmaster",
    gradient: "from-green-700/90 via-green-800/80 to-green-950/90",
    border: "hover:border-green-500/50",
  },
];

function HomePage() {
  const [featuredAccounts, setFeaturedAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettings();

  useEffect(() => {
    async function loadAccounts() {
      setLoading(true);
      const data = await getAccounts();
      setFeaturedAccounts(data.slice(0, 3));
      setLoading(false);
    }
    loadAccounts();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* ================= HERO / BANNER ================= */}
        <section className="relative overflow-hidden animate-in fade-in duration-1000">
          <div className="absolute inset-0 bg-hero" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl animate-pulse" />

          <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:pt-20">
            {/* Badge */}
            <div className="animate-in slide-in-from-bottom-5 duration-700">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary-foreground/90 backdrop-blur">
                <Zap className="h-3 w-3 text-secondary animate-pulse" /> Premium &amp; Verified
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl animate-in slide-in-from-bottom-10 duration-700 delay-100">
              Gaming Account
              <br />
              <span className="text-gradient-brand bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">
                Marketplace
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base animate-in slide-in-from-bottom-10 duration-700 delay-200">
              Akun Mobile Legends premium, aman &amp; terpercaya. Dikurasi langsung
              oleh tim {settings?.store_name || "Kivora Point"}.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3 animate-in slide-in-from-bottom-10 duration-700 delay-300">
              <Link
                to="/stock"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-neon transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                Lihat Stock
                <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/cara-beli"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all duration-300 hover:border-secondary/60 hover:text-secondary hover:scale-105"
              >
                Cara Beli
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-md animate-in slide-in-from-bottom-10 duration-700 delay-400">
              {[
                { k: "500+", v: "Akun Terjual", icon: TrendingUp },
                { k: "100%", v: "Garansi Aman", icon: ShieldCheck },
                { k: "24/7", v: "Admin Online", icon: Users },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.v}
                    className="group rounded-xl border border-border bg-surface/60 px-3 py-2.5 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-neon"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <Icon className="mx-auto h-4 w-4 text-primary opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="font-display text-lg font-bold text-foreground">{s.k}</div>
                    <div className="text-[11px] text-muted-foreground">{s.v}</div>
                  </div>
                );
              })}
            </div>

            {/* Trust Badge */}
            <div className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground animate-in slide-in-from-bottom-10 duration-700 delay-500">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              Pembayaran aman &middot; Pengiriman otomatis ke email kamu
            </div>
          </div>
        </section>

        {/* ================= TELUSURI KATEGORI - PAKAI GRADIENT ================= */}
        <section className="mx-auto max-w-6xl px-4 py-8 animate-in slide-in-from-bottom-10 duration-700 delay-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold">
                Telusuri <span className="text-gradient-brand">Kategori</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Pilih rank yang ingin kamu cari
              </p>
            </div>
            <Link
              to="/stock"
              className="group text-sm text-muted-foreground hover:text-foreground transition flex items-center gap-1"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categoryItems.map((cat, i) => (
              <Link
                key={cat.label}
                to="/stock"
                search={{ category: cat.id }}
                className={`group relative h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl ${cat.border}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Grid Pattern biar gak polos */}
                <div className="absolute inset-0 bg-grid opacity-20" />

                {/* Bottom Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent" />

                {/* Border */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 transition-colors duration-300 group-hover:border-primary/50" />

                {/* Content - Nama Rank aja */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-bold text-white drop-shadow-lg">
                    {cat.label}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= FEATURED ACCOUNTS ================= */}
        <section className="mx-auto max-w-6xl px-4 py-8 animate-in slide-in-from-bottom-10 duration-700 delay-400">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                Pilihan Kami
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold">
                Akun <span className="text-gradient-brand">Terbaik</span>
              </h2>
            </div>
            <Link
              to="/stock"
              className="group text-sm text-muted-foreground transition-all duration-300 hover:text-foreground flex items-center gap-1"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-primary/20" />
              </div>
            </div>
          ) : featuredAccounts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredAccounts.map((a, i) => (
                <div
                  key={a.id}
                  className="animate-in slide-in-from-bottom-10 duration-700"
                  style={{ animationDelay: `${i * 150 + 200}ms` }}
                >
                  <AccountCard account={a} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-12 text-center">
              <p className="text-muted-foreground">Belum ada akun tersedia</p>
            </div>
          )}
        </section>

        {/* ================= TRUST SECTION ================= */}
        <section className="mx-auto max-w-6xl px-4 py-8 animate-in slide-in-from-bottom-10 duration-700 delay-600">
          <div className="rounded-2xl border border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 p-8 text-center">
            <h3 className="font-display text-xl font-bold mb-2">
              Kenapa <span className="text-gradient-brand">Kivora Point</span>?
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-6">
              {[
                { icon: ShieldCheck, label: "100% Aman", desc: "Semua akun terverifikasi" },
                { icon: Zap, label: "Proses Cepat", desc: "Pengiriman instan" },
                { icon: Star, label: "Terpercaya", desc: "500+ customer puas" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="rounded-xl bg-background/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-neon"
                    style={{ animationDelay: `${i * 150 + 300}ms` }}
                  >
                    <Icon className="mx-auto h-8 w-8 text-primary" />
                    <h4 className="mt-2 font-semibold">{item.label}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <BackToTop />
    </div>
  );
}