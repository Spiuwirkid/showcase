-- CreateTable
CREATE TABLE "HeroSettings" (
    "id" TEXT NOT NULL,
    "showcaseImage" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "headingLine1" TEXT NOT NULL,
    "headingLine2" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "primaryButtonText" TEXT NOT NULL,
    "secondaryButtonText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroSettings_pkey" PRIMARY KEY ("id")
);
