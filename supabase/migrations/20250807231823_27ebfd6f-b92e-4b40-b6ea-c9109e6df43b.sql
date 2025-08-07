-- Create a public storage bucket for offer images
insert into storage.buckets (id, name, public)
values ('offers', 'offers', true)
on conflict (id) do nothing;

-- Allow public read access to offer images
create policy if not exists "Public read for offer images"
on storage.objects
for select
using (bucket_id = 'offers');

-- Allow mentors/admins to manage offer images
create policy if not exists "Mentors can manage offer images"
on storage.objects
for all
using (
  bucket_id = 'offers'
  and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin','mentor')
  )
)
with check (
  bucket_id = 'offers'
  and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin','mentor')
  )
);
