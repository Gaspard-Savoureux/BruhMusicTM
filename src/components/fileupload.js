import React, { useState } from 'react';

import '../styles/fileupload.css';

const FileUpload = ({ setSelectedFile }) => {
  const [file, setFile] = useState(null);

  const changeHandler = (event) => {
    setFile(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const formatFileSize = (fileSize) => {
    if (fileSize == null) return null;
    const threshold = 1000;
    let i = -1;
    const units = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
      fileSize /= threshold;
      i += 1;
    } while (fileSize > threshold);
    return Math.max(fileSize, 0.1).toFixed(1) + units[i];
  };

  return (
    <div className="fileupload-container">
      <label className="fileupload-label">
        <input className="fileupload-selectfile" type="file" name="file" onChange={changeHandler} hidden />
        <div className="fileupload-button">
          <i className="fas fa-upload" />
          <div className="fileupload-button-text">
            Choose a file...
          </div>
        </div>
        <div className="fileupload-infobox">
          <div className="fileupload-filename">
            {file?.name ?? 'no file selected'}
          </div>
          <div className="fileupload-filesize">
            {formatFileSize(file?.size) ?? ''}
          </div>
        </div>
      </label>
    </div>
  );
};

export default FileUpload;
