"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../ui/card";
import React from "react";
import { Stock } from "@/constant";

interface StockTooltipPayload {
  payload: Stock;
  value: number;
  name: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: StockTooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const stock = payload[0].payload; // already typed as Stock ✅

  return (
    <div className="bg-white border rounded-md p-2 shadow-md">
      <p>CMP: ₹{stock.price}</p>
      <p
        className={stock.changePercent >= 0 ? "text-green-600" : "text-red-600"}
      >
        Gain/Loss: ₹{stock.changePercent.toLocaleString()}
      </p>
      <p
        className={stock.changePercent >= 0 ? "text-green-600" : "text-red-600"}
      >
        ({stock.changePercent.toFixed(2)}%)
      </p>
    </div>
  );
};

function ChartsComponent({ data }: { data: Stock[] }) {
  return (
    <Card className="p-4 text-xs">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="symbol" />
          <YAxis />
          {/* Now fully typed tooltip */}
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="peRatio"
            stroke="#e43232"
            label="Buy Price"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

// memoizing chart component
const Charts = React.memo(
  ChartsComponent,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
);

export default Charts;
