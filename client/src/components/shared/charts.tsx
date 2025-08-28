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
import { TooltipProps } from "recharts";
import React from "react";

const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    const stock = payload[0].payload;
    return (
      <div className="bg-white border rounded-md p-2 shadow-md">
        <p>CMP: ₹{stock.currentPrice}</p>
        <p className={stock.gainLoss >= 0 ? "text-green-600" : "text-red-600"}>
          Gain/Loss: ₹{stock.gainLoss.toLocaleString()}
        </p>
        <p
          className={
            stock.gainLossPercent >= 0 ? "text-green-600" : "text-red-600"
          }
        >
          {stock.gainLossPercent.toFixed(2)}%
        </p>
      </div>
    );
  }
  return null;
};

function ChartsComponent({ data }: { data: any[] }) {
  console.log("Chart data render:", data);
  return (
    <Card className="p-4 text-xs">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="symbol" />
          <YAxis />
          {/* <Tooltip content={<CustomTooltip />} /> */}
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
            stroke="#e43232ff"
            label="Buy Price"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

// ✅ Memoized version
const Charts = React.memo(ChartsComponent, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

export default Charts;
