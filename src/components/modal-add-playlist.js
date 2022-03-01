import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';

import FileUpload from './fileupload';
import '../styles/modal-change-cover.css';

import useToken from '../hooks/useToken';
import { serveur } from '../const';

const ModalAddPlaylist = ({ isOpen, onRequestClose, id }) => {
  const [playlists, setPlaylists] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [filteredMusic, setFilteredMusic] = useState([]);

  const { getToken } = useToken();
  const token = getToken();
  const navigate = useNavigate();

  const onSubmitSearch = async (event) => {
    event.preventDefault();
    if (searchFilter !== '') {
      const url = `${serveur}/music?title=${searchFilter}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setFilteredMusic(data);
      } else {
        console.log("une erreur s'est produite lors de l'appel à /music");
      }
    } else {
      setFilteredMusic(filteredMusic);
    }
  };

  function handleSearchChange(event) {
    setSearchFilter(event.target.value);
  }

  async function addToPlaylist(event) {
    console.log(id);
    const url = `${serveur}/playlists-music`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        musicId: parseInt(event.target.id, 10),
        playlistId: parseInt(id, 10),
      }),
    });
    if (res.ok) {
      // const data = await res.json();
      // console.log(res);
      navigate('/settings');
      navigate(`/playlists/${id}`);
    } else {
      console.log("une erreur s'est produite lors de l'appel à /music");
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      portalClassName="modal"
      ariaHideApp={false}
      style={{
        content: {
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          position: 'static',
        },
      }}
    >
      <div className="center">
        <h1>Ajouter une chançon</h1>
        <form className="modal-search-bar-container" onSubmit={onSubmitSearch} style={{ paddingLeft: '7px', paddingRight: 0, paddingBottom: 0, paddingTop: 0 }}>
          <input
            className="modal-search-bar"
            type="text"
            placeholder="Recherche"
            onChange={handleSearchChange}
          />
          <div
            className="modal-search-button"
            onClick={onSubmitSearch}
            onKeyDown={onSubmitSearch}
          >
            <i className="fas fa-search" aria-hidden="true" />
          </div>
        </form>
        <div className="modal-search-result-list">
          {filteredMusic?.map((item) => <p key={item.id} id={item.id} onClick={addToPlaylist}>{item.title}</p>) ?? ''}
         </div>
      </div>
    </Modal>
  );
};

export default ModalAddPlaylist;
