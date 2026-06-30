// ============================================
// FILE: app/routes/account.$id.tsx - DETAIL AKUN
// DENGAN ORDER MODAL
// ============================================

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OrderModal } from "@/components/OrderModal";
import {
  buildWhatsAppUrl,
  formatIDR,
  getAccount,
  getAccounts,
  type Account,
} from "@/lib/accounts";
import { AccountCard } from "@/components/account-card";
import { useSettings } from "@/components/SettingsProvider";
import {
  ArrowLeft,
  CheckCircle2,
  Crown,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Swords,
  Tag,
  Loader2,
  ImageIcon,
} from "lucide-react";

export const Route = createFileRoute("/account/$id")({
  loader: async ({ params }) => {
    const account = await getAccount(params.id);
    if (!account) throw notFound();
    return { account };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.account.name} — Kivora Point` },
          {
            name: "description",
            content: `${loaderData.account.name} · ${loaderData.account.rank} · ${loaderData.account.heroes} Hero · ${loaderData.account.skins} Skin · ${formatIDR(loaderData.account.price)}`,
          },
        ]
      : [{ title: "Akun — Kivora Point" }],
  }),
  notFoundComponent: NotFound,
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background text-foreground p-6">
      <p>{error.message}</p>
    </div>
  ),
  component: AccountDetail,
});

function NotFound() {
  const { settings } = useSettings();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Akun tidak ditemukan</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Akun yang kamu cari sudah terjual atau tidak tersedia.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-neon"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke stock
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}

function AccountDetail() {
  const { account } = Route.useLoaderData();
  const [related, setRelated] = useState<Account[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { settings, loading: settingsLoading } = useSettings();

  // ================= ORDER MODAL STATE =================
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const discount = account.originalPrice
    ? Math.round((1 - account.price / account.originalPrice) * 100)
    : 0;

  useEffect(() => {
    getAccounts()
      .then((data) => {
        setRelated(data.filter((a) => a.id !== account.id).slice(0, 3));
        setLoadingRelated(false);
      })
      .catch(() => setLoadingRelated(false));
  }, [account.id]);

  const whatsappUrl = buildWhatsAppUrl(account, settings?.whatsapp || "");

  useEffect(() => {
    if (settings?.store_name) {
      document.title = `${account.name} — ${settings.store_name}`;
    }
  }, [settings, account.name]);

  if (settingsLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />

        <main className="mx-auto max-w-6xl px-4 pb-32 pt-4 sm:pb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke stock
          </Link>

          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {/* Cover Image */}
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${account.cover} shadow-neon`}
            >
              {account.image && !imageError ? (
                <img
                  src={account.image}
                  alt={account.name}
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted/20">
                  <ImageIcon className="h-16 w-16 text-muted-foreground/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                {discount > 0 && (
                  <span className="rounded-md bg-destructive px-2 py-1 text-[11px] font-bold text-white">
                    Flash Sale -{discount}%
                  </span>
                )}
                <span className="rounded-md bg-black/40 px-2 py-1 text-[11px] text-white">
                  {account.code}
                </span>
              </div>
              <span
                className={`absolute right-4 top-4 rounded-md px-2 py-1 text-[11px] font-semibold ${
                  account.available
                    ? "bg-success/20 text-emerald-300"
                    : "bg-destructive/20 text-rose-200"
                }`}
              >
                {account.available ? "Tersedia" : "Sold Out"}
              </span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                <div className="text-5xl">{account.emoji}</div>
                <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-white">
                  {account.rank}
                </span>
              </div>
            </div>

            {/* Detail Info */}
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                  {account.title}
                </span>
                <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {account.name}
                </h1>
              </div>

              {account.description && (
                <div className="rounded-2xl border border-border bg-surface/60 p-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    {account.description}
                  </p>
                </div>
              )}

              <div className="rounded-2xl border border-border bg-surface p-5 shadow-card-glow">
                <div className="font-display text-3xl font-bold text-gradient-brand">
                  {formatIDR(account.price)}
                </div>

                <dl className="mt-4 grid grid-cols-3 gap-2">
                  <Info
                    icon={<Crown className="h-3.5 w-3.5" />}
                    label="Title"
                    value={account.title}
                  />
                  <Info
                    icon={<Sparkles className="h-3.5 w-3.5" />}
                    label="Skin"
                    value={account.skins}
                  />
                  <Info
                    icon={<Swords className="h-3.5 w-3.5" />}
                    label="Hero"
                    value={account.heroes}
                  />
                </dl>

                <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-border bg-background/40 px-3 py-2 text-xs">
                  <Tag className="h-3.5 w-3.5" />
                  <span>Kode Akun</span>
                  <span className="ml-auto font-mono font-semibold">{account.code}</span>
                </div>

                {/* 🔥 TOMBEL BELI DENGAN MODAL */}
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  disabled={!account.available}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3.5 text-sm font-semibold text-white shadow-neon transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <MessageCircle className="h-4 w-4" />
                  {account.available ? "Beli Sekarang via WhatsApp" : "Akun Tidak Tersedia"}
                </button>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Garansi aman · Pengiriman instan
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface/60 p-5">
                <h3 className="font-display text-sm font-semibold">Highlight Akun</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {account.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Accounts */}
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold">
              Akun <span className="text-gradient-brand">serupa</span>
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {loadingRelated ? (
                <div className="col-span-full flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : related.length > 0 ? (
                related.map((a) => <AccountCard key={a.id} account={a} />)
              ) : (
                <p className="col-span-full text-center text-sm text-muted-foreground">
                  Tidak ada akun serupa
                </p>
              )}
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>

      {/* ================= ORDER MODAL ================= */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        account={account}
        whatsappNumber={settings?.whatsapp || "6281234567890"}
      />
    </>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/40 px-3 py-2">
      <dt className="flex items-center gap-1 text-[10px] uppercase">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  );
}