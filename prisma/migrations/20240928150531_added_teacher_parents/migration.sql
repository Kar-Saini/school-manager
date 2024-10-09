/*
  Warnings:

  - You are about to drop the column `fatherName` on the `StudentUser` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `StudentUser` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `TeacherUser` table. All the data in the column will be lost.
  - You are about to drop the column `parentsContactNumber` on the `TeacherUser` table. All the data in the column will be lost.
  - Added the required column `admissionDate` to the `StudentUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joiningDate` to the `TeacherUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentUser" DROP COLUMN "fatherName",
DROP COLUMN "motherName",
ADD COLUMN     "admissionDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TeacherUser" DROP COLUMN "address",
DROP COLUMN "parentsContactNumber",
ADD COLUMN     "joiningDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL,
    "fatherName" TEXT,
    "motherName" TEXT,
    "parentsContactNumber" TEXT NOT NULL,
    "parentOccupation" TEXT[],
    "annualIncome" TEXT,
    "address" TEXT NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentUser" ADD CONSTRAINT "StudentUser_id_fkey" FOREIGN KEY ("id") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
