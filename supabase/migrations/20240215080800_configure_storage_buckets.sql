-- Migration: Configure Supabase Storage buckets
-- Description: Create storage buckets for media assets
-- Date: 2024-02-15

-- Insert storage buckets
-- Note: This requires Supabase Storage to be enabled
-- Buckets are managed through storage.buckets table

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types, created_at, updated_at)
VALUES 
(
  'blog-covers',
  'blog-covers',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types, created_at, updated_at)
VALUES 
(
  'news-covers',
  'news-covers',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types, created_at, updated_at)
VALUES 
(
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types, created_at, updated_at)
VALUES 
(
  'media',
  'media',
  true,
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'video/mp4', 'video/webm'],
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types, created_at, updated_at)
VALUES 
(
  'documents',
  'documents',
  true,
  104857600, -- 100MB
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STORAGE POLICIES
-- ============================================================================

-- Blog covers: Public read, authenticated upload
CREATE POLICY "Public can view blog covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-covers');

CREATE POLICY "Authenticated users can upload blog covers"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-covers' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete own blog covers"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-covers' AND auth.uid()::text = (storage.foldername(name))[1]);

-- News covers: Public read, authenticated upload
CREATE POLICY "Public can view news covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-covers');

CREATE POLICY "Authenticated users can upload news covers"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'news-covers' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete own news covers"
ON storage.objects FOR DELETE
USING (bucket_id = 'news-covers' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Avatars: Public read, authenticated upload
CREATE POLICY "Public can view avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete own avatars"
ON storage.objects FOR DELETE
USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Media: Public read, authenticated upload
CREATE POLICY "Public can view media"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete own media"
ON storage.objects FOR DELETE
USING (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Documents: Public read, authenticated upload
CREATE POLICY "Public can view documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents');

CREATE POLICY "Authenticated users can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete own documents"
ON storage.objects FOR DELETE
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

