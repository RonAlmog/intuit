import { Transaction, Invoice } from "@prisma/client";

type Tran = {
  transactionDate: string;
  description: string;
  amount: number;
  reference: string;
};
type Inv = {
  status: string;
  amount: number;
  clientName: string;
  reference: string;
  createdAt: string;
};
export function initTransactions() {
  const trans = [
    [
      {
        transactionDate: "2023-01-03",
        description: "purchased laptop",
        amount: -2400,
        reference: "1002",
      },
      {
        transactionDate: "2023-01-04",
        description: "invoice paid by TD bank",
        amount: 1000,
        reference: "1000",
      },
      {
        transactionDate: "2023-01-02",
        description: "purchased cookie",
        amount: -3.99,
        reference: "1001",
      },
    ],
    [
      {
        transactionDate: "2023-01-01",
        description: "purchased coffee",
        amount: 220,
        reference: "1003",
      },
      {
        transactionDate: "2023-01-01",
        description: "purchased coffee",
        amount: 1200,
        reference: "1004",
      },
      {
        transactionDate: "2023-01-02",
        description: "purchased cookie",
        amount: 5,
        reference: "1005",
      },
    ],
    [
      {
        transactionDate: "2023-01-01",
        description: "payment from scotia bank",
        amount: 2000,
        reference: "1006",
      },
      {
        transactionDate: "2023-01-02",
        description: "payment from ACME inc.",
        amount: 495,
        reference: "1007",
      },
      {
        transactionDate: "2023-01-03",
        description: "lunch at mcdonnalds",
        amount: -39,
        reference: "1008",
      },
    ],
  ];
  return trans;
}

export function initInvoices(): Inv[] {
  const invoices = [
    {
      clientName: "TD Bank",
      status: "PAID",
      amount: 100,
      reference: "1000",
      createdAt: "2023-01-04",
    },
    {
      clientName: "ACME Inc.",
      status: "PAID",
      amount: -3.99,
      reference: "1001",
      createdAt: "2022-12-03",
    },
    {
      clientName: "Apple Store Inc.",
      status: "PAID",
      amount: -2400,
      reference: "1002",
      createdAt: "2023-01-03",
    },
    {
      clientName: "Amazon Inc.",
      status: "PAID",
      amount: 1000,
      reference: "1003",
      createdAt: "2023-12-25",
    },
  ];
  return invoices;
}
