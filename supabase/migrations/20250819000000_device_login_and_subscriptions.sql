-- Device login flow tables
create table if not exists device_codes (
  id uuid primary key default gen_random_uuid(),
  device_code text unique not null,
  user_code text unique not null,
  verification_uri text not null default 'https://ternary.studio/auth/device',
  expires_at timestamptz not null,
  interval_seconds integer not null default 5,
  user_id uuid references auth.users(id) on delete cascade,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

-- Index for device codes
create index if not exists idx_device_codes_device_code on device_codes(device_code);
create index if not exists idx_device_codes_user_code on device_codes(user_code);
create index if not exists idx_device_codes_expires_at on device_codes(expires_at);

-- Subscriptions table for Pro/Plus plans
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  stripe_subscription_id text unique,
  stripe_customer_id text,
  plan text not null check (plan in ('free', 'pro', 'plus')),
  status text not null check (status in ('active', 'past_due', 'canceled', 'incomplete', 'trialing')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for subscriptions
create index if not exists idx_subscriptions_user_id on subscriptions(user_id);
create index if not exists idx_subscriptions_stripe_subscription_id on subscriptions(stripe_subscription_id);
create index if not exists idx_subscriptions_status on subscriptions(status);

-- User profiles extended with entitlements
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table device_codes enable row level security;
alter table subscriptions enable row level security;
alter table profiles enable row level security;

-- Policies for device_codes (allow all for device flow)
create policy "Allow all operations on device_codes" on device_codes for all using (true);

-- Policies for subscriptions (users can only see their own)
create policy "Users can view own subscriptions" on subscriptions 
  for select using (auth.uid() = user_id);
create policy "Service role can manage subscriptions" on subscriptions 
  for all using (auth.role() = 'service_role');

-- Policies for profiles (users can view/update their own)
create policy "Users can view own profile" on profiles 
  for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles 
  for update using (auth.uid() = id);
create policy "Service role can manage profiles" on profiles 
  for all using (auth.role() = 'service_role');

-- Function to get user entitlements
create or replace function get_user_entitlements(user_uuid uuid)
returns jsonb as $$
declare
  subscription_record record;
  features text[];
  result jsonb;
begin
  -- Get active subscription
  select * into subscription_record
  from subscriptions 
  where user_id = user_uuid 
    and status in ('active', 'trialing')
  order by created_at desc
  limit 1;
  
  -- Default to free plan
  if subscription_record is null then
    result := jsonb_build_object(
      'plan', 'free',
      'status', 'active',
      'features', '[]'::jsonb,
      'limits', jsonb_build_object(
        'monthlyTokens', 10000,
        'workflows', 3
      )
    );
  else
    -- Determine features based on plan
    case subscription_record.plan
      when 'pro' then
        features := array['branded_model', 'figma_import', 'premium_templates'];
      when 'plus' then
        features := array['branded_model', 'figma_import', 'premium_templates', 'priority_support', 'team_collaboration'];
      else
        features := array[]::text[];
    end case;
    
    result := jsonb_build_object(
      'plan', subscription_record.plan,
      'status', subscription_record.status,
      'features', to_jsonb(features),
      'validUntil', subscription_record.current_period_end,
      'limits', case 
        when subscription_record.plan = 'pro' then
          jsonb_build_object('monthlyTokens', 100000, 'workflows', 50)
        when subscription_record.plan = 'plus' then
          jsonb_build_object('monthlyTokens', 500000, 'workflows', 200)
        else
          jsonb_build_object('monthlyTokens', 10000, 'workflows', 3)
      end
    );
  end if;
  
  return result;
end;
$$ language plpgsql security definer;

-- Function to cleanup expired device codes
create or replace function cleanup_expired_device_codes()
returns void as $$
begin
  delete from device_codes where expires_at < now();
end;
$$ language plpgsql;
