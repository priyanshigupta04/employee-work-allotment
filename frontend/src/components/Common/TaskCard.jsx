import React from 'react';
import ProgressBar from './ProgressBar';

const TaskCard = ({ task, onUpdateProgress, canEdit = false }) => {
  const handleProgressChange = (e) => {
    const progress = parseInt(e.target.value);
    if (onUpdateProgress) {
      onUpdateProgress(task._id, progress);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{task.title}</h3>
        <span style={{
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '14px',
          backgroundColor: 
            task.status === 'completed' ? '#28a745' : 
            task.status === 'in progress' ? '#ffc107' : '#6c757d',
          color: 'white'
        }}>
          {task.status}
        </span>
      </div>
      <p style={{ marginBottom: '15px' }}>{task.description}</p>
      <div style={{ marginBottom: '15px' }}>
        <strong>Assigned By:</strong> {task.assignedBy?.name}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Progress:</strong>
        <ProgressBar progress={task.progress} />
      </div>
      {canEdit && (
        <div>
          <label className="form-label">Update Progress:</label>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={task.progress}
            onChange={handleProgressChange}
            style={{ width: '100%' }}
          />
          <div className="text-right">
            <span>{task.progress}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;