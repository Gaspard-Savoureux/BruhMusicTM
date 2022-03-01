import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';

import FileUpload from './fileupload';
import '../styles/modal-change-cover.css';

import useToken from '../hooks/useToken';
import { serveur } from '../const';

const ModalChangeCover = ({ isOpen, onRequestClose, id }) => {
  const [imageFile, setImageFile] = useState();
  const [progress, setProgress] = useState(null);
  const [message, setMessage] = useState(null);
  const [colorMsg, setColorMsg] = useState(null);

  const { getToken } = useToken();
  const token = getToken();
  const navigate = useNavigate();

  const submitCover = async () => {
    const formData = new FormData();
    formData.append('cover', imageFile);

    const url = `${serveur}/cover/${id}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (res.ok) {
      navigate('settings');
      navigate(`/album/${id}`);
    } else {
      console.log(res);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    // submitCover();
    const formData = new FormData();
    formData.append('cover', imageFile);
    const req = new XMLHttpRequest();
    req.open('PUT', `${serveur}/cover/${id}`);
    req.setRequestHeader('Authorization', `Bearer ${token}`);

    req.upload.addEventListener('progress', (e) => {
      setProgress(((e.loaded / e.total) * 100).toFixed());
    });

    req.addEventListener('load', () => {
      if (req.status === 200) {
        setMessage('Téléversement réussi avec succès');
        setColorMsg('#60e026');
        navigate('album');
        navigate(`/album/${id}`);
      } else {
        setMessage("Une erreur c'est produit lors du téléversement");
        setColorMsg('#f44336');
      }
    });

    req.send(formData);
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      portalClassName="modal"
      ariaHideApp={false}
      style={{
        content: {
          /* background: 'unset !important', */
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          position: 'static',
        },
      }}
    >
      <div className="center">
        <h1>Change Cover</h1>
        <form className="changeCoverForm" method="put" onSubmit={handleSubmit}>
          <FileUpload
            className="elementChangeCover"
            setSelectedFile={setImageFile}
            id="image"
            acceptedFileTypes={[
              'image/png',
              'image/jpeg',
              'image/jpg',
              'image/gif',
            ]}
          />
          <div className="button-container">
            <button className="submit-button elementChangeCover" type="submit">
              Upload
            </button>
          </div>
        </form>
        {progress && (
          <>
            <ProgressBar
              completed={progress}
              maxCompleted={100}
              customLabel={`${progress}%`}
              width="95%"
              margin="10px"
            />
            <p style={{ color: colorMsg }}>{message}</p>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalChangeCover;
