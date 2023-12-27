"use client";

import { cn } from "@/lib/utils";
import { Transaction } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const SummaryWidget = () => {
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState(
    "text-orange-400 border-orange-400 bg-yellow-100"
  );

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const results = await axios.get("/api/transactions");
        const transactions = results.data;
        if (transactions.length) {
          const summary = transactions.reduce(
            (a: Transaction, b: Transaction) => ({
              amount: a.amount + b.amount,
            })
          );
          setTotal(summary.amount);
          if (summary.amount >= 100) {
            setClassName("text-lime-700 border-lime-700 bg-lime-200"); // above 100, greenish
          } else if (summary.amount >= 0 && summary.amount < 100) {
            setClassName("text-orange-400 border-orange-400 bg-yellow-100"); // 0 to 100, yellowish
          } else if (summary.amount < 0) {
            setClassName("text-rose-800 border-rose-800 bg-rose-200"); // negative, red
          }
        }

        const countResult = await axios.get("/api/invoice-count");

        if (countResult.data) {
          setCount(countResult.data);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    const data = getData();
  }, []);

  const currencyFormat = (num: Number) => {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  if (loading) {
    return "Loading...";
  }
  return (
    <div
      className={cn(
        "flex flex-col items-center px-4 py-2 m-2 w-64 border-2 rounded-lg shadow-md font-semibold text-lg transition",
        className
      )}
    >
      <div className="flex items-center justify-start w-full">
        <h4 className="text-sm mr-2">Total Transactions:</h4>
        {currencyFormat(total)}
      </div>
      <div className="flex items-center justify-start w-full">
        <h4 className="text-sm mr-2">Invoices:</h4>
        {count}
      </div>
    </div>
  );
};

export default SummaryWidget;
