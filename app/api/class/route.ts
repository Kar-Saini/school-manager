import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const classExist = await prisma.class.findFirst({
    where: { label: body.label },
  });
  if (classExist) {
    return NextResponse.json({
      message: "Class already exists",
      classId: classExist.id,
    });
  }
  const newClass = await prisma.class.create({ data: { label: body.label } });
  return NextResponse.json({ message: "Class added", classId: newClass.id });
}

export async function GET() {
  try {
    const classesArray = await prisma.class.findMany();
    if (classesArray) {
      return NextResponse.json({ message: "Success", classesArray });
    }
  } catch (error) {
    throw new Error("Invalide call" + error);
  }
}
