"use client";
import { DataTable } from "@/components/shared/datatable";
import { Card } from "@/components/ui/card";
import { ColumnDef, ColumnPinningState } from "@tanstack/react-table";
import { useState } from "react";

export type Stock = {
  symbol: string;
  name: string;
  qty: number;
  buyPrice: number;
  currentPrice: number;
  investment: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercent: number;
};


export const columns: ColumnDef<Stock>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
    size: 150,
  },
  {
    accessorKey: "name",
    header: "Company",
    size: 300,
  },
  {
    accessorKey: "qty",
    header: "Qty",
    size: 100,
  },
  {
    accessorKey: "buyPrice",
    header: "Buy Price",
    size: 150,
    cell: ({ row }) => `₹${row.original.buyPrice.toFixed(2)}`,
  },
  {
    accessorKey: "currentPrice",
    header: "CMP",
    size: 150,
    cell: ({ row }) => `₹${row.original.currentPrice.toFixed(2)}`,
  },
  {
    accessorKey: "investment",
    header: "Investment",
    size: 200,
    cell: ({ row }) => `₹${row.original.investment.toLocaleString()}`,
  },
  {
    accessorKey: "presentValue",
    header: "Present Value",
    size: 200,
    cell: ({ row }) => `₹${row.original.presentValue.toLocaleString()}`,
  },
  {
    accessorKey: "gainLoss",
    header: "Gain/Loss",
    size: 200,
    cell: ({ row }) => {
      const value = row.original.gainLoss;
      return (
        <span className={value >= 0 ? "text-green-600" : "text-red-600"}>
          ₹{value.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "gainLossPercent",
    header: "Gain/Loss %",
    size: 150,
    cell: ({ row }) => {
      const value = row.original.gainLossPercent;
      return (
        <span className={value >= 0 ? "text-green-600" : "text-red-600"}>
          {value.toFixed(2)}%
        </span>
      );
    },
  },
];


export const data: Stock[] = [
  {
    symbol: "HDFCBANK.NS",
    name: "HDFC Bank",
    qty: 50,
    buyPrice: 1490,
    currentPrice: 972.3,
    investment: 74500,
    presentValue: 48615,
    gainLoss: -25885,
    gainLossPercent: -34.7,
  },
  {
    symbol: "BAJFINANCE.NS",
    name: "Bajaj Finance",
    qty: 15,
    buyPrice: 6466,
    currentPrice: 6785,
    investment: 96990,
    presentValue: 101775,
    gainLoss: 1785,
    gainLossPercent: 1.84,
  },
];


export default function Home() {
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["symbol"],
    right: [],
  });

  return (
    <main className="m-4">
      <div className="w-full">
        <DataTable
          columns={columns}
          data={data}
          columnPinning={columnPinning}
          setColumnPinning={setColumnPinning}
        />
      </div>
    </main>
  );
}
