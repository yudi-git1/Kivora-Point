// ============================================
// FILE: lib/accounts.ts
// URUTAN RANK BENAR (Warrior → Elite → ... → Mythic Immortal)
// ============================================

import { supabase } from "./supabase";

export type AccountRank =
  | "Warrior"
  | "Elite"
  | "Master"
  | "Grandmaster"
  | "Epic"
  | "Legend"
  | "Mythic"
  | "Mythic Honor"
  | "Mythic Glory"
  | "Mythic Immortal";

export type AccountCategory = 
  | "warrior"
  | "elite"
  | "master"
  | "grandmaster"
  | "epic"
  | "legend"
  | "mythic"
  | "honor"
  | "glory"
  | "immortal"
  | "all";

export interface Account {
  id: string;
  name: string;
  code: string;
  price: number;
  originalPrice?: number;
  rank: string;
  heroes: number;
  skins: number;
  status: "Available" | "Reserved" | "Sold";
  image: string | null;
  description: string | null;
  category: AccountCategory;
  title: string;
  emoji: string;
  cover: string;
  highlights: string[];
  available: boolean;
  created_at: string;
  updated_at: string;
}

// ================= CATEGORIES (TANPA EMOJI) =================
export const categories: { id: AccountCategory; label: string; tint: string }[] = [
  { id: "immortal", label: "Mythic Immortal", tint: "from-purple-900/80 to-purple-950/80" },
  { id: "glory", label: "Mythic Glory", tint: "from-yellow-900/80 to-yellow-950/80" },
  { id: "honor", label: "Mythic Honor", tint: "from-blue-900/80 to-blue-950/80" },
  { id: "mythic", label: "Mythic", tint: "from-indigo-900/80 to-indigo-950/80" },
  { id: "legend", label: "Legend", tint: "from-orange-900/80 to-orange-950/80" },
  { id: "epic", label: "Epic", tint: "from-red-900/80 to-red-950/80" },
  { id: "grandmaster", label: "Grandmaster", tint: "from-green-900/80 to-green-950/80" },
  { id: "master", label: "Master", tint: "from-cyan-900/80 to-cyan-950/80" },
  { id: "elite", label: "Elite", tint: "from-slate-900/80 to-slate-950/80" },
  { id: "warrior", label: "Warrior", tint: "from-gray-900/80 to-gray-950/80" },
];

// ================= RANKS (DARI RENDAH KE TINGGI) =================
export const ranks: AccountRank[] = [
  "Warrior",
  "Elite",
  "Master",
  "Grandmaster",
  "Epic",
  "Legend",
  "Mythic",
  "Mythic Honor",
  "Mythic Glory",
  "Mythic Immortal",
];

// ================= MAPPING FUNCTION =================
function mapAccount(data: any): Account {
  return {
    id: data.id,
    name: data.name || "Unnamed Account",
    code: data.code || "N/A",
    price: data.price || 0,
    originalPrice: data.original_price || undefined,
    rank: data.rank || "Unknown",
    heroes: data.hero_count || 0,
    skins: data.skin_count || 0,
    status: data.status || "Available",
    image: data.image || null,
    description: data.description || null,
    category: (data.category as AccountCategory) || "epic",
    title: data.title || getTitleFromRank(data.rank),
    emoji: data.emoji || getEmojiFromRank(data.rank),
    cover: data.cover || getCoverFromRank(data.rank),
    highlights: data.highlights || getDefaultHighlights(data.rank),
    available: data.status === "Available",
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

// ================= GET ALL ACCOUNTS =================
export async function getAccounts(): Promise<Account[]> {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching accounts:", error);
      return [];
    }

    if (!data || data.length === 0) return [];
    return data.map(mapAccount);
  } catch (error) {
    console.error("Error in getAccounts:", error);
    return [];
  }
}

// ================= GET SINGLE ACCOUNT =================
export async function getAccount(id: string): Promise<Account | null> {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching account:", error);
      return null;
    }

    if (!data) return null;
    return mapAccount(data);
  } catch (error) {
    console.error("Error in getAccount:", error);
    return null;
  }
}

