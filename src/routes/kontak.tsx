// ============================================
// FILE: app/routes/kontak.tsx - DENGAN EMAIL JS + SOSMED FIX
// ============================================

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useSettings } from "@/components/SettingsProvider";
import { sendContactEmail } from "@/lib/emailjs";
import {
  Phone,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export const Route = createFileRoute("/kontak")({
  component: KontakPage,
});

// 🔥 SOCIAL MEDIA LINKS - SAMA DENGAN FOOTER
const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/kivorapoint.id",
    color: "hover:text-pink-500",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com/kivorapoint",
    color: "hover:text-sky-400",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://youtube.com/@kivorapoint",
    color: "hover:text-red-500",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Channel",
    href: "https://whatsapp.com/channel/0029vb8vop07dawsymeqsu2b",
    color: "hover:text-green-400",
  },
];

function KontakPage() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    if (!formData.name.trim()) {
      setStatus({ type: "error", message: "Nama harus diisi" });
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus({ type: "error", message: "Email harus valid" });
      return;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setStatus({ type: "error", message: "Pesan minimal 10 karakter" });
      return;
    }

    setStatus({ type: "loading", message: "Mengirim pesan..." });

    const result = await sendContactEmail({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      to_email: settings?.email || "kivorapoint99@gmail.com",
    });

    if (result.success) {
      setStatus({ type: "success", message: result.message });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setStatus({ type: "idle", message: "" });
      }, 5000);
    } else {
      setStatus({ type: "error", message: result.message });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl font-bold">
            Hubungi <span className="text-gradient-brand">Kami</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Kami siap membantu kamu 24/7
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-display text-lg font-semibold mb-4">
                Informasi Kontak
              </h2>

              <div className="space-y-4">
                {settings?.whatsapp && (
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface/50 p-4 hover:bg-accent/10 transition"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-green-500/20 text-green-400">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">WhatsApp</div>
                      <div className="text-xs text-muted-foreground">
                        {settings.whatsapp}
                      </div>
                    </div>
                  </a>
                )}

                {settings?.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface/50 p-4 hover:bg-accent/10 transition"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/20 text-blue-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-xs text-muted-foreground">
                        {settings.email}
                      </div>
                    </div>
                  </a>
                )}

                <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/50 p-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-500/20 text-yellow-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Jam Operasional</div>
                    <div className="text-xs text-muted-foreground">
                      24 Jam Nonstop
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= SOCIAL MEDIA - FIXED ================= */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-sm font-semibold mb-4">
                Follow Kami
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`grid h-12 w-12 place-items-center rounded-xl border border-border bg-surface/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:scale-105 hover:text-foreground ${social.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form - DENGAN EMAILJS */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold mb-4">
              Kirim Pesan
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Kami akan merespon pesan kamu secepat mungkin
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Nama Lengkap <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Masukkan nama kamu"
                  className="w-full rounded-xl border border-border bg-surface/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                  disabled={status.type === "loading"}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Masukkan email kamu"
                  className="w-full rounded-xl border border-border bg-surface/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                  disabled={status.type === "loading"}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Pesan <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tulis pesan kamu di sini..."
                  className="w-full rounded-xl border border-border bg-surface/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30 resize-y"
                  disabled={status.type === "loading"}
                />
              </div>

              {/* Status Message */}
              {status.type === "success" && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  {status.message}
                </div>
              )}

              {status.type === "error" && (
                <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={status.type === "loading"}
                className="w-full rounded-xl bg-gradient-brand px-6 py-3 font-semibold text-white shadow-neon transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status.type === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}