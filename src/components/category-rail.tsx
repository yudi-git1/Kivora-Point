// ============================================
// FILE: components/category-rail.tsx
// TANPA GAMBAR - PAKAI GRADIENT
// ============================================

import { categories, type AccountCategory } from "@/lib/accounts";

interface Props {
  active: AccountCategory | "all";
  onChange: (id: AccountCategory | "all") => void;
}

// 🔥 GRADIENT UNTUK SETIAP RANK (TANPA GAMBAR)
const rankGradients: Record<string, string> = {
  immortal: "from-purple-800/90 via-purple-900/80 to-purple-950/90",
  glory: "from-yellow-700/90 via-yellow-800/80 to-yellow-950/90",
  honor: "from-blue-700/90 via-blue-800/80 to-blue-950/90",
  mythic: "from-indigo-700/90 via-indigo-800/80 to-indigo-950/90",
  legend: "from-orange-700/90 via-orange-800/80 to-orange-950/90",
  epic: "from-red-700/90 via-red-800/80 to-red-950/90",
  grandmaster: "from-green-700/90 via-green-800/80 to-green-950/90",
  master: "from-cyan-700/90 via-cyan-800/80 to-cyan-950/90",
  warrior: "from-gray-700/90 via-gray-800/80 to-gray-950/90",
  elite: "from-slate-700/90 via-slate-800/80 to-slate-950/90",
  default: "from-gray-700/90 via-gray-800/80 to-gray-950/90",
};

export function CategoryRail({ active, onChange }: Props) {
  return (
    <section
      id="kategori"
      className="mx-auto max-w-7xl px-4 py-12"
    >
      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-white">
            Kategori Rank
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pilih rank yang ingin kamu cari.
          </p>
        </div>

        <button
          onClick={() => onChange("all")}
          className={`rounded-lg px-3 py-2 text-sm transition ${
            active === "all"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:text-white"
          }`}
        >
          Lihat Semua
        </button>
      </div>

      {/* Horizontal Scroll */}
      <div className="-mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-5">

          {categories.map((c) => {

            const isActive = active === c.id;
            const gradient = rankGradients[c.id] ?? rankGradients.default;

            return (
              <button
                key={c.id}
                onClick={() => onChange(isActive ? "all" : c.id)}
                className={`group relative h-72 w-56 shrink-0 overflow-hidden rounded-3xl border transition-all duration-300 ${
                  isActive
                    ? "scale-[1.03] border-primary shadow-[0_0_35px_rgba(99,102,241,.35)]"
                    : "border-white/10 hover:scale-[1.03] hover:border-primary/50"
                }`}
              >

                {/* 🔥 GRADIENT BACKGROUND (TANPA GAMBAR) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />

                {/* Grid Pattern biar gak polos */}
                <div className="absolute inset-0 bg-grid opacity-20" />

                {/* Bottom Fade */}
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/80 to-transparent" />

                {/* Active Glow */}
                {isActive && (
                  <div className="absolute inset-0 rounded-3xl ring-2 ring-primary/50" />
                )}

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-6">

                  <h3 className="font-display text-2xl font-bold text-white">
                    {c.label}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-300">
                    {isActive
                      ? "Kategori sedang dipilih."
                      : "Klik untuk melihat akun dengan rank ini."}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <span className="text-xs text-gray-400">
                      Mobile Legends
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-white/10 text-gray-200"
                      }`}
                    >
                      {isActive ? "Aktif" : "Lihat"}
                    </span>

                  </div>

                </div>

              </button>
            );

          })}
        </div>
      </div>
    </section>
  );
}