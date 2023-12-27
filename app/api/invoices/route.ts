import { db } from "@/lib/db";
import axios from "axios";
import { NextResponse } from "next/server";

// create new invoice
export async function POST(req: Request) {
  const { amount, clientName, reference, createdAt } = await req.json();

  // we only have one user in this demo
  const user = await db.user.findFirst({});

  // get status from validate api
  const valid = await validate(amount, reference, createdAt);

  try {
    const tran = await db.invoice.create({
      data: {
        userId: user?.id as string,
        amount,
        clientName,
        status: valid ? "PAID" : "NOT PAID",
        reference,
        createdAt: new Date(createdAt),
      },
    });
    return NextResponse.json(tran);
  } catch (error) {
    console.log("[CREATE TRANSACTION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// get all invoices
export async function GET(req: Request) {
  try {
    const invoices = await db.invoice.findMany({});
    return NextResponse.json(invoices);
  } catch (error) {
    console.log("[GET_INVOICES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

const validate = async (
  amount: string,
  reference: string,
  createdAt: string
) => {
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
    return true;
  } else {
    return false;
  }
};
