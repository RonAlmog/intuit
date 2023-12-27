import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await db.transaction.deleteMany({});
    await db.invoice.deleteMany({});
    await db.user.deleteMany({});

    return NextResponse.json("ok");
  } catch (error) {
    console.log("[RESET_DB]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
