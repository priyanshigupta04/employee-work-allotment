import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Admin/Dashboard';
import AddUserForm from './components/Admin/AddUserForm';
import ManagerDashboard from './components/Manager/Dashboard';
import TaskForm from './components/Manager/TaskForm';
import ManagerTaskList from './components/Manager/TaskList';
import EmployeeDashboard from './components/Employee/Dashboard';
import EmployeeTaskList from './components/Employee/TaskList';

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="dashboard">
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={
              <PrivateRoute requiredRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="/admin/add-user" element={
              <PrivateRoute requiredRole="admin">
                <AddUserForm />
              </PrivateRoute>
            } />

            {/* Manager Routes */}
            <Route path="/manager" element={
              <PrivateRoute requiredRole="manager">
                <ManagerDashboard />
              </PrivateRoute>
            } />
            <Route path="/manager/create-task" element={
              <PrivateRoute requiredRole="manager">
                <TaskForm />
              </PrivateRoute>
            } />
            <Route path="/manager/tasks" element={
              <PrivateRoute requiredRole="manager">
                <ManagerTaskList />
              </PrivateRoute>
            } />

            {/* Employee Routes */}
            <Route path="/employee" element={
              <PrivateRoute requiredRole="employee">
                <EmployeeDashboard />
              </PrivateRoute>
            } />
            <Route path="/employee/tasks" element={
              <PrivateRoute requiredRole="employee">
                <EmployeeTaskList />
              </PrivateRoute>
            } />

            {/* Default redirect based on role */}
            <Route path="/" element={
              <Navigate to={
                user.role === 'admin' ? '/admin' :
                user.role === 'manager' ? '/manager' : '/employee'
              } replace />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;