import { ColumnDef } from "@tanstack/react-table";

export type Stock = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  dayLow: number;
  dayHigh: number;
  marketCap: number;
  peRatio: number;
  dividendYield: number;
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
    accessorKey: "price",
    header: "Price",
    size: 100,
  },
  {
    accessorKey: "change",
    header: "Change",
    size: 100,
    cell: ({ row }) => {
      const value = row.original.change;
      return (
        <span className={value >= 0 ? "text-green-600" : "text-red-600"}>
          {value.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "changePercent",
    header: "Change %",
    size: 100,
    cell: ({ row }) => {
      const value = row.original.changePercent;
      return (
        <span className={value >= 0 ? "text-green-600" : "text-red-600"}>
          {value.toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "dayLow",
    header: "Day Low",
    size: 100,
  },
  {
    accessorKey: "dayHigh",
    header: "Day High",
    size: 100,
  },
  {
    accessorKey: "marketCap",
    header: "Market Cap",
    size: 200,
    cell: ({ row }) => `₹${row.original.marketCap.toLocaleString()}`,
  },
  {
    accessorKey: "peRatio",
    header: "P/E Ratio",
    size: 100,
    cell: ({ row }) => row.original.peRatio.toFixed(2),
  },
  {
    accessorKey: "dividendYield",
    header: "Dividend Yield",
    size: 150,
    cell: ({ row }) => `${row.original.dividendYield.toFixed(2)}%`,
  }
];
