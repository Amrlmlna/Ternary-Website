# 🚀 Quick Start Guide - Ternary Premium API

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## 🎯 5-Minute Setup

### 1. Clone & Install

```bash
git clone <repository-url>
cd ternary-premium-api
npm install
```

### 2. Setup Environment

```bash
npm run setup
```

### 3. Configure API Keys (Required)

Edit `.env.local` and add your API keys:

```env
# Supabase (Required for authentication)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Google OAuth (Required for Google One Tap)
NEXT_PUBLE_GOOGLE_CLIENT_ID=your_google_client_id

# Other keys can be added later
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Open Browser

Visit [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication Setup

### Supabase Setup

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > API
4. Copy URL and anon key to `.env.local`
5. Enable Auth providers: Google, GitHub, Email

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins: `http://localhost:3000`
6. Add redirect URIs: `http://localhost:3000/auth/callback`
7. Copy Client ID to `.env.local`

## 🎨 Features Available

### ✅ Ready to Use

- **Google One Tap Authentication** - Seamless sign-in
- **OAuth Providers** - Google & GitHub login
- **Magic Link** - Passwordless email authentication
- **Modern UI** - Neumorphism design with dark/light mode
- **Responsive Design** - Works on all devices
- **User Profile** - Complete user management
- **Toast Notifications** - User feedback system
- **PWA Support** - Install as app
- **Accessibility** - Screen reader & keyboard navigation
- **Internationalization** - Multi-language support

### 🔧 Development Features

- **TypeScript** - Full type safety
- **Hot Reload** - Instant development feedback
- **Error Boundaries** - Graceful error handling
- **Performance Monitoring** - Built-in analytics
- **Testing Setup** - Jest & React Testing Library
- **Docker Support** - Containerized development

## 🚨 Troubleshooting

### Common Issues

**"supabaseUrl is required"**

- Check `.env.local` has correct Supabase URL
- Ensure no extra spaces in environment variables

**"Google One Tap not working"**

- Verify Google Client ID is correct
- Check authorized origins in Google Console

**"Authentication not working"**

- Verify Supabase Auth providers are enabled
- Check redirect URLs match exactly

**"Build errors"**

- Run `npm install` to ensure all dependencies
- Check TypeScript errors with `npx tsc --noEmit`

### Getting Help

1. Check the full [README.md](README.md)
2. Review [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md)
3. Check browser console for errors
4. Verify all environment variables are set

## 🎉 Success!

Once running, you'll see:

- Modern landing page with neumorphism design
- Working authentication modal
- Google One Tap integration
- Responsive navigation
- Dark/light mode toggle
- Language selector

## 📚 Next Steps

1. **Customize Content** - Update text and branding
2. **Add Payment** - Configure Stripe for subscriptions
3. **Deploy** - Deploy to Vercel, Netlify, or your preferred platform
4. **Add Features** - Extend with additional functionality

---

**Need help?** Check the full documentation in [README.md](README.md) or [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md)
