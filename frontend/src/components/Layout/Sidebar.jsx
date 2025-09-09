import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const adminLinks = [
    { to: '/admin', text: 'Dashboard' },
    { to: '/admin/add-user', text: 'Add User' },
  ];

  const managerLinks = [
    { to: '/manager', text: 'Dashboard' },
    { to: '/manager/create-task', text: 'Create Task' },
    { to: '/manager/tasks', text: 'View Tasks' },
  ];

  const employeeLinks = [
    { to: '/employee', text: 'Dashboard' },
    { to: '/employee/tasks', text: 'My Tasks' },
  ];

  const getLinks = () => {
    switch (user?.role) {
      case 'admin':
        return adminLinks;
      case 'manager':
        return managerLinks;
      case 'employee':
        return employeeLinks;
      default:
        return [];
    }
  };

  return (
    <aside style={{
      width: '250px',
      backgroundColor: '#f8f9fa',
      borderRight: '1px solid #dee2e6',
      padding: '20px 0',
      minHeight: 'calc(100vh - 70px)'
    }}>
      <nav>
        <ul style={{ listStyle: 'none' }}>
          {getLinks().map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                style={({ isActive }) => ({
                  display: 'block',
                  padding: '12px 20px',
                  color: isActive ? '#4a6cf7' : '#495057',
                  textDecoration: 'none',
                  fontWeight: isActive ? '600' : '400',
                  backgroundColor: isActive ? '#e9ecef' : 'transparent',
                  borderRight: isActive ? '3px solid #4a6cf7' : 'none'
                })}
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;