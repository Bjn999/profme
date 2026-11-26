-- Profile types enum
create type public.profile_type as enum ('student', 'employee', 'freelancer', 'company');

-- Profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text not null,
  account_type public.profile_type not null default 'student',
  headline text,
  bio text,
  avatar_url text,
  cover_url text,
  template_key text not null default 'modern',
  location text,
  website_url text,
  social_links jsonb not null default '{}'::jsonb,
  custom_sections jsonb not null default '[]'::jsonb,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (is_published = true or auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Contact messages table
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Anyone can submit a contact message"
  on public.contact_messages for insert
  with check (true);

-- Trigger to automatically create profile with a random slug on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  v_account_type public.profile_type;
  v_slug text;
begin
  v_account_type := coalesce(
    (new.raw_user_meta_data ->> 'account_type')::public.profile_type,
    'student'::public.profile_type
  );

  v_slug := substr(md5(gen_random_uuid()::text || new.id::text), 1, 8);

  insert into public.profiles (id, username, full_name, account_type)
  values (
    new.id,
    v_slug,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'مستخدم جديد'),
    v_account_type
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
