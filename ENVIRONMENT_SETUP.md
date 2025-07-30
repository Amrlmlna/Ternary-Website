# Environment Variables Setup

## Required Environment Variables

### Supabase Configuration

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Google OAuth Configuration

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### Stripe Configuration

```env
STRIPE_SECRET_KEY=sk_test_..._or_sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_HOBBY_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_ULTRA_PRICE_ID=price_...
```

### AI Provider API Keys

```env
# OpenAI (for GPT models)
OPENAI_API_KEY=sk-...

# Google (for Gemini models)
GOOGLE_API_KEY=...

# Anthropic (for Claude models)
ANTHROPIC_API_KEY=sk-ant-...
```

### App Configuration

```env
NEXT_PUBLIC_BASE_URL=https://ternary-premium-x2m1.vercel.app
```

## Setup Instructions

1. **Create Supabase Project**

   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Copy project URL and anon key
   - Enable Authentication providers:
     - Google OAuth
     - GitHub OAuth
     - Email (Magic Link)
   - Configure OAuth redirect URLs:
     - `https://your-domain.com/auth/callback`
     - `http://localhost:3000/auth/callback` (for development)

2. **Setup Google OAuth**

   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized origins:
     - `https://your-domain.com`
     - `http://localhost:3000` (for development)
   - Add authorized redirect URIs:
     - `https://your-domain.com/auth/callback`
     - `http://localhost:3000/auth/callback` (for development)
   - Copy Client ID to environment variables

3. **Setup GitHub OAuth**

   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create new OAuth App
   - Set Authorization callback URL:
     - `https://your-domain.com/auth/callback`
     - `http://localhost:3000/auth/callback` (for development)
   - Copy Client ID and Client Secret to Supabase

4. **Setup Stripe**

   - Create Stripe account
   - Create products and prices for each plan (Hobby, Pro, Ultra)
   - Copy price IDs to environment variables
   - Setup webhook endpoint: `https://your-domain.com/api/stripe-webhook`

5. **Get AI Provider API Keys**

   - OpenAI: [platform.openai.com](https://platform.openai.com)
   - Google: [makersuite.google.com](https://makersuite.google.com)
   - Anthropic: [console.anthropic.com](https://console.anthropic.com)

6. **Deploy to Vercel**
   - Connect GitHub repository
   - Add all environment variables
   - Deploy

## Database Migration

Run the migration to create required tables:

```bash
supabase db push
```

## Authentication Flow

The application supports multiple authentication methods:

1. **Google One Tap**: Automatic sign-in prompt for returning users
2. **OAuth Providers**: Google and GitHub OAuth
3. **Magic Link**: Email-based authentication without passwords

### Authentication Features

- Seamless OAuth integration with Google and GitHub
- Email magic link authentication
- Google One Tap for returning users
- Automatic session management
- User profile management
- Secure token handling

## Testing

Test the endpoints:

```bash
# Test user info
curl -H "Authorization: Bearer tnr_test_key" \
  https://your-domain.com/api/user/info

# Test chat completions
curl -X POST https://your-domain.com/api/v1/chat/completions \
  -H "Authorization: Bearer tnr_test_key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-2.5-pro",
    "messages": [{"role": "user", "content": "Hello"}],
    "ternary_options": {
      "enable_lazy_edits": false,
      "enable_smart_files_context": false
    }
  }'
```

## Security Considerations

- All OAuth redirects use HTTPS in production
- Environment variables are properly secured
- User sessions are managed securely through Supabase
- API keys are stored securely and not exposed to client
- Magic links expire automatically for security
