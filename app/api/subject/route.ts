import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  const newSubject = await prisma.subject.create({
    data: { label: body.subjectName, class: body.classValue },
  });
  return NextResponse.json({ message: "Received" });
}
