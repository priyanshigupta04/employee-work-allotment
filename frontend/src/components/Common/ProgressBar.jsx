import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div style={{
      width: '100%',
      backgroundColor: '#e9ecef',
      borderRadius: '4px',
      height: '20px',
      overflow: 'hidden'
    }}>
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: progress === 100 ? '#28a745' : '#4a6cf7',
          height: '100%',
          transition: 'width 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;