import React, { useState, useEffect } from 'react';
import { managerAPI } from '../../services/api';
import { toast } from 'react-toastify';
import TaskCard from '../Common/TaskCard';

const ManagerTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await managerAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProgress = async (taskId, progress) => {
    try {
      await managerAPI.updateTaskProgress(taskId, progress);
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
        <h1 className="dashboard-title">All Tasks</h1>
        <p>View and manage all assigned tasks</p>
      </div>
      {tasks.length === 0 ? (
        <div className="card">
          <p>No tasks found.</p>
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

export default ManagerTaskList;