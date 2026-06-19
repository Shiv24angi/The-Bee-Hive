-- Add missing columns to submissions table
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS "fileUrl" text;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS "avatarUrl" text;

-- Add missing columns to publications table
ALTER TABLE publications ADD COLUMN IF NOT EXISTS "fileName" text;
ALTER TABLE publications ADD COLUMN IF NOT EXISTS "fileUrl" text;
ALTER TABLE publications ADD COLUMN IF NOT EXISTS "avatarUrl" text;
ALTER TABLE publications ADD COLUMN IF NOT EXISTS "coverUrl" text;
ALTER TABLE publications ADD COLUMN IF NOT EXISTS "coverColor" text;
ALTER TABLE publications ADD COLUMN IF NOT EXISTS "readTime" text;

-- Add missing columns to archive table
ALTER TABLE archive ADD COLUMN IF NOT EXISTS "downloadCount" integer DEFAULT 0;
ALTER TABLE archive ADD COLUMN IF NOT EXISTS "coverColor" text;

-- Force PostgREST to reload its schema cache so the changes take effect immediately
NOTIFY pgrst, 'reload schema';
