create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  name text not null unique,
  slug text not null unique
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  image_url text,
  published boolean not null default true,
  author_id uuid not null references public.profiles(id) on delete cascade
);

alter table public.posts
  add column if not exists category_id uuid references public.categories(id) on delete set null;

create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists posts_author_id_idx on public.posts (author_id);
create index if not exists posts_published_idx on public.posts (published);
create index if not exists posts_category_id_idx on public.posts (category_id);
create index if not exists categories_slug_idx on public.categories (slug);

insert into public.categories (name, slug)
values
  ('Politics', 'politics'),
  ('Education', 'education'),
  ('Culture', 'culture'),
  ('Business', 'business'),
  ('Environment', 'environment'),
  ('Community', 'community')
on conflict (slug) do nothing;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.categories enable row level security;

drop policy if exists "Profiles are publicly readable" on public.profiles;
create policy "Profiles are publicly readable" on public.profiles for select using (true);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile" on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "Categories are publicly readable" on public.categories;
create policy "Categories are publicly readable" on public.categories
for select using (true);

drop policy if exists "Published posts are publicly readable" on public.posts;
create policy "Published posts are publicly readable" on public.posts
for select using (published = true);

drop policy if exists "Authors can read their own posts" on public.posts;
create policy "Authors can read their own posts" on public.posts
for select using (author_id = auth.uid());

drop policy if exists "Authors can insert their own posts" on public.posts;
create policy "Authors can insert their own posts" on public.posts
for insert with check (author_id = auth.uid());

drop policy if exists "Authors can update their own posts" on public.posts;
create policy "Authors can update their own posts" on public.posts
for update using (author_id = auth.uid()) with check (author_id = auth.uid());

drop policy if exists "Authors can delete their own posts" on public.posts;
create policy "Authors can delete their own posts" on public.posts
for delete using (author_id = auth.uid());

insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read post images" on storage.objects;
create policy "Public can read post images" on storage.objects
for select using (bucket_id = 'post-images');

drop policy if exists "Authenticated users can upload post images" on storage.objects;
create policy "Authenticated users can upload post images" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'post-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

drop policy if exists "Authenticated users can delete post images" on storage.objects;
create policy "Authenticated users can delete post images" on storage.objects
for delete to authenticated
using (
  bucket_id = 'post-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);
