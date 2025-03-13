-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "demoContent" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "documentation" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "supportInfo" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "techSpecs" JSONB NOT NULL DEFAULT '{}';
