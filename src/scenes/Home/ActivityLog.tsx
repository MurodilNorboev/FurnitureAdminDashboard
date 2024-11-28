import React from "react";
import './app.css'

const ActivityLog: React.FC = () => {
  const activities = [
    { user: "Jenny Wilson", action: "Commented on NFT App", detail: "This design looks great!" },
    { user: "Darlene Robertson", action: "Shared File", detail: "Shared a design file." },
    { user: "Seema Joshi", action: "Meeting", detail: "Scheduled a meeting for website update." },
  ];

  return (
    <div className="activity-log">
      <h3>Activity Log</h3>
      {activities.map((activity, index) => (
        <div className="activity" key={index}>
          <strong>{activity.user}</strong>
          <p>{activity.action}</p>
          <small>{activity.detail}</small>
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;
