import React from 'react';

const EmployeeDashboard = () => {
  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Employee Dashboard</h1>
        <p>View your tasks and update progress</p>
      </div>
      <div className="card">
        <h2>Welcome to Employee Dashboard</h2>
        <p>From here you can view all tasks assigned to you and update your progress.</p>
        <p>Use the sidebar to navigate to different sections.</p>
      </div>
    </div>
  );
};

export default EmployeeDashboard;