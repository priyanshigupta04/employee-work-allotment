import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header style={{
      backgroundColor: '#4a6cf7',
      color: 'white',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1>Employee Work Allotment System</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span>Welcome, {user?.name} ({user?.role})</span>
        <button 
          onClick={handleLogout}
          style={{
            padding: '8px 15px',
            backgroundColor: 'transparent',
            border: '1px solid white',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;