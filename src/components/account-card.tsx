// ============================================
// FILE: components/account-card.tsx
// FULL SCRIPT + EFEK ZOOM, GLOW, ANIMASI
// ============================================

import { Link } from "@tanstack/react-router";
import { type Account, formatIDR } from "@/lib/accounts";
import { Crown, Swords, Sparkles, ImageIcon, Eye } from "lucide-react";

export function AccountCard({ account }: { account: Account }) {
  const discount = account.originalPrice
    ? Math.round((1 - account.price / account.originalPrice) * 100)
    : 0;

  return (
    <Link
      to="/account/$id"
      params={{ id: account.id }}
      className="group relative block overflow-hidden rounded-2xl bg-surface shadow-card-glow transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* ================= IMAGE COVER ================= */}
      <div className={`relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br ${account.cover}`}>
        {account.image ? (
          <img
            src={account.image}
            alt={account.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/20">
            <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}

        {/* Overlay gradasi saat hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-20" />

        {/* ================= BADGES ================= */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="animate-pulse rounded-md bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
              -{discount}%
            </span>
          )}
          <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
            {account.code}
          </span>
        </div>

        <span
          className={`absolute right-3 top-3 rounded-md px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm transition-all duration-300 ${
            account.available
              ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/40"
              : "bg-rose-500/20 text-rose-200 ring-1 ring-rose-400/40"
          }`}
        >
          {account.available ? (
            <span className="flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Tersedia
            </span>
          ) : (
            "Sold Out"
          )}
        </span>

        {/* ================= BOTTOM ================= */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
          <div className="font-display text-3xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
            {account.emoji}
          </div>
          <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            {account.rank}
          </span>
        </div>

        {/* ================= EYE ICON HOVER ================= */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="rounded-full bg-black/60 p-3 backdrop-blur-sm">
            <Eye className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 transition-all duration-300 group-hover:bg-white/5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-bold transition-colors duration-300 group-hover:text-primary">
              {account.name}
            </h3>
            <p className="truncate text-xs text-muted-foreground">{account.title}</p>
          </div>
        </div>

        {/* Description */}
        {account.description && (
          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {account.description}
          </p>
        )}

        {/* Stats */}
        <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
          <Stat icon={<Crown className="h-3 w-3" />} label="Rank" value={account.rank.split(" ")[0]} />
          <Stat icon={<Swords className="h-3 w-3" />} label="Hero" value={account.heroes} />
          <Stat icon={<Sparkles className="h-3 w-3" />} label="Skin" value={account.skins} />
        </div>

        {/* Price & Button */}
        <div className="mt-4 flex items-end justify-between gap-2">
          <div className="min-w-0">
            {account.originalPrice && (
              <div className="text-[11px] text-muted-foreground line-through">
                {formatIDR(account.originalPrice)}
              </div>
            )}
            <div className="font-display text-base font-bold text-gradient-brand">
              {formatIDR(account.price)}
            </div>
          </div>
          <span className="shrink-0 rounded-lg bg-gradient-brand px-3 py-2 text-xs font-semibold text-white shadow-neon transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
            Detail
          </span>
        </div>
      </div>
    </Link>
  );
}

// ================= STAT COMPONENT =================
function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-border bg-background/40 px-2 py-1.5 transition-colors duration-300 hover:bg-primary/5">
      <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-0.5 truncate font-display text-xs font-semibold">{value}</div>
    </div>
  );
}