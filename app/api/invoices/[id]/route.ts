import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse("id is reqired!", { status: 400 });
    }

    const invoice = await db.invoice.findUnique({ where: { id: params.id } });
    return NextResponse.json(invoice);
  } catch (error) {
    console.log("[GET_INVOICE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { amount, clientName, reference, createdAt } = await req.json();
  try {
    if (!params.id) {
      return new NextResponse("id is reqired!", { status: 400 });
    }

    const valid = await validate(amount, reference, createdAt);
    console.log("created", createdAt);

    const invoice = await db.invoice.update({
      where: { id: params.id },
      data: {
        amount: amount,
        clientName: clientName,
        reference: reference,
        status: valid ? "PAID" : "NOT PAID",
        createdAt: new Date(createdAt),
      },
    });

    return NextResponse.json(invoice);
  } catch (error) {
    console.log("[GET_INVOICE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return new NextResponse("id is reqired!", { status: 400 });
  }

  try {
    const deletedInvoice = await db.invoice.delete({
      where: { id: params.id },
    });
    return NextResponse.json(deletedInvoice);
  } catch (error) {
    console.log("[DELETE_INVOICE]", error);
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
