import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// create new transaction
export async function POST(req: Request) {
  const { firstName, lastName, email } = await req.json();

  try {
    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("[CREATE USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = await db.user.findFirst({ where: { firstName: "Eric" } });
    return NextResponse.json(user);
  } catch (error) {
    console.log("[GET_USER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
