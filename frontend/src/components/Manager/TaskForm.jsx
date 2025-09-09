import React, { useState, useEffect } from 'react';
import { managerAPI } from '../../services/api';
import { toast } from 'react-toastify';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: ''
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await managerAPI.getEmployees();
      setEmployees(response.data);
    } catch (error) {
      toast.error('Failed to fetch employees');
    }
  };

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
      await managerAPI.createTask(formData);
      toast.success('Task created successfully!');
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Create Task</h1>
        <p>Assign new tasks to employees</p>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-input"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
            ></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Assign To</label>
            <select
              name="assignedTo"
              className="form-select"
              value={formData.assignedTo}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee</option>
              {employees.map(employee => (
                <option key={employee._id} value={employee._id}>
                  {employee.name} ({employee.email})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="form-input"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;