# Ternary Premium API

Platform AI terdepan untuk pengembangan aplikasi yang lebih cepat, lebih cerdas, dan lebih efisien. Website ini dilengkapi dengan sistem autentikasi yang lengkap menggunakan Google One Tap, OAuth providers, dan magic link.

## 🚀 Fitur Utama

### 🔐 Sistem Autentikasi

- **Google One Tap**: Autentikasi otomatis untuk pengguna yang kembali
- **OAuth Providers**: Google dan GitHub OAuth
- **Magic Link**: Autentikasi email tanpa password
- **Session Management**: Manajemen sesi yang aman
- **User Profile**: Halaman profil pengguna yang lengkap

### 🎨 UI/UX Modern

- **Neumorphism Design**: Tampilan modern dengan efek neumorphism
- **Responsive Design**: Optimal di semua perangkat
- **Dark/Light Mode**: Dukungan tema gelap dan terang
- **Smooth Animations**: Animasi yang halus dan responsif

### 🛠️ Teknologi

- **Next.js 14**: Framework React modern
- **TypeScript**: Type safety yang lengkap
- **Tailwind CSS**: Styling yang fleksibel
- **Supabase**: Backend-as-a-Service
- **Stripe**: Payment processing

## 📋 Prerequisites

Sebelum memulai, pastikan Anda memiliki:

- Node.js 18+
- npm atau yarn
- Akun Supabase
- Akun Google Cloud Console
- Akun GitHub (untuk OAuth)
- Akun Stripe (untuk payment)

## 🛠️ Setup Development

### 1. Clone Repository

```bash
git clone <repository-url>
cd ternary-premium-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy file environment example:

```bash
cp env.example .env.local
```

Isi variabel environment di `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_..._or_sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_HOBBY_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_ULTRA_PRICE_ID=price_...

# AI Provider API Keys
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=...
ANTHROPIC_API_KEY=sk-ant-...

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Setup Supabase

1. Buat proyek baru di [Supabase](https://supabase.com)
2. Dapatkan URL dan API keys dari Settings > API
3. Enable Authentication providers:
   - Google OAuth
   - GitHub OAuth
   - Email (Magic Link)
4. Configure OAuth redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://your-domain.com/auth/callback` (production)

### 5. Setup Google OAuth

1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. Buat proyek baru atau pilih yang sudah ada
3. Enable Google+ API
4. Buat OAuth 2.0 credentials
5. Tambahkan authorized origins:
   - `http://localhost:3000` (development)
   - `https://your-domain.com` (production)
6. Tambahkan authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://your-domain.com/auth/callback` (production)
7. Copy Client ID ke environment variables

### 6. Setup GitHub OAuth

1. Buka [GitHub Developer Settings](https://github.com/settings/developers)
2. Buat OAuth App baru
3. Set Authorization callback URL:
   - `http://localhost:3000/auth/callback` (development)
   - `https://your-domain.com/auth/callback` (production)
4. Copy Client ID dan Client Secret ke Supabase

### 7. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🏗️ Struktur Proyek

```
ternary-premium-api/
├── components/           # React components
│   ├── AuthModal.tsx    # Modal autentikasi
│   ├── Navbar.tsx       # Navigation bar
│   ├── UserProfile.tsx  # Halaman profil pengguna
│   └── ...
├── pages/               # Next.js pages
│   ├── auth/
│   │   └── callback.tsx # OAuth callback handler
│   ├── profile.tsx      # Halaman profil
│   └── ...
├── src/
│   ├── contexts/        # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/            # Utility libraries
│   │   ├── supabase.ts
│   │   └── utils.ts
│   ├── styles/         # Global styles
│   │   └── globals.css
│   └── types/          # TypeScript types
│       └── global.d.ts
└── ...
```

## 🔐 Sistem Autentikasi

### Google One Tap

- Otomatis muncul untuk pengguna yang kembali
- Integrasi seamless dengan Google OAuth
- Fallback ke modal autentikasi manual

### OAuth Providers

- **Google OAuth**: Login dengan akun Google
- **GitHub OAuth**: Login dengan akun GitHub
- Redirect handling yang aman
- Session management otomatis

### Magic Link

- Autentikasi email tanpa password
- Link otomatis expire untuk keamanan
- Email template yang profesional

### User Profile

- Informasi profil lengkap
- Pengaturan aplikasi
- Manajemen tagihan
- Informasi keamanan

## 🎨 Design System

### Neumorphism

- Efek 3D yang modern
- Soft shadows dan highlights
- Konsisten di seluruh aplikasi

### Color Scheme

- Primary: `#7c3aed` (Purple)
- Background: Light/Dark mode
- Text: High contrast untuk accessibility

### Components

- Buttons dengan hover effects
- Input fields dengan focus states
- Modal dengan backdrop blur
- Responsive grid layouts

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Connect repository di Vercel
3. Add environment variables
4. Deploy

### Environment Variables untuk Production

```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## 📱 Responsive Design

Website dioptimalkan untuk:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Development Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Type checking
npx tsc --noEmit
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🆘 Support

Jika Anda mengalami masalah:

1. Cek dokumentasi di `ENVIRONMENT_SETUP.md`
2. Pastikan semua environment variables sudah benar
3. Verifikasi setup OAuth providers
4. Cek console browser untuk error messages

## 🔮 Roadmap

- [ ] Dashboard analytics
- [ ] Team collaboration features
- [ ] Advanced billing management
- [ ] API rate limiting
- [ ] Webhook integrations
- [ ] Mobile app
