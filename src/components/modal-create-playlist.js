import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../styles/menu.css';
import '../styles/login.css';

import useToken from '../hooks/useToken';
import { serveur } from '../const';

const ModalCreatePlaylist = ({ isOpen, onRequestClose, setModal }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { getToken } = useToken();
  const token = getToken();

  async function CreatePlaylist() {
    const bodyContent = {
      name,
      description,
    };

    const res = await fetch(`${serveur}/user-playlist`, {
      method: 'POST',
      body: JSON.stringify(bodyContent),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      setModal(false);
      console.log(data);
    } else {
      console.error(res.statusText);
    }
  }

  function handleCreatePlaylist(e) {
    e.preventDefault();
    CreatePlaylist();
    console.log('created');
  }
  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
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
        <h1>Create New Playlist</h1>
        <form method="post" onSubmit={handleCreatePlaylist}>
          <div className="txt_field">
            <input
              className="input-username"
              type="text"
              onChange={handleChangeName}
              required
            />
            <span />
            <label>Playlist Name</label>
          </div>
          <div className="txt_field">
            <input
              className="input-username"
              type="text"
              onChange={handleChangeDescription}
              required
            />
            <span />
            <label>Description</label>
          </div>

          <input className="login-submit" type="submit" value="Create" />
          {/* <button className="login-submit" onClick={() => setModal(false)}> */}
          {/*   Cancel */}
          {/* </button> */}
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreatePlaylist;