// ================= GET ACCOUNTS BY CATEGORY =================
export async function getAccountsByCategory(category: AccountCategory): Promise<Account[]> {
  try {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching accounts by category:", error);
      return [];
    }

    if (!data || data.length === 0) return [];
    return data.map(mapAccount);
  } catch (error) {
    console.error("Error in getAccountsByCategory:", error);
    return [];
  }
}

// ================= BUILD WHATSAPP URL =================
export function buildWhatsAppUrl(account: Account, whatsappNumber?: string): string {
  const phone = whatsappNumber?.replace(/[^0-9]/g, '') || '628571767780';
  const message = `Halo Kivora Point, saya tertarik dengan akun ${account.name} (${account.code}) seharga ${formatIDR(account.price)}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// ================= FORMAT IDR =================
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ================= HELPER FUNCTIONS =================
function getTitleFromRank(rank: string): string {
  const titles: Record<string, string> = {
    "Warrior": "Warrior",
    "Elite": "Elite",
    "Master": "Master",
    "Grandmaster": "Grandmaster",
    "Epic": "Epic",
    "Legend": "Legend",
    "Mythic": "Mythic",
    "Mythic Honor": "Mythic Honor",
    "Mythic Glory": "Mythic Glory",
    "Mythic Immortal": "Mythic Immortal",
  };
  return titles[rank] || rank;
}

function getEmojiFromRank(rank: string): string {
  const emojis: Record<string, string> = {
    "Warrior": "🛡️",
    "Elite": "⚡",
    "Master": "🎯",
    "Grandmaster": "💪",
    "Epic": "🔥",
    "Legend": "⚔️",
    "Mythic": "💜",
    "Mythic Honor": "🌟",
    "Mythic Glory": "⭐",
    "Mythic Immortal": "👑",
  };
  return emojis[rank] || "🎮";
}

function getCoverFromRank(rank: string): string {
  const covers: Record<string, string> = {
    "Warrior": "from-gray-900/80 via-gray-800/60 to-gray-950/80",
    "Elite": "from-slate-900/80 via-slate-800/60 to-slate-950/80",
    "Master": "from-cyan-900/80 via-cyan-800/60 to-cyan-950/80",
    "Grandmaster": "from-green-900/80 via-green-800/60 to-green-950/80",
    "Epic": "from-red-900/80 via-red-800/60 to-red-950/80",
    "Legend": "from-orange-900/80 via-orange-800/60 to-orange-950/80",
    "Mythic": "from-indigo-900/80 via-indigo-800/60 to-indigo-950/80",
    "Mythic Honor": "from-blue-900/80 via-blue-800/60 to-blue-950/80",
    "Mythic Glory": "from-yellow-900/80 via-yellow-800/60 to-yellow-950/80",
    "Mythic Immortal": "from-purple-900/80 via-purple-800/60 to-purple-950/80",
  };
  return covers[rank] || "from-gray-900/80 via-gray-800/60 to-gray-950/80";
}

function getDefaultHighlights(rank: string): string[] {
  const highlights: Record<string, string[]> = {
    "Warrior": ["Akun Warrior", "Rank Pemula", "Skin Dasar", "Hero Terbatas"],
    "Elite": ["Akun Elite", "Rank Pemula", "Skin Dasar", "Hero Standar"],
    "Master": ["Akun Master", "Rank Pemula", "Skin Standar", "Hero Dasar"],
    "Grandmaster": ["Akun Grandmaster", "Rank Menengah", "Skin Lumayan", "Hero OK"],
    "Epic": ["Akun Epic", "Rank Menengah", "Skin Lucu", "Hero Favorit"],
    "Legend": ["Akun Legend", "Rank Stabil", "Skin Menarik", "Hero Bervariasi"],
    "Mythic": ["Akun Mythic", "Rank Tinggi", "Skin Bagus", "Hero Lengkap"],
    "Mythic Honor": ["Akun Mythic Honor", "Rank Tinggi", "Skin Premium", "Hero Meta"],
    "Mythic Glory": ["Akun Mythic Glory", "Rank Tinggi", "Skin Eksklusif", "Hero Meta"],
    "Mythic Immortal": ["Akun Mythic Immortal", "Rank Tertinggi", "Skin Eksklusif", "Hero Lengkap"],
  };
  return highlights[rank] || ["Akun Premium", "Rank Terjamin", "Skin Eksklusif", "Hero Lengkap"];
}