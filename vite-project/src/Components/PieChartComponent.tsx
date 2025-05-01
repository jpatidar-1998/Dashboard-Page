import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  labels: string[];
  data: number[];
  colors: string[];
  width?: number; 
  height?: number; 
}

const PieChartComponent: React.FC<PieChartProps> = ({
  labels,
  data,
  colors,
  width = 150, 
  height = 150, 
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };


  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Pie Chart */}
      <div style={{ flex: 1 }}>
        <Pie
          data={chartData}
          options={{
            maintainAspectRatio: false,
          }}
          width={width}
          height={height}
        />
      </div>

      <div style={{ flex: 1, paddingLeft: "20px" }}>
        <h4 style={{ marginBottom: "10px" }}>Data</h4>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {labels.map((label, index) => {
            return (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                {/* Color Icon */}
                <span
                  style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    backgroundColor: colors[index],
                    borderRadius: "50%",
                    marginRight: "8px",
                  }}
                ></span>
                <span>
                  {label}: {data[index]}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PieChartComponent;