// ============================================
// FILE: components/OrderModal.tsx
// FIX: SAVE ORDER TO DATABASE
// ============================================

import { useState } from "react";
import { X, User, Phone, Send, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { type Account, formatIDR } from "@/lib/accounts";
import { supabase } from "@/lib/supabase";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account;
  whatsappNumber: string;
}

export function OrderModal({ isOpen, onClose, account, whatsappNumber }: OrderModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // 🔥 FORMAT NOMOR WHATSAPP - HANYA ANGKA
  const formatWhatsAppNumber = (number: string): string => {
    let cleaned = number.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.slice(1);
    }
    if (!cleaned.startsWith('62')) {
      cleaned = '62' + cleaned;
    }
    return cleaned;
  };

  // 🔥 SAVE ORDER KE DATABASE
  const saveOrder = async (): Promise<string | null> => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          customer_name: name.trim(),
          customer_phone: phone.trim(),
          account_id: account.id,
          price: account.price,
          order_status: 'New',
          payment_status: 'Pending',
        })
        .select()
        .single();

      if (error) {
        console.error("Error saving order:", error);
        setError("Gagal menyimpan order: " + error.message);
        return null;
      }

      console.log("✅ Order saved:", data);
      return data.id;
    } catch (err) {
      console.error("Error:", err);
      setError("Gagal menyimpan order");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi
    if (!name.trim()) {
      setError("Nama harus diisi");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setError("Nomor telepon harus diisi (minimal 10 digit)");
      return;
    }

    // CEK NOMOR ADMIN VALID
    const adminPhone = formatWhatsAppNumber(whatsappNumber);
    if (adminPhone.length < 10) {
      setError(`Nomor WhatsApp admin tidak valid: ${whatsappNumber}`);
      return;
    }

    // 🔥 SAVE ORDER KE DATABASE DULU
    setIsSubmitting(true);
    const savedOrderId = await saveOrder();
    setIsSubmitting(false);

    if (savedOrderId) {
      setOrderId(savedOrderId);
      // TAMPILKAN KONFIRMASI SEBELUM REDIRECT
      setShowConfirm(true);
    }
  };

  const handleConfirmRedirect = () => {
    setIsSubmitting(true);
    setShowConfirm(false);

    const adminPhone = formatWhatsAppNumber(whatsappNumber);
    const buyerPhone = formatWhatsAppNumber(phone);

    // Build pesan dengan order ID
    const message = `Halo Kivora Point, saya ingin membeli akun berikut:

📌 *Detail Akun:*
• Nama: ${account.name}
• Kode: ${account.code}
• Rank: ${account.rank}
• Hero: ${account.heroes}
• Skin: ${account.skins}
• Harga: ${formatIDR(account.price)}

👤 *Data Pembeli:*
• Nama: ${name.trim()}
• No. HP: ${buyerPhone}

🆔 *Order ID:* ${orderId}

Saya siap melakukan pembayaran. Mohon informasikan cara pembayaran.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;

    console.log("🔍 WhatsApp URL:", whatsappUrl);
    console.log("🔍 Order ID:", orderId);

    // Redirect ke WhatsApp
    window.open(whatsappUrl, "_blank");

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setName("");
      setPhone("");
      setOrderId(null);
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-md animate-in scale-in duration-300">
          <div className="glass-card rounded-2xl p-6 border border-border shadow-2xl">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold">Konfirmasi Pembelian</h2>
              <p className="text-sm text-muted-foreground">
                Isi data diri kamu untuk melanjutkan pembelian
              </p>
            </div>

            {/* Account Preview */}
            <div className="mb-6 rounded-xl border border-border bg-surface/50 p-4">
              <div className="flex items-center gap-3">
                {account.image ? (
                  <img
                    src={account.image}
                    alt={account.name}
                    className="h-12 w-12 rounded-xl object-cover"
                  />
                ) : (
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-2xl">
                    {account.emoji}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate">{account.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {account.rank} · {account.heroes} Hero · {account.skins} Skin
                  </p>
                  <p className="text-sm font-bold text-gradient-brand">
                    {formatIDR(account.price)}
                  </p>
                </div>
              </div>
            </div>

            {/* INFO NOMOR ADMIN */}
            <div className="mb-4 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-2">
              <p className="text-xs text-blue-400 flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                Akan dikirim ke: <strong className="text-white">{formatWhatsAppNumber(whatsappNumber)}</strong>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Nama Lengkap <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama kamu"
                    className="w-full rounded-xl border border-border bg-surface/50 px-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                    disabled={isSubmitting || isSuccess}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Nomor WhatsApp <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="081234567890"
                    className="w-full rounded-xl border border-border bg-surface/50 px-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                    disabled={isSubmitting || isSuccess}
                  />
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Contoh: 081234567890 (untuk diisi di pesan)
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              {isSuccess && (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Order berhasil! Diarahkan ke WhatsApp...
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full rounded-xl bg-gradient-brand px-6 py-3 font-semibold text-white shadow-neon transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Menyimpan..." : isSuccess ? "Berhasil!" : "Kirim & Lanjut ke WhatsApp"}
              </button>

              <p className="text-center text-[10px] text-muted-foreground">
                Dengan melanjutkan, kamu setuju dengan syarat & ketentuan Kivora Point
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* CONFIRM MODAL SEBELUM REDIRECT */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <div className="relative w-full max-w-sm glass-card rounded-2xl p-6 border border-border shadow-2xl animate-in scale-in duration-300">
            <h3 className="font-display text-lg font-bold text-center">Konfirmasi Pengiriman</h3>
            <p className="mt-2 text-sm text-muted-foreground text-center">
              Pesan akan dikirim ke nomor WhatsApp admin:
            </p>
            <p className="mt-2 text-center font-mono text-lg font-bold text-primary">
              {formatWhatsAppNumber(whatsappNumber)}
            </p>
            {orderId && (
              <p className="mt-1 text-center text-xs text-muted-foreground">
                Order ID: <span className="font-mono">{orderId}</span>
              </p>
            )}
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent/10 transition"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmRedirect}
                className="flex-1 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-neon hover:scale-[1.02] transition"
              >
                Ya, Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}