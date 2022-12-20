import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <article
      style={{
        margin: '200px auto',
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ flex: '0 0 50%', display: 'grid', alignItems: 'center' }} className="left-side">
        <h1 style={{ fontSize: '2em' }}>
          <i>Unauthorized</i>
        </h1>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          flexBasis: '50%',
        }}
        className="right-side"
      >
        <h2>Oops!</h2>
        <p>You do not have access to the requested page.</p>
        <Button onClick={goBack} endIcon={<UndoIcon />}>
          Go Back
        </Button>
      </div>
    </article>
  );
}

export default Unauthorized;
