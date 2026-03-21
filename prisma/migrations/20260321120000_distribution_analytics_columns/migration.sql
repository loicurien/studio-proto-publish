-- Distribution analytics columns (Ayrshare). Safe if some columns already exist (PostgreSQL 11+).

ALTER TABLE "Distribution" ADD COLUMN IF NOT EXISTS "viewCount" INTEGER;
ALTER TABLE "Distribution" ADD COLUMN IF NOT EXISTS "likeCount" INTEGER;
ALTER TABLE "Distribution" ADD COLUMN IF NOT EXISTS "shareCount" INTEGER;
ALTER TABLE "Distribution" ADD COLUMN IF NOT EXISTS "commentCount" INTEGER;
