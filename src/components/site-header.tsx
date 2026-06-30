// ============================================
// FILE: components/site-header.tsx - FIXED
// ============================================

import { Link } from "@tanstack/react-router";
import {
  Menu,
  Search,
  Sparkles,
  X,
  ShoppingBag,
  Phone,
  Info,
  Shield,
  Home,
  Mail,
  Tags,
  ChevronDown,
  ArrowUp,
  Crown,
  Flame,
  Gem,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSettings } from "@/components/SettingsProvider";

interface SiteHeaderProps {
  storeName?: string;
  logoUrl?: string;
  whatsapp?: string;
}

const menuItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Stock Akun", href: "/stock", icon: ShoppingBag },
  { label: "Cara Beli", href: "/cara-beli", icon: Info },
  { label: "Kontak", href: "/kontak", icon: Mail },
];

const categories = [
  { label: "Mythic", href: "/stock?category=mythic", icon: Crown },
  { label: "Legend", href: "/stock?category=legend", icon: Flame },
  { label: "Epic", href: "/stock?category=epic", icon: Gem },
  { label: "Grandmaster", href: "/stock?category=grandmaster", icon: Shield },
];

export function SiteHeader({ storeName, logoUrl, whatsapp }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { settings } = useSettings();

  const name = storeName || settings?.store_name || "Kivora Point";
  const logo = logoUrl || settings?.logo_url || "";
  const whatsappNumber = whatsapp || settings?.whatsapp || "";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ⭐ Toggle menu dengan aman
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  // ⭐ Tutup menu
  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border/60 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-black/10"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      {/* TOP BAR */}
      <div className="hidden lg:block bg-primary/5 border-b border-border/40 transition-all duration-300">
        <div className="mx-auto max-w-6xl px-4 py-1.5 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 transition-colors duration-300 hover:text-foreground">
              <Shield className="h-3 w-3 text-primary" /> Aman & Terpercaya
            </span>
            <span className="transition-colors duration-300 hover:text-foreground">Premium Account</span>
            <span className="transition-colors duration-300 hover:text-foreground">500+ Customer Puas</span>
          </div>
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-green-400 transition-all duration-300 hover:text-green-300 hover:scale-105"
            >
              <Phone className="h-3 w-3" /> {whatsappNumber}
            </a>
          )}
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link
            to="/"
            className="group flex items-center gap-3 shrink-0 transition-all duration-300 hover:scale-105"
            onClick={closeMobileMenu}
          >
            {logo ? (
              <img
                src={logo}
                alt={name}
                className="h-9 w-9 rounded-xl object-cover border border-border/40 transition-all duration-300 group-hover:shadow-neon"
              />
            ) : (
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-neon transition-all duration-300 group-hover:shadow-2xl group-hover:scale-110">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
            )}
            <div className="hidden sm:block">
              <span className="font-display text-base font-bold tracking-tight transition-colors duration-300 group-hover:text-primary">
                {name}
              </span>
              <span className="block text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                Gaming Marketplace
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-accent/10 hover:scale-105"
                  activeProps={{
                    className: "bg-primary/10 text-primary",
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-[.active]:w-1/2" />
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            {/* SEARCH */}
            <div className="hidden lg:flex items-center gap-2 rounded-lg border border-border bg-surface/70 px-3 py-1.5 transition-all duration-300 focus-within:border-primary/70 focus-within:shadow-neon">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Cari akun..."
                className="w-36 lg:w-44 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>

            {/* KATEGORI DROPDOWN */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-surface/70 px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:bg-surface hover:scale-105"
              >
                <Tags className="h-4 w-4" />
                <span className="hidden xl:inline">Kategori</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${categoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoryOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-background shadow-xl py-2 animate-in fade-in zoom-in-95 duration-200">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.label}
                        to={cat.href}
                        onClick={() => setCategoryOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:bg-accent/10 hover:text-foreground transition"
                      >
                        <Icon className="h-4 w-4" />
                        {cat.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* BACK TO TOP */}
            <button
              onClick={scrollToTop}
              className={`hidden lg:flex items-center gap-1.5 rounded-lg border border-border bg-surface/70 px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:bg-surface hover:scale-105 ${
                showBackToTop ? 'opacity-100' : 'opacity-40 hover:opacity-100'
              }`}
              title="Kembali ke atas"
            >
              <ArrowUp className="h-4 w-4" />
              <span className="hidden xl:inline">Atas</span>
            </button>

            {/* ⭐ MOBILE MENU TOGGLE - FIXED ⭐ */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface/70 text-foreground transition-all duration-300 hover:border-primary/60 hover:bg-surface hover:scale-105"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="lg:hidden mt-3">
          <label className="relative block transition-all duration-300 focus-within:scale-[1.01]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Cari akun Mobile Legends..."
              className="w-full rounded-xl border border-border bg-surface/70 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300 focus:border-primary/70 focus:bg-surface focus:shadow-neon"
            />
          </label>
        </div>
      </div>

      {/* ⭐ MOBILE MENU - FIXED ⭐ */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur animate-in slide-in-from-top-5 duration-300">
          <div className="mx-auto max-w-6xl px-4 py-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:bg-accent/10 hover:translate-x-1"
                  activeProps={{
                    className: "bg-primary/10 text-primary",
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}

            {/* MOBILE CATEGORIES */}
            <div className="pt-2 border-t border-border/40">
              <p className="px-3 py-1 text-xs text-muted-foreground">Kategori</p>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.label}
                    to={cat.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent/10 hover:text-foreground transition"
                  >
                    <Icon className="h-4 w-4" />
                    {cat.label}
                  </Link>
                );
              })}
            </div>

            {/* MOBILE BACK TO TOP */}
            <button
              onClick={() => {
                scrollToTop();
                closeMobileMenu();
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/10 transition"
            >
              <ArrowUp className="h-4 w-4" />
              Kembali ke Atas
            </button>

            {/* MOBILE WHATSAPP */}
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:scale-[1.02]"
              >
                <Phone className="h-4 w-4" /> Hubungi WhatsApp
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}