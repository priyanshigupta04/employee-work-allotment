import React, { useState } from 'react';
import { adminAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminAPI.createUser(formData);
      toast.success('User created successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'employee'
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Add User</h1>
        <p>Create new employee or manager accounts</p>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;