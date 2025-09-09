import React from 'react';

const ManagerDashboard = () => {
  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Manager Dashboard</h1>
        <p>Manage tasks and monitor progress</p>
      </div>
      <div className="card">
        <h2>Welcome to Manager Dashboard</h2>
        <p>From here you can create tasks, assign them to employees, and monitor their progress.</p>
        <p>Use the sidebar to navigate to different sections.</p>
      </div>
    </div>
  );
};

export default ManagerDashboard;