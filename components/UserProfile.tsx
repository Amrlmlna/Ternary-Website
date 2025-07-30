import React, { useState } from "react";
import { useAuth } from "../src/contexts/AuthContext";
import {
  User,
  Mail,
  Calendar,
  Settings,
  Shield,
  CreditCard,
  LogOut,
} from "lucide-react";
import { cn } from "../src/lib/utils";

export default function UserProfile() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "profile" | "settings" | "billing" | "security"
  >("profile");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center neu-bg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--neu-text)] mb-4">
            Anda harus masuk terlebih dahulu
          </h2>
          <p className="text-[var(--neu-text)] opacity-70">
            Silakan masuk untuk melihat profil Anda
          </p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "settings", label: "Pengaturan", icon: Settings },
    { id: "billing", label: "Tagihan", icon: CreditCard },
    { id: "security", label: "Keamanan", icon: Shield },
  ];

  return (
    <div className="min-h-screen neu-bg py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--neu-text)] mb-2">
            Profil Pengguna
          </h1>
          <p className="text-[var(--neu-text)] opacity-70">
            Kelola informasi akun dan pengaturan Anda
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="neu-bg neu-shadow neu-radius p-6">
              <div className="text-center mb-6">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.full_name || user.email || "User"}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                ) : (
                  <div className="w-20 h-20 neu-shadow-inset neu-radius flex items-center justify-center mx-auto mb-4">
                    <User size={32} className="text-accent" />
                  </div>
                )}
                <h3 className="font-semibold text-[var(--neu-text)]">
                  {user.user_metadata?.full_name ||
                    user.email?.split("@")[0] ||
                    "User"}
                </h3>
                <p className="text-sm text-[var(--neu-text)] opacity-70">
                  {user.email}
                </p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all",
                        activeTab === tab.id
                          ? "bg-accent text-white neu-shadow"
                          : "text-[var(--neu-text)] hover:bg-[var(--neu-border)]"
                      )}
                    >
                      <Icon size={16} />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-6 border-t border-[var(--neu-border)]">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-[var(--neu-text)] hover:bg-red-100 hover:text-red-700 transition-all"
                >
                  <LogOut size={16} />
                  <span className="text-sm font-medium">Keluar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="neu-bg neu-shadow neu-radius p-6">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[var(--neu-text)] mb-4">
                    Informasi Profil
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--neu-text)] mb-2">
                        Nama Lengkap
                      </label>
                      <div className="neu-input">
                        {user.user_metadata?.full_name || "Tidak diisi"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--neu-text)] mb-2">
                        Email
                      </label>
                      <div className="neu-input flex items-center gap-2">
                        <Mail size={16} className="text-accent" />
                        {user.email}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--neu-text)] mb-2">
                        Bergabung Sejak
                      </label>
                      <div className="neu-input flex items-center gap-2">
                        <Calendar size={16} className="text-accent" />
                        {new Date(user.created_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--neu-text)] mb-2">
                        Provider
                      </label>
                      <div className="neu-input">
                        {user.app_metadata?.provider || "email"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[var(--neu-text)] mb-4">
                    Pengaturan
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 neu-shadow-inset neu-radius">
                      <div>
                        <h3 className="font-medium text-[var(--neu-text)]">
                          Notifikasi Email
                        </h3>
                        <p className="text-sm text-[var(--neu-text)] opacity-70">
                          Terima notifikasi penting via email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 neu-shadow-inset neu-radius peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 neu-shadow-inset neu-radius">
                      <div>
                        <h3 className="font-medium text-[var(--neu-text)]">
                          Mode Gelap
                        </h3>
                        <p className="text-sm text-[var(--neu-text)] opacity-70">
                          Aktifkan tema gelap
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 neu-shadow-inset neu-radius peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[var(--neu-text)] mb-4">
                    Tagihan & Langganan
                  </h2>

                  <div className="text-center py-12">
                    <CreditCard
                      size={48}
                      className="text-accent mx-auto mb-4"
                    />
                    <h3 className="text-lg font-medium text-[var(--neu-text)] mb-2">
                      Belum ada langganan aktif
                    </h3>
                    <p className="text-[var(--neu-text)] opacity-70 mb-4">
                      Pilih paket yang sesuai dengan kebutuhan Anda
                    </p>
                    <a
                      href="#pricing"
                      className="neu-btn-accent inline-flex items-center gap-2"
                    >
                      Lihat Paket
                    </a>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[var(--neu-text)] mb-4">
                    Keamanan
                  </h2>

                  <div className="space-y-4">
                    <div className="p-4 neu-shadow-inset neu-radius">
                      <h3 className="font-medium text-[var(--neu-text)] mb-2">
                        Verifikasi Email
                      </h3>
                      <p className="text-sm text-[var(--neu-text)] opacity-70 mb-3">
                        Email Anda telah diverifikasi
                      </p>
                      <div className="flex items-center gap-2 text-green-600">
                        <Shield size={16} />
                        <span className="text-sm font-medium">
                          Terverifikasi
                        </span>
                      </div>
                    </div>

                    <div className="p-4 neu-shadow-inset neu-radius">
                      <h3 className="font-medium text-[var(--neu-text)] mb-2">
                        Sesi Aktif
                      </h3>
                      <p className="text-sm text-[var(--neu-text)] opacity-70">
                        Anda sedang masuk di perangkat ini
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
