#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🚀 Setting up Ternary Premium API...\n");

// Check if .env.local exists
const envPath = path.join(__dirname, ".env.local");
const envExamplePath = path.join(__dirname, "env.example");

if (!fs.existsSync(envPath)) {
  console.log("📝 Creating .env.local file from template...");

  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log("✅ .env.local created successfully!");
    console.log(
      "⚠️  Please update .env.local with your actual API keys and configuration."
    );
  } else {
    console.log("❌ env.example not found. Creating basic .env.local...");

    const basicEnv = `# Supabase Configuration
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
`;

    fs.writeFileSync(envPath, basicEnv);
    console.log("✅ Basic .env.local created successfully!");
  }
} else {
  console.log("✅ .env.local already exists!");
}

console.log("\n📋 Next steps:");
console.log("1. Update .env.local with your actual API keys");
console.log('2. Run "npm run dev" to start the development server');
console.log("3. Open http://localhost:3000 in your browser");
console.log("\n📚 For detailed setup instructions, see README.md");

console.log("\n�� Setup complete!");
