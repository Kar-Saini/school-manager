-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'teacher', 'principal', 'administrator', 'admin', 'superAdmin');

-- CreateEnum
CREATE TYPE "ClassName" AS ENUM ('I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII');

-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('unitTest', 'classTest', 'midTerm', 'finalExam');

-- CreateTable
CREATE TABLE "StudentUser" (
    "id" TEXT NOT NULL,
    "role" "Role"[],
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fatherName" TEXT,
    "motherName" TEXT,
    "dob" TEXT,
    "address" TEXT,
    "bloodGroup" TEXT,
    "subjectIds" INTEGER[],
    "contactNumber" TEXT,
    "parentsContactNumber" TEXT NOT NULL,
    "rollNumber" TEXT NOT NULL,
    "hobbies" TEXT[],
    "section" TEXT NOT NULL,
    "classId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "TeacherUser" (
    "id" TEXT NOT NULL,
    "role" "Role"[],
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fatherName" TEXT,
    "motherName" TEXT,
    "dob" TEXT,
    "address" TEXT,
    "bloodGroup" TEXT,
    "subjectIds" INTEGER[],
    "section" TEXT NOT NULL,
    "contactNumber" TEXT,
    "parentsContactNumber" TEXT NOT NULL,
    "rollNumber" TEXT NOT NULL,
    "hobbies" TEXT[],
    "classId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "name" "ClassName" NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "subject" INTEGER NOT NULL,
    "examType" "ExamType" NOT NULL,
    "classId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentUser_id_key" ON "StudentUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentUser_email_key" ON "StudentUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherUser_id_key" ON "TeacherUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherUser_email_key" ON "TeacherUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_id_key" ON "Subject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Exam_id_key" ON "Exam"("id");

-- AddForeignKey
ALTER TABLE "StudentUser" ADD CONSTRAINT "StudentUser_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherUser" ADD CONSTRAINT "TeacherUser_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
