import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import './style.scss';

function ImageUploader({ style, label, name, onChange, src, showPreview }) {
  const [fileName, setFileName] = useState();

  const handleChange = (e) => {
    onChange(e);
    setFileName(e?.target?.files[0]?.name);
  };

  return (
    <div
      style={{
        ...style,
      }}
      className="image-file-uploader"
    >
      {showPreview && (
        <div className="image-preview">
          <Avatar src={src} />
        </div>
      )}
      <div className="input-container">
        {!!label && <span className="image-label">{label}</span>}

        <input onChange={handleChange} name={name} type="file" accept="image/*" />
        <Button startIcon={<CloudUploadIcon />}>Upload</Button>

        {fileName && <span className="image-name">{fileName}</span>}
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
