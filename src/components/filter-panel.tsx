// ============================================
// FILE: components/filter-panel.tsx
// ============================================

import { Search, SlidersHorizontal } from "lucide-react";
import { ranks, type AccountRank } from "@/lib/accounts";

export interface FilterState {
  q: string;
  minPrice: string;
  maxPrice: string;
  minHero: string;
  minSkin: string;
  rank: AccountRank | "all";
}

export const initialFilters: FilterState = {
  q: "",
  minPrice: "",
  maxPrice: "",
  minHero: "",
  minSkin: "",
  rank: "all",
};

interface Props {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onSubmit?: () => void;
}

export function FilterPanel({ value, onChange, onSubmit }: Props) {
  const set = <K extends keyof FilterState>(k: K, v: FilterState[K]) =>
    onChange({ ...value, [k]: v });

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/70 p-5 shadow-card-glow backdrop-blur">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-secondary/15 blur-3xl" />

        <div className="relative flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-neon">
            <SlidersHorizontal className="h-4 w-4 text-white" />
          </span>
          <div>
            <h2 className="font-display text-base font-bold">Smart Search</h2>
            <p className="text-xs text-muted-foreground">Temukan akun impianmu dengan filter presisi</p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.();
          }}
          className="relative mt-4 space-y-3"
        >
          <Field label="Cari berdasarkan nama akun">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={value.q}
                onChange={(e) => set("q", e.target.value)}
                placeholder="Xavier, Fanny, Lancelot..."
                className="w-full rounded-xl border border-border bg-background/60 py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary/70 focus:shadow-neon"
              />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Harga Minimal">
              <PriceInput value={value.minPrice} onChange={(v) => set("minPrice", v)} placeholder="Harga Min" />
            </Field>
            <Field label="Harga Maksimal">
              <PriceInput value={value.maxPrice} onChange={(v) => set("maxPrice", v)} placeholder="Harga Max" />
            </Field>
            <Field label="Jumlah Hero Minimal">
              <NumberInput value={value.minHero} onChange={(v) => set("minHero", v)} placeholder="Min Hero" />
            </Field>
            <Field label="Jumlah Skin Minimal">
              <NumberInput value={value.minSkin} onChange={(v) => set("minSkin", v)} placeholder="Min Skin" />
            </Field>
          </div>

          <Field label="Rank">
            <select
              value={value.rank}
              onChange={(e) => set("rank", e.target.value as FilterState["rank"])}
              className="w-full appearance-none rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary/70 focus:shadow-neon"
            >
              <option value="all">Semua Rank</option>
              {ranks.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </Field>

          <div className="flex gap-2 pt-1">
            <button type="submit" className="flex-1 rounded-xl bg-gradient-brand py-3 text-sm font-semibold text-white shadow-neon transition-transform hover:scale-[1.01]">
              Search Account
            </button>
            <button
              type="button"
              onClick={() => onChange(initialFilters)}
              className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-secondary/60 hover:text-foreground"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function NumberInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input
      inputMode="numeric"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
      placeholder={placeholder}
      className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary/70 focus:shadow-neon"
    />
  );
}

function PriceInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">Rp</span>
      <input
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background/60 py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary/70 focus:shadow-neon"
      />
    </div>
  );
}