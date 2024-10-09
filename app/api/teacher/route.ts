import { NextRequest, NextResponse } from "next/server";
import primsa from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Hi");
    const checkIfTeacherExist = await primsa.teacher.findUnique({
      where: { email: body.email },
    });
    console.log(body);
    if (checkIfTeacherExist?.id) {
      return NextResponse.json({ message: "Email ID exists", status: 500 });
    }
    const hasehdPassword = await bcrypt.hash(body.password, 10);
    const teacherDetails = { ...body, password: hasehdPassword };
    console.log(teacherDetails);
    const newTeacher = await prisma.teacher.create({ data: teacherDetails });
    console.log("created");
    console.log(newTeacher);
    if (newTeacher) {
      return NextResponse.json({
        messgae: "Teacher added",
        id: newTeacher.id,
        name: newTeacher.name,
      });
    }
    return NextResponse.json({ message: "Failed" });
  } catch (error) {
    return NextResponse.json({
      messgae: "Invalid Credentials",
      status: 500,
      error,
    });
  }
}
