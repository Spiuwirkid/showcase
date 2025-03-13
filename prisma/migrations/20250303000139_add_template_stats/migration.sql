-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "downloads" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "previewLink" TEXT,
ADD COLUMN     "reviews" INTEGER NOT NULL DEFAULT 0;
