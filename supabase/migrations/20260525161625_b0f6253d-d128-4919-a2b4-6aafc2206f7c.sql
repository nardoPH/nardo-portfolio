
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  tags text[] not null default '{}',
  images text[] not null default '{}',
  github_url text,
  demo_url text,
  featured boolean not null default false,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Projects are viewable by everyone"
  on public.projects for select
  using (true);

create policy "Admins can insert projects"
  on public.projects for insert
  to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update projects"
  on public.projects for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete projects"
  on public.projects for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
create or replace function public.tg_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.tg_set_updated_at();

-- Storage bucket
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true);

create policy "Project images are publicly viewable"
  on storage.objects for select
  using (bucket_id = 'project-images');

create policy "Admins can upload project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can update project images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));

-- Seed sample projects
insert into public.projects (title, description, tags, images, github_url, demo_url, featured, display_order) values
('Aurora Analytics', 'A real-time analytics dashboard for high-volume event streams. Built with edge functions, materialized views, and a custom charting layer.', array['React','TypeScript','PostgreSQL','D3'], array[]::text[], 'https://github.com', 'https://example.com', true, 1),
('Field Notes', 'A distraction-free writing app with offline-first sync and a focus on typography. Designed for long-form thinkers.', array['Next.js','IndexedDB','Tailwind'], array[]::text[], 'https://github.com', 'https://example.com', true, 2),
('Atlas Routes', 'A travel route planner that turns saved locations into optimized multi-stop itineraries with map previews.', array['React','Mapbox','Node'], array[]::text[], 'https://github.com', null, false, 3);
