-- Create texts table
CREATE TABLE IF NOT EXISTS texts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name TEXT NOT NULL,
  field_key TEXT NOT NULL UNIQUE,
  field_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create images table (for static site images)
CREATE TABLE IF NOT EXISTS images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name TEXT NOT NULL,
  field_key TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create outdoor table
CREATE TABLE IF NOT EXISTS outdoor (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create night table
CREATE TABLE IF NOT EXISTS night (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE texts ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE outdoor ENABLE ROW LEVEL SECURITY;
ALTER TABLE night ENABLE ROW LEVEL SECURITY;

-- Create policies (Public Read, Admin Write)
-- Note: For simplicity in this setup, we'll allow public read. 
-- Writing requires authentication (which will be handled by Supabase Auth in the app).

-- Texts
CREATE POLICY "Public texts are viewable by everyone" ON texts
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own texts" ON texts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own texts" ON texts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Images
CREATE POLICY "Public images are viewable by everyone" ON images
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert images" ON images
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update images" ON images
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Gallery
CREATE POLICY "Public gallery is viewable by everyone" ON gallery
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert gallery" ON gallery
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery" ON gallery
  FOR DELETE USING (auth.role() = 'authenticated');

-- Outdoor
CREATE POLICY "Public outdoor is viewable by everyone" ON outdoor
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert outdoor" ON outdoor
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete outdoor" ON outdoor
  FOR DELETE USING (auth.role() = 'authenticated');

-- Night
CREATE POLICY "Public night is viewable by everyone" ON night
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert night" ON night
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete night" ON night
  FOR DELETE USING (auth.role() = 'authenticated');

-- Storage Buckets
-- Create buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;
-- Storage Policies for site-images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'site-images' );

CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'site-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'site-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'site-images' AND auth.role() = 'authenticated' );


-- Storage Policies for gallery-images
CREATE POLICY "Public Access Gallery"
ON storage.objects FOR SELECT
USING ( bucket_id = 'gallery-images' );

CREATE POLICY "Authenticated users can upload Gallery"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'gallery-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can update Gallery"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'gallery-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated users can delete Gallery"
ON storage.objects FOR DELETE
USING ( bucket_id = 'gallery-images' AND auth.role() = 'authenticated' );

-- Add metadata columns to gallery tables
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS alt TEXT;
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS category TEXT[];

ALTER TABLE outdoor ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE outdoor ADD COLUMN IF NOT EXISTS alt TEXT;
ALTER TABLE outdoor ADD COLUMN IF NOT EXISTS category TEXT[];

ALTER TABLE night ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE night ADD COLUMN IF NOT EXISTS alt TEXT;
ALTER TABLE night ADD COLUMN IF NOT EXISTS category TEXT[];

-- Team table
CREATE TABLE IF NOT EXISTS team (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE team ENABLE ROW LEVEL SECURITY;

-- Team Policies
CREATE POLICY "Public team members are viewable by everyone" ON team
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert team members" ON team
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update team members" ON team
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete team members" ON team
  FOR DELETE USING (auth.role() = 'authenticated');

