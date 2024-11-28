import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";
import './app.css'

ChartJS.register(CategoryScale, LinearScale, BarElement);

const ProjectChart: React.FC = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Projects",
        data: [200, 300, 600, 400, 100, 350, 700],
        backgroundColor: "#4caf50",
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Project Statistics</h3>
      <Bar data={data} />
    </div>
  );
};

export default ProjectChart;
