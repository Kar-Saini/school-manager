import { NextRequest, NextResponse } from "next/server";
import primsa from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    const checkIfStudentExist = await primsa.student.findUnique({
      where: { email: body.email },
    });
    if (checkIfStudentExist?.id) {
      return NextResponse.json({ message: "Email ID exists", status: 500 });
    }
    const hasehdPassword = await bcrypt.hash(body.password, 10);
    const studentDetails = { ...body, password: hasehdPassword };
    const newStudent = await primsa.student.create({ data: studentDetails });
    console.log(newStudent);
    if (newStudent) {
      return NextResponse.json({
        messgae: "Student added",
        id: newStudent.id,
        name: newStudent.name,
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
