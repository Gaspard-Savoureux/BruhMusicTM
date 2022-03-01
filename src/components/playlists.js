import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FileUpload from './fileupload';
import Playlist from './playlist';
import { serveur } from '../const';
import useToken from '../hooks/useToken';
import '../styles/container.css';
import '../styles/form-components.css';
import '../styles/song.css';
import ModalCreatePlaylist from './modal-create-playlist';

export default function Playlists() {
  const [modal, setModal] = useState(false);
  const [playlist, setPlaylist] = useState();
  const { getToken } = useToken();

  useEffect(() => {
    const getPlaylists = async () => {
      const res = await fetch(`${serveur}/user-playlist`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        const playlists = data.splice(1);
        setPlaylist(playlists);
      }
    };
    getPlaylists();
  }, []);

  return (
    playlist != null && (
      <div className="main-view-container">
        <button
          className="newplaylist"
          type="button"
          onClick={() => setModal(true)}
        >
          <p>Créé une nouvelle playlist</p>
        </button>
        <div className="container">
          {playlist?.map((item) => (
            <Playlist
              id={item.id}
              name={item.name}
              description={item.description}
            />
          ))}
        </div>

        <ModalCreatePlaylist
          isOpen={modal}
          onRequestClose={() => setModal(false)}
          setModal={setModal}
        />
      </div>
    )
  );
}
