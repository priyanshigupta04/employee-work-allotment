import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../../services/api';
import { toast } from 'react-toastify';
import TaskCard from '../Common/TaskCard';

const EmployeeTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await employeeAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProgress = async (taskId, progress) => {
    try {
      await employeeAPI.updateTaskProgress(taskId, progress);
      toast.success('Progress updated successfully!');
      fetchTasks(); // Refresh the task list
    } catch (error) {
      toast.error('Failed to update progress');
    }
  };

  if (loading) {
    return <div className="dashboard-content">Loading...</div>;
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Tasks</h1>
        <p>View and update your assigned tasks</p>
      </div>
      {tasks.length === 0 ? (
        <div className="card">
          <p>No tasks assigned to you yet.</p>
        </div>
      ) : (
        <div>
          {tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdateProgress={handleUpdateProgress}
              canEdit={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeTaskList;