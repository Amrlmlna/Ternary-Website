create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  api_key text unique not null,
  spend integer not null default 0,
  max_budget integer not null default 1000,
  budget_reset_at timestamptz not null default now() + interval '30 days',
  email text,
  plan text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Optional: Index untuk pencarian API key lebih cepat
create index if not exists idx_users_api_key on users(api_key);

-- Enable Row Level Security
alter table users enable row level security;

-- Policy: Allow all insert (for testing/dev)
create policy "Allow all insert" on users for insert with check (true);
-- Policy: Allow all select (for testing/dev)
create policy "Allow all select" on users for select using (true);

-- Add usage tracking table
create table if not exists usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  api_key text not null,
  endpoint text not null,
  model text not null,
  tokens_used integer not null,
  cost real not null,
  features_used jsonb,
  request_id text,
  response_time_ms integer,
  created_at timestamptz not null default now()
);

-- Index for usage analytics
create index if not exists idx_usage_logs_user_id on usage_logs(user_id);
create index if not exists idx_usage_logs_created_at on usage_logs(created_at);

-- Function to reset budget monthly
create or replace function reset_monthly_budget()
returns void as $$
begin
  update users 
  set 
    spend = 0,
    budget_reset_at = now() + interval '30 days',
    updated_at = now()
  where budget_reset_at <= now();
end;
$$ language plpgsql;

-- Create a cron job to reset budget (requires pg_cron extension)
-- select cron.schedule('reset-monthly-budget', '0 0 1 * *', 'select reset_monthly_budget();');