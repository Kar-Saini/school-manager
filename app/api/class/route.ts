import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const classExist = await prisma.class.findFirst({
      where: { label: body.label },
    });

    if (classExist) {
      return NextResponse.json(
        { message: "Class already exists", classId: classExist.id },
        { status: 400 }
      );
    }

    const newClass = await prisma.class.create({
      data: { label: body.label },
    });

    return NextResponse.json(
      { message: "Class added", classId: newClass.id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding class", error: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const classesArray = await prisma.class.findMany();

    return NextResponse.json(
      { message: "Success", classesArray },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching classes", error: error },
      { status: 500 }
    );
  }
}
