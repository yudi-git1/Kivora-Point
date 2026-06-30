// ============================================
// FILE: app/routes/stock.tsx - HALAMAN STOCK
// ============================================

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AccountCard } from "@/components/account-card";
import { FilterPanel, initialFilters, type FilterState } from "@/components/filter-panel";
import { CategoryRail } from "@/components/category-rail";
import { getAccounts, type Account, type AccountCategory, categories } from "@/lib/accounts";
import { PackageSearch, Loader2, Filter } from "lucide-react";

export const Route = createFileRoute("/stock")({
  component: StockPage,
});

function StockPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [category, setCategory] = useState<AccountCategory | "all">("all");
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAccounts() {
      setLoading(true);
      const data = await getAccounts();
      setAccounts(data);
      setLoading(false);
    }
    loadAccounts();
  }, []);

  const filtered = useMemo(() => {
    return accounts.filter((a) => {
      if (category !== "all" && a.category !== category) return false;
      if (filters.q && !a.name.toLowerCase().includes(filters.q.toLowerCase())) return false;
      if (filters.minPrice && a.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && a.price > Number(filters.maxPrice)) return false;
      if (filters.minHero && a.heroes < Number(filters.minHero)) return false;
      if (filters.minSkin && a.skins < Number(filters.minSkin)) return false;
      if (filters.rank !== "all" && a.rank !== filters.rank) return false;
      return true;
    });
  }, [accounts, category, filters]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">Stock <span className="text-gradient-brand">Akun</span></h1>
            <p className="text-sm text-muted-foreground">Temukan akun Mobile Legends premium pilihanmu</p>
          </div>
          <div className="text-sm text-muted-foreground bg-surface/50 px-4 py-2 rounded-xl border border-border">
            <Filter className="h-4 w-4 inline mr-1" />
            {filtered.length} dari {accounts.length} akun
          </div>
        </div>

        <CategoryRail active={category} onChange={setCategory} />
        <FilterPanel value={filters} onChange={setFilters} />

        <section className="pt-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Hasil Pencarian</span>
              <h2 className="mt-1 font-display text-xl font-bold">{filtered.length} Akun Ditemukan</h2>
            </div>
            {category !== "all" && (
              <button onClick={() => setCategory("all")} className="text-xs text-primary hover:underline">✕ Hapus Filter Kategori</button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-12 text-center">
              <PackageSearch className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">Tidak ada akun yang cocok dengan filter kamu.</p>
              <button onClick={() => { setCategory("all"); setFilters(initialFilters); }} className="mt-4 text-sm text-primary hover:underline">
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => <AccountCard key={a.id} account={a} />)}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}