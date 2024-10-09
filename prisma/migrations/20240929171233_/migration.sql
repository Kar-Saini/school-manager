/*
  Warnings:

  - Added the required column `role` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'parent', 'admin');

-- AlterTable
ALTER TABLE "Parent" ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "role" "Role" NOT NULL;
