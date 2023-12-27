"use client";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { initInvoices, initTransactions } from "@/prisma/initData";
import { Separator } from "@/components/ui/separator";
import AlertModal from "@/components/alert-modal";

const InitDb = () => {
  const [open, setOpen] = useState(false);
  const initUser = async () => {
    try {
      const values = {
        firstName: "Eric",
        lastName: "Jones",
        email: "eric@gmail.com",
      };
      const tran = await axios.post("/api/users", values);
      toast.success("User created");
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong");
    }
  };

  const initTrans = async (part: number) => {
    const response = await axios.get("/api/users");
    const trans = initTransactions();
    const user = response.data;

    try {
      trans[part].forEach(async (tran) => {
        const values = {
          userId: user?.id,
          description: tran.description,
          amount: tran.amount,
          transactionDate: tran.transactionDate,
          reference: tran.reference,
        };

        const createdTran = await axios.post("/api/transactions", values);
        toast.success("Transaction created");
      });
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong");
    }
  };

  const initInvs = async () => {
    const response = await axios.get("/api/users");
    const user = response.data;
    const invoices = initInvoices();

    try {
      invoices.forEach(async (inv) => {
        const values = {
          userId: user?.id,
          amount: inv.amount,
          status: inv.status,
          clientName: inv.clientName,
          reference: inv.reference,
          createdAt: inv.createdAt,
        };

        const createdInv = await axios.post("/api/invoices", values);
        toast.success("Invoice created");
      });
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong");
    }
  };

  const resetDb = async () => {
    await axios
      .post("/api/resetdb")
      .then((result) => {
        toast.success("DB erased");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setOpen(false);
      });
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={resetDb}
        loading={false}
      />
      <div className="flex flex-col w-full items-center justify-start space-y-8 mt-8">
        <Button className="w-48" onClick={initUser}>
          Init Users
        </Button>
        <Separator className="w-64" />
        <Button className="w-48" onClick={() => initTrans(0)}>
          Init Transaction part 1
        </Button>
        <Button className="w-48" onClick={() => initTrans(1)}>
          Init Transaction part 2
        </Button>
        <Button className="w-48" onClick={() => initTrans(2)}>
          Init Transaction part 3
        </Button>
        <Separator className="w-64" />
        <Button className="w-48" onClick={initInvs}>
          Init Invoices
        </Button>
        <Separator className="w-64" />

        <Button
          variant="outline"
          className="w-48"
          onClick={() => setOpen(true)}
        >
          Reset DB
        </Button>
      </div>
    </>
  );
};

export default InitDb;
