"use client";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Separator } from "@/components/ui/separator";
import { Invoice } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";

const InvoicesClient = () => {
  const router = useRouter();
  const [invoices, setInovoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const getTheInvoices = async () => {
      try {
        const response = await axios.get("/api/invoices");
        if (response.data) {
          const formattedData = response.data.map((inv: Invoice) => ({
            id: inv.id,
            clientName: inv.clientName,
            amount: inv.amount.toString(),
            status: inv.status,
            reference: inv.reference,
          }));
          setInovoices(formattedData);
        }
      } catch (error) {
        console.log("Error");
      }
    };

    getTheInvoices();
  }, []);

  const refreshPage = () => {
    router.refresh();
  };

  return (
    <div className="w-full flex-col">
      <div className="flex-1 space-y-4 p-2 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Invoices (${invoices.length})`}
            description="Manage your invoices"
          />

          <Button onClick={() => router.push("/invoice/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
        <Separator />

        <DataTable columns={columns} data={invoices} searchKey="clientName" />
      </div>
    </div>
  );
};

export default InvoicesClient;
