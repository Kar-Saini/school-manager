import { NextRequest, NextResponse } from "next/server";
import primsa from "@/app/libs/prismadb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const checkIfParentExist = await primsa.parent.findUnique({
      where: { email: body.email },
    });

    console.log(body);
    if (checkIfParentExist?.id) {
      return NextResponse.json({ message: "Email ID exists", status: 500 });
    }
    const newParent = await primsa.parent.create({ data: body });
    console.log(newParent);
    if (newParent) {
      return NextResponse.json({
        messgae: "Parent added",
        id: newParent.id,
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
