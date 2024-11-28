import React from "react";
import './app.css'

const StatisticsCard: React.FC = () => {
  const stats = [
    { label: "Total Project", value: 1523, color: "green" },
    { label: "In Progress", value: 836, color: "orange" },
    { label: "Complete", value: 475, color: "red" },
    { label: "Upcoming", value: 189, color: "blue" },
  ];

  return (
    <div className="statistics-card">
      {stats.map((stat, index) => (
        <div className={`stat-item ${stat.color}`} key={index}>
          <h3>{stat.value}</h3>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCard;
