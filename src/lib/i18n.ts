// Internationalization utility

export type Language = "id" | "en";

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  "nav.home": {
    id: "Beranda",
    en: "Home",
  },
  "nav.features": {
    id: "Fitur",
    en: "Features",
  },
  "nav.howItWorks": {
    id: "Cara Kerja",
    en: "How It Works",
  },
  "nav.testimonials": {
    id: "Testimoni",
    en: "Testimonials",
  },
  "nav.faq": {
    id: "FAQ",
    en: "FAQ",
  },
  "nav.pricing": {
    id: "Harga",
    en: "Pricing",
  },

  // Authentication
  "auth.signIn": {
    id: "Masuk",
    en: "Sign In",
  },
  "auth.signOut": {
    id: "Keluar",
    en: "Sign Out",
  },
  "auth.signUp": {
    id: "Daftar",
    en: "Sign Up",
  },
  "auth.withGoogle": {
    id: "Masuk dengan Google",
    en: "Sign in with Google",
  },
  "auth.withGithub": {
    id: "Masuk dengan GitHub",
    en: "Sign in with GitHub",
  },
  "auth.magicLink": {
    id: "Kirim Magic Link",
    en: "Send Magic Link",
  },
  "auth.emailPlaceholder": {
    id: "Masukkan email Anda",
    en: "Enter your email",
  },
  "auth.emailSent": {
    id: "Magic link telah dikirim ke email Anda",
    en: "Magic link has been sent to your email",
  },

  // Common
  "common.loading": {
    id: "Memuat...",
    en: "Loading...",
  },
  "common.error": {
    id: "Terjadi kesalahan",
    en: "An error occurred",
  },
  "common.success": {
    id: "Berhasil",
    en: "Success",
  },
  "common.cancel": {
    id: "Batal",
    en: "Cancel",
  },
  "common.save": {
    id: "Simpan",
    en: "Save",
  },
  "common.edit": {
    id: "Edit",
    en: "Edit",
  },
  "common.delete": {
    id: "Hapus",
    en: "Delete",
  },
  "common.close": {
    id: "Tutup",
    en: "Close",
  },

  // Home page
  "home.hero.title": {
    id: "Ternary Premium",
    en: "Ternary Premium",
  },
  "home.hero.subtitle": {
    id: "Platform AI terdepan untuk pengembangan aplikasi yang lebih cepat, lebih cerdas, dan lebih efisien",
    en: "Leading AI platform for faster, smarter, and more efficient application development",
  },
  "home.hero.cta": {
    id: "Mulai Sekarang",
    en: "Get Started",
  },
  "home.hero.learnMore": {
    id: "Pelajari Lebih Lanjut",
    en: "Learn More",
  },

  // Features
  "features.lightningFast.title": {
    id: "Lightning Fast",
    en: "Lightning Fast",
  },
  "features.lightningFast.description": {
    id: "Generate kode dengan kecepatan yang luar biasa menggunakan AI terdepan",
    en: "Generate code with incredible speed using cutting-edge AI",
  },
  "features.smartContext.title": {
    id: "Smart Context",
    en: "Smart Context",
  },
  "features.smartContext.description": {
    id: "AI memahami konteks proyek Anda untuk hasil yang lebih akurat",
    en: "AI understands your project context for more accurate results",
  },
  "features.enterpriseReady.title": {
    id: "Enterprise Ready",
    en: "Enterprise Ready",
  },
  "features.enterpriseReady.description": {
    id: "Keamanan tingkat enterprise dengan dukungan tim yang responsif",
    en: "Enterprise-level security with responsive team support",
  },

  // Stats
  "stats.developers": {
    id: "Developer Aktif",
    en: "Active Developers",
  },
  "stats.codeLines": {
    id: "Baris Kode Generated",
    en: "Lines of Code Generated",
  },
  "stats.uptime": {
    id: "Uptime",
    en: "Uptime",
  },
  "stats.support": {
    id: "Support",
    en: "Support",
  },

  // Footer
  "footer.copyright": {
    id: "© {year} Ternary Premium. All rights reserved.",
    en: "© {year} Ternary Premium. All rights reserved.",
  },
};

class I18n {
  private currentLanguage: Language = "id";

  // constructor() {
  //   // Get language from localStorage or browser preference
  //   const savedLanguage = localStorage.getItem("language") as Language;
  //   if (savedLanguage && ["id", "en"].includes(savedLanguage)) {
  //     this.currentLanguage = savedLanguage;
  //   } else {
  //     // Use browser language preference
  //     const browserLang = navigator.language.split("-")[0];
  //     this.currentLanguage = browserLang === "en" ? "en" : "id";
  //   }
  // }

  // setLanguage(language: Language) {
  //   this.currentLanguage = language;
  //   localStorage.setItem("language", language);
  //   document.documentElement.lang = language;
  // }

  // getLanguage(): Language {
  //   return this.currentLanguage;
  // }

  // t(key: string, params?: Record<string, string | number>): string {
  //   const translation = translations[key]?.[this.currentLanguage] || key;

  //   if (params) {
  //     return translation.replace(/\{(\w+)\}/g, (match, param) => {
  //       return String(params[param] || match);
  //     });
  //   }

  //   return translation;
  // }

  // Get all available languages
  // getAvailableLanguages(): {
  //   code: Language;
  //   name: string;
  //   nativeName: string;
  // }[] {
  //   return [
  //     { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  //     { code: "en", name: "English", nativeName: "English" },
  //   ];
  // }

  // Format date according to current language
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat(this.currentLanguage, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }

  // Format number according to current language
  formatNumber(number: number): string {
    return new Intl.NumberFormat(this.currentLanguage).format(number);
  }

  // Format currency according to current language
  formatCurrency(amount: number, currency: string = "IDR"): string {
    return new Intl.NumberFormat(this.currentLanguage, {
      style: "currency",
      currency,
    }).format(amount);
  }
}

export const i18n = new I18n();

// Hook for React components
export function useTranslation() {
  return {
    // t: i18n.t.bind(i18n),
    // language: i18n.getLanguage(),
    // setLanguage: i18n.setLanguage.bind(i18n),
    // availableLanguages: i18n.getAvailableLanguages(),
    formatDate: i18n.formatDate.bind(i18n),
    formatNumber: i18n.formatNumber.bind(i18n),
    formatCurrency: i18n.formatCurrency.bind(i18n),
  };
}
