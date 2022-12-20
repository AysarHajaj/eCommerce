import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <CircularProgress
        style={{
          position: 'absolute',
          width: '22px',
          height: '22px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
