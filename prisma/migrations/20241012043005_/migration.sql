/*
  Warnings:

  - You are about to drop the column `studentId` on the `Parent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeNum]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "studentId";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "photo" TEXT,
ADD COLUMN     "rollNo" TEXT NOT NULL DEFAULT '10';

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "employeeNum" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_employeeNum_key" ON "Teacher"("employeeNum");
