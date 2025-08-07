-- Create a public storage bucket for offer images
insert into storage.buckets (id, name, public)
values ('offers', 'offers', true)
on conflict (id) do nothing;

-- Allow public read access to offer images (idempotent)
DO $$
BEGIN
  CREATE POLICY "Public read for offer images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'offers');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Allow mentors/admins to manage offer images (idempotent)
DO $$
BEGIN
  CREATE POLICY "Mentors can manage offer images"
  ON storage.objects
  FOR ALL
  USING (
    bucket_id = 'offers'
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin','mentor')
    )
  )
  WITH CHECK (
    bucket_id = 'offers'
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin','mentor')
    )
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
