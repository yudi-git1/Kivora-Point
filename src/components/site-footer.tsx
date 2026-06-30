// ============================================
// FILE: components/site-footer.tsx
// DENGAN ICON TIKTOK (SVG)
// ============================================

import { Instagram, MessageCircle, Sparkles, Heart, Mail, Phone } from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";
import { Link } from "@tanstack/react-router";

interface SiteFooterProps {
  storeName?: string;
  email?: string;
  whatsapp?: string;
  logoUrl?: string;
}

// 🔥 ICON TIKTOK (SVG)
function TikTokIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-2.84 3.37-2.22V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.89a7.06 7.06 0 0 0 4.3 1.38V8.29c-1.63 0-3.11-.83-3.93-2.47z"/>
    </svg>
  );
}

export function SiteFooter({ storeName, email, whatsapp, logoUrl }: SiteFooterProps) {
  const { settings } = useSettings();

  const name = storeName || settings?.store_name || "Kivora Point";
  const contactEmail = email || settings?.email || "";
  const contactWhatsapp = whatsapp || settings?.whatsapp || "";
  const logo = logoUrl || settings?.logo_url || "";

  // 🔥 SOCIAL MEDIA LINKS
  const socialLinks = [
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/kivorapoint.id",
      color: "hover:text-pink-500",
    },
    {
      icon: TikTokIcon,
      label: "TikTok",
      href: "https://www.tiktok.com/@kivorapoint.id?_r=1&_t=zs-97urtpzht6o",
      color: "hover:text-white",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp Channel",
      href: "https://whatsapp.com/channel/0029vb8vop07dawsymeqsu2b",
      color: "hover:text-green-400",
    },
  ];

  return (
    <footer id="footer" className="mt-16 border-t border-border/60 bg-background/70">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ================= BRAND ================= */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              {logo ? (
                <img
                  src={logo}
                  alt={name}
                  className="h-9 w-9 rounded-xl object-cover border border-border/40"
                />
              ) : (
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-neon">
                  <Sparkles className="h-4 w-4 text-white" />
                </span>
              )}
              <span className="font-display text-lg font-bold">
                <span className="text-gradient-brand">{name}</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Gaming Account Marketplace. Akun Mobile Legends premium, aman &amp;
              terpercaya untuk para sultan dan kolektor.
            </p>
          </div>

          {/* ================= MENU ================= */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Menu</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition">Home</Link></li>
              <li><Link to="/stock" className="hover:text-foreground transition">Stock Akun</Link></li>
              <li><Link to="/cara-beli" className="hover:text-foreground transition">Cara Beli</Link></li>
              <li><Link to="/kontak" className="hover:text-foreground transition">Kontak</Link></li>
            </ul>
          </div>

          {/* ================= KONTAK ================= */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Kontak</h4>
            <ul className="space-y-3 text-sm">
              {contactEmail && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                  <a 
                    href={`mailto:${contactEmail}`} 
                    className="text-muted-foreground hover:text-foreground transition truncate"
                  >
                    {contactEmail}
                  </a>
                </li>
              )}
              {contactWhatsapp && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-400 shrink-0" />
                  <a 
                    href={`https://wa.me/${contactWhatsapp.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    {contactWhatsapp}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* ================= SOCIAL MEDIA + BOTTOM ================= */}
        <div className="mt-8 flex flex-wrap items-center justify-between border-t border-border/60 pt-5">
          <div className="flex gap-2">
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface/70 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:scale-105 ${social.color}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4 sm:mt-0">
            <span>&copy; {new Date().getFullYear()} {name}. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
          </div>
        </div>
      </div>
    </footer>
  );
}