import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const cityChartDataOriginal = {
  Delhi: [
    { name: "Jan", value: 65 },
    { name: "Feb", value: 70 },
    { name: "Mar", value: 75 },
    { name: "Apr", value: 78 },
    { name: "May", value: 82 },
    { name: "Jun", value: 85 }
  ],
  Mumbai: [
    { name: "Jan", value: 55 },
    { name: "Feb", value: 60 },
    { name: "Mar", value: 58 },
    { name: "Apr", value: 62 },
    { name: "May", value: 72 },
    { name: "Jun", value: 75 }
  ],
  Chennai: [
    { name: "Jan", value: 29 },
    { name: "Feb", value: 80 },
    { name: "Mar", value: 27 },
    { name: "Apr", value: 65 },
    { name: "May", value: 79 },
    { name: "Jun", value: 90 }
  ]
};

const ChartCard = ({ city, livability }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const historical = [...(cityChartDataOriginal[city] || cityChartDataOriginal["Delhi"])];
    
    // Prevent "Now" from stacking again
    const filtered = historical.filter((entry) => entry.name !== "Now");

    const updatedData = [...filtered, { name: "Now", value: livability }];
    setChartData(updatedData);
  }, [city, livability]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 col-span-2 h-full">
      <h2 className="text-md font-semibold text-gray-600 mb-4">Historical Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ChartCard;
