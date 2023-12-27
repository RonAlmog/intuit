import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const count = await db.invoice.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo.toISOString(),
        },
      },
    });
    return NextResponse.json(count);
  } catch (error) {
    console.log("[GET_INVOICE_COUNT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
