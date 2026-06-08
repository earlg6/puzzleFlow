create extension if not exists "pgcrypto";

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  city text,
  country text,
  early_access boolean not null default true,
  created_at timestamp with time zone not null default now()
);

create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  frequency text not null,
  owned_puzzles text not null,
  subscription_interest text not null,
  created_at timestamp with time zone not null default now()
);

alter table public.waitlist enable row level security;
alter table public.survey_responses enable row level security;

create policy "Allow public waitlist inserts"
  on public.waitlist
  for insert
  to anon
  with check (true);

create policy "Allow public survey inserts"
  on public.survey_responses
  for insert
  to anon
  with check (true);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
create index if not exists survey_responses_created_at_idx on public.survey_responses (created_at desc);
