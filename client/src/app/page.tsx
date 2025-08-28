"use client";
import { getData } from "@/actions/getData";
import Charts from "@/components/shared/charts";
import { DataTable } from "@/components/shared/datatable";
import Header from "@/components/shared/header";
import { Card } from "@/components/ui/card";
import { columns, Stock } from "@/constant";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket:Socket<DefaultEventsMap, DefaultEventsMap>;

export default function Home() {
  const [data, setData] = useState<Stock[]>([]);
  const [countdown, setCountdown] = useState({
    state: "Refresh",
    time: 15,
  });

  const intervalId = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    //function to get stock data
    const fetchData = async () => {
      setCountdown((prev) => ({ ...prev, state: "Refreshing" }));
      const result = await getData();
      if (result.success) {
        setData(result.data);
        setCountdown({ state: "Refresh", time: 15 });
      }
    };

    /** 
    get data immediately when client connects with server
    re-fetch api when server ask @every 15 sec
    */

    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
    socket.on("connect", fetchData);
    socket.on("response", fetchData);

    intervalId.current = setInterval(() => {
      setCountdown((prev) => {
        return { ...prev, time: prev.time > 0 ? prev.time - 1 : 0 };
      });
    }, 1000);

    //break connection if client inactive
    return () => {
      socket.disconnect();
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []);

  return (
    <Card className="p-4 m-4 flex gap-4">
      <Header countdown={countdown} />
      <Charts data={data} />
      <DataTable columns={columns} data={data} />
    </Card>
  );
}
