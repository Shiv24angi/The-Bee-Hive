-- Create publications table
CREATE TABLE IF NOT EXISTS publications (
  id text PRIMARY KEY,
  title text,
  author text,
  grade text,
  date text,
  category text,
  excerpt text,
  content text,
  "fileName" text,
  "fileUrl" text,
  "avatarUrl" text,
  "coverUrl" text,
  "coverColor" text,
  "readTime" text,
  likes integer DEFAULT 0,
  comments jsonb DEFAULT '[]'::jsonb
);

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id text PRIMARY KEY,
  name text,
  grade text,
  email text,
  category text,
  title text,
  "avatarUrl" text,
  content text,
  "fileName" text,
  "fileUrl" text,
  date text,
  status text
);

-- Create archive table
CREATE TABLE IF NOT EXISTS archive (
  id text PRIMARY KEY,
  year integer,
  edition text,
  description text,
  "downloadCount" integer DEFAULT 0,
  "coverColor" text
);

-- Enable Row Level Security
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE archive ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (since the app uses the Anon key)
CREATE POLICY "Allow public all access on publications" ON publications FOR ALL USING (true);
CREATE POLICY "Allow public all access on submissions" ON submissions FOR ALL USING (true);
CREATE POLICY "Allow public all access on archive" ON archive FOR ALL USING (true);
