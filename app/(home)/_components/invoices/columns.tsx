"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type InvoiceColumn = {
  id: string;
  clientName: string;
  amount: number;
  reference: string;
  status: string;
  createdAt: Date;
};

export const columns: ColumnDef<InvoiceColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.original.id.slice(-6)}</div>,
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "reference",
    header: "Reference",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
