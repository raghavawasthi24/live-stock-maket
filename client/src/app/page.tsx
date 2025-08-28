"use client";
import { getData } from "@/actions/getData";
import Charts from "@/components/shared/charts";
import { DataTable } from "@/components/shared/datatable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { columns, Stock } from "@/constant";
import { ColumnPinningState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { RefreshCw } from "lucide-react";

let socket: any;

export default function Home() {
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["symbol"],
    right: [],
  });

  const [data, setData] = useState<Stock[]>([]);
  const [countdown, setCountdown] = useState({
    state: "Refresh",
    time: 15,
  });

  useEffect(() => {
    const fetchData = async () => {
      setCountdown((prev) => ({ ...prev, state: "Refreshing" }));
      const result = await getData();
      if (result.success) {
        console.log(result.data);
        setData(result.data);
        setCountdown({ state: "Refresh", time: 15 });
      }
    };

    fetchData();

    socket = io("http://localhost:5001");

    socket.on("connect", fetchData);
    socket.on("response", fetchData);

    setInterval(() => {
      setCountdown((prev) => {
        return { ...prev, time: prev.time > 0 ? prev.time - 1 : 0 };
      });
    }, 1000);

    // cleanup when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Card className="p-4 m-4 flex gap-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-lg">My Stock Portfolio</h1>
        <Button variant="outline" className="text-green-700">
          <RefreshCw className="h-4 w-4" />
          {countdown.state} {countdown.time > 0 ? `in ${countdown.time}` : null}
        </Button>
      </div>

      <Charts data={data} />

      <DataTable
        columns={columns}
        data={data}
        // columnPinning={columnPinning}
        // setColumnPinning={setColumnPinning}
      />
    </Card>
  );
}
