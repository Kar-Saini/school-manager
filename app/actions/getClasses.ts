"use server";
import prisma from "../../app/libs/prismadb";

export default async function getClasses() {
  try {
    const classesArray = await prisma.class.findMany();
    return classesArray;
  } catch (error) {
    console.error("Error fetching classes:", error);
    return [];
  }
}
