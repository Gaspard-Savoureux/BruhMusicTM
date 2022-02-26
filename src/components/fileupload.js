import React, { useState } from 'react';

import '../styles/form-components.css';

const FileUpload = ({ setSelectedFile, id, acceptedFileTypes }) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const changeHandler = (event) => {
    setErrorMessage(null);
    const fileSelected = event.target.files[0];
    if (!acceptedFileTypes.includes(fileSelected.type)) {
      setErrorMessage('invalid file format');
      return;
    }
    setFile(fileSelected);
    setSelectedFile(fileSelected);
  };

  const formatFileSize = (fileSize) => {
    let fs = fileSize;
    if (fs == null) return null;
    const threshold = 1000;
    let i = -1;
    const units = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
      fs /= threshold;
      i += 1;
    } while (fs > threshold);
    return Math.max(fs, 0.1).toFixed(1) + units[i];
  };

  return (
    <>
      <div className="fileupload-container">
        <label className="fileupload-label" htmlFor={id}>
          <input className="fileupload-selectfile" id={id} type="file" onChange={changeHandler} hidden />
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
      { errorMessage && <div className="fileupload-error">{errorMessage}</div>}
    </>
  );
};

export default FileUpload;
