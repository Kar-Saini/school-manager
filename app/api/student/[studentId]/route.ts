import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const studentId = pathname.split("/").pop();
  console.log("studentId: ", studentId);

  if (!studentId) {
    return NextResponse.json(
      { message: "Missing student ID" },
      { status: 400 }
    );
  }

  try {
    const studentData = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        class: true,
        exams: true,
        parent: true,
        subjects: true,
        teachers: true,
      },
    });

    if (!studentData) {
      return NextResponse.json(
        { message: "Invalid Student Id" },
        { status: 404 }
      );
    }

    return NextResponse.json(studentData);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data", error },
      { status: 500 }
    );
  }
}
