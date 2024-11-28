import React from "react";
import './app.css'

const WorkList: React.FC = () => {
  const tasks = [
    { title: "NFT App Design", assignee: "Cody Fisher", priority: "High" },
    { title: "Web Design", assignee: "Kristin Watson", priority: "Medium" },
    { title: "Rental Car App", assignee: "Darlene Robertson", priority: "Low" },
    { title: "E-commerce Template", assignee: "Wade Warren", priority: "High" },
  ];

  return (
    <div className="work-list">
      <h3>Today Work</h3>
      {tasks.map((task, index) => (
        <div className="task" key={index}>
          <div>
            <h4>{task.title}</h4>
            <p>Assigned to {task.assignee}</p>
          </div>
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WorkList;
