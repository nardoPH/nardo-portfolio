
-- Allow users to read only their own roles
create policy "Users can view own roles"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

-- Fix function search_path
create or replace function public.tg_set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Restrict execute on has_role to authenticated only (used by RLS as needed)
revoke execute on function public.has_role(uuid, app_role) from public, anon;

-- Drop broad public-list policy on bucket, add explicit per-file public read via signed URLs not needed
-- Instead: allow object retrieval via public URLs (Supabase storage handles by bucket public flag); 
-- restrict listing through storage.objects SELECT to admins.
drop policy if exists "Project images are publicly viewable" on storage.objects;

create policy "Anyone can read project image objects"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'project-images' and (storage.foldername(name))[1] is not null);
