import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const StockChart = ({ stockData }) => {
  const data = {
    labels: stockData.map((entry) => entry.timestamp),
    datasets: [
      {
        label: "Stock Price (USD)",
        data: stockData.map((entry) => entry.price),
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
};

export default StockChart;
