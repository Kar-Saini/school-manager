"use server";

import prisma from "@/app/libs/prismadb";
interface StudentFilterData {
  name?: string;
  classLabel?: string;
  sex?: "Male" | "Female";
}

export async function getStudentByFilter(data: StudentFilterData) {
  const { name, classLabel, sex } = data;
  try {
    if (name != "") {
      if (classLabel !== "") {
        const existingClass = await prisma.class.findFirst({
          where: { label: classLabel },
        });
        const students = await prisma.student.findMany({
          where: {
            name: name,
            classId: existingClass?.id,
            sex,
          },
        });
        if (students) {
          return {
            message: "Fetched successfully",
            students,
            status: 200,
          };
        }
      }
      const students = await prisma.student.findMany({
        where: { name: name, sex },
      });
      if (students) {
        return {
          message: "Fetched successfully",
          students,
          status: 200,
        };
      }
      return { message: "No results found", status: 200 };
    }
  } catch (error) {
    return { message: "Invalid", status: 500 };
  }
}
