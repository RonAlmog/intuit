import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// validate invoice:
// 1. reference needs to be equal
// 2. amount needs to be equal
// 3. createAt needs to be later than the given (invoice) create date
export async function POST(req: Request) {
  const { amount, reference, createdAt } = await req.json();

  const transactions = await db.transaction.findMany({
    where: {
      reference: {
        equals: reference,
      },
      amount: {
        equals: +amount,
      },
      createdAt: {
        gt: new Date(createdAt),
      },
    },
  });
  if (transactions.length) {
    return NextResponse.json(true);
  } else {
    return NextResponse.json(false);
  }
}
