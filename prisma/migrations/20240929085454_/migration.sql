/*
  Warnings:

  - Added the required column `email` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Parent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parent" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL,
ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "username" TEXT;
