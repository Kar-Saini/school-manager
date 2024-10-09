import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";
import { NextApiResponse } from "next";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    const getClass = await prisma.class.findFirst({
      where: { label: body.classValue },
    });
    if (!getClass) {
      return NextResponse.json({ message: "Class not found" });
    }
    console.log(getClass);
    const newSubject = await prisma.subject.create({
      data: { label: body.subjectName, classId: getClass?.id },
    });
    console.log(newSubject);
    return NextResponse.json({
      message: "Subject added",
      subjectId: newSubject.id,
    });
  } catch (error) {
    return NextResponse.json({ message: "Invalid inputs", err: error });
  }
}

export async function GET(res: NextApiResponse) {
  try {
    const subjects = await prisma.subject.findMany({
      include: { class: true },
    });
    return NextResponse.json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch subjects" });
  }
}
