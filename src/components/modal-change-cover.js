import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import FileUpload from './fileupload';
import '../styles/modal-change-cover.css';

import useToken from '../hooks/useToken';
import { serveur } from '../const';

const ModalChangeCover = ({ isOpen, onRequestClose, id }) => {
  const [imageFile, setImageFile] = useState();
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
      navigate('album');
      navigate(`/album/${id}`);
    } else {
      console.log(res);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    submitCover();
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
        <form method="put" onSubmit={handleSubmit}>
          <FileUpload
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
            <button className="submit-button" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalChangeCover;
