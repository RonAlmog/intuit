import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// create new transaction
export async function POST(req: Request) {
  const { userId, description, amount, reference } = await req.json();

  try {
    const tran = await db.transaction.create({
      data: {
        userId,
        description,
        amount,
        reference,
      },
    });
    return NextResponse.json(tran);
  } catch (error) {
    console.log("[CREATE TRANSACTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// get all transaction
export async function GET(req: Request) {
  try {
    const trans = await db.transaction.findMany({});
    return NextResponse.json(trans);
  } catch (error) {
    console.log("[GET_TRANSACTIONS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
