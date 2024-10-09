/*
  Warnings:

  - The values [midTerm,finalExam] on the enum `ExamType` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `parentOccupation` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `parentsContactNumber` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the `StudentUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teacherId` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Made the column `fatherName` on table `Parent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motherName` on table `Parent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `annualIncome` on table `Parent` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `lable` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExamType_new" AS ENUM ('unitTest', 'classTest', 'midSemester', 'endSemester');
ALTER TABLE "Exam" ALTER COLUMN "examType" TYPE "ExamType_new" USING ("examType"::text::"ExamType_new");
ALTER TYPE "ExamType" RENAME TO "ExamType_old";
ALTER TYPE "ExamType_new" RENAME TO "ExamType";
DROP TYPE "ExamType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_classId_fkey";

-- DropForeignKey
ALTER TABLE "StudentUser" DROP CONSTRAINT "StudentUser_classId_fkey";

-- DropForeignKey
ALTER TABLE "StudentUser" DROP CONSTRAINT "StudentUser_id_fkey";

-- DropForeignKey
ALTER TABLE "TeacherUser" DROP CONSTRAINT "TeacherUser_classId_fkey";

-- DropIndex
DROP INDEX "Class_name_key";

-- DropIndex
DROP INDEX "Exam_id_key";

-- DropIndex
DROP INDEX "Subject_id_key";

-- DropIndex
DROP INDEX "Subject_name_key";

-- AlterTable
ALTER TABLE "Class" DROP CONSTRAINT "Class_pkey",
DROP COLUMN "name",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Class_id_seq";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "createdAt",
DROP COLUMN "subject",
ADD COLUMN     "teacherId" TEXT NOT NULL,
ALTER COLUMN "classId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Exam_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "parentOccupation",
DROP COLUMN "parentsContactNumber",
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "studentId" TEXT NOT NULL,
ALTER COLUMN "fatherName" SET NOT NULL,
ALTER COLUMN "motherName" SET NOT NULL,
ALTER COLUMN "annualIncome" SET NOT NULL;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "label",
DROP COLUMN "name",
ADD COLUMN     "lable" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Subject_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Subject_id_seq";

-- DropTable
DROP TABLE "StudentUser";

-- DropTable
DROP TABLE "TeacherUser";

-- DropEnum
DROP TYPE "ClassName";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "dob" TEXT NOT NULL,
    "admissionDate" TEXT NOT NULL,
    "bloodGroup" TEXT,
    "parentId" TEXT,
    "classId" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "joiningDate" TEXT,
    "bloodGroup" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StudentToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_StudentToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SubjectToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClassToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ExamToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentToTeacher_AB_unique" ON "_StudentToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentToTeacher_B_index" ON "_StudentToTeacher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentToSubject_AB_unique" ON "_StudentToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentToSubject_B_index" ON "_StudentToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectToTeacher_AB_unique" ON "_SubjectToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectToTeacher_B_index" ON "_SubjectToTeacher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToTeacher_AB_unique" ON "_ClassToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToTeacher_B_index" ON "_ClassToTeacher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExamToStudent_AB_unique" ON "_ExamToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_ExamToStudent_B_index" ON "_ExamToStudent"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToTeacher" ADD CONSTRAINT "_StudentToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToTeacher" ADD CONSTRAINT "_StudentToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToSubject" ADD CONSTRAINT "_StudentToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToSubject" ADD CONSTRAINT "_StudentToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTeacher" ADD CONSTRAINT "_SubjectToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTeacher" ADD CONSTRAINT "_SubjectToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToTeacher" ADD CONSTRAINT "_ClassToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToTeacher" ADD CONSTRAINT "_ClassToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamToStudent" ADD CONSTRAINT "_ExamToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamToStudent" ADD CONSTRAINT "_ExamToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
