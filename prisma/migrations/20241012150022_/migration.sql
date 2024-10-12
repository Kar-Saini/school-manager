-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "admissionNumber" TEXT NOT NULL DEFAULT '100',
ADD COLUMN     "documentVerification" BOOLEAN NOT NULL DEFAULT false;
