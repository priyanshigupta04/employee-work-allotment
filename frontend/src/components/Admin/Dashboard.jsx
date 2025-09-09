import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p>Manage users and system settings</p>
      </div>
      <div className="card">
        <h2>Welcome to Admin Dashboard</h2>
        <p>From here you can manage all users (employees and managers) in the system.</p>
        <p>Use the sidebar to navigate to different sections.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;