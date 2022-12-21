import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function ImageUploader({ style, label, name, onChange, src, showPreview }) {
  const [fileName, setFileName] = useState();

  const handleChange = (e) => {
    onChange(e);
    setFileName(e?.target?.files[0]?.name);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgb(0,0,0, .1)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgb(0,0,0, 0.09)',
        maxWidth: '350px',
        ...style,
      }}
      className="image-file-uploader"
    >
      {showPreview && (
        <div style={{ padding: '5px' }} className="preview">
          <Avatar style={{ borderRadius: '3px' }} src={src} />
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'relative',
          flexGrow: '1',
          alignSelf: 'stretch',
          padding: '5px',
        }}
      >
        {!!label && (
          <span style={{ fontSize: '1em', fontWeight: 'bold' }} className="image-label">
            {label}
          </span>
        )}

        <input
          style={{
            cursor: 'pointer',
            opacity: '0',
            position: 'absolute',
            lef: '0',
            top: '0',
            width: '100%',
            height: '100%',
            zIndex: '1',
          }}
          onChange={handleChange}
          name={name}
          id="image-uploader"
          type="file"
          accept="image/*"
        />
        <Button style={{ alignSelf: 'center', margin: '0' }} startIcon={<CloudUploadIcon />}>
          Upload
        </Button>

        {fileName && (
          <span
            style={{
              fontSize: '1em',
              textDecoration: 'underline',
              fontStyle: 'italic',
            }}
            className="image-name"
          >
            {fileName}
          </span>
        )}
      </div>
    </div>
  );
}

ImageUploader.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  src: PropTypes.string,
  showPreview: PropTypes.bool,
};

ImageUploader.defaultProps = {
  showPreview: true,
  style: {},
};

export default ImageUploader;
