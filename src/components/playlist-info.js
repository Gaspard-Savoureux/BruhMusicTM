import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import ModalAddPlaylist from './modal-add-playlist';
import { serveur } from '../const';
import MusicList from './music-list';
import GoBack from './goback-button';
import useMusicPlayer from '../hooks/useMusicPlayer';

import '../styles/container.css';
import '../styles/form-components.css';

export default function PlaylistInfo() {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [music, setMusic] = useState(null);
  const [favorite, setFavorites] = useState([]);
  const { setTracks } = useMusicPlayer();

  useEffect(() => {
    const getPlaylistInfo = async () => {
      const res = await fetch(`${serveur}/playlists-music/${id}`, {
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        const { length } = data;
        const idFav = [];
        for (let i = 0; i < length; i += 1) {
          idFav.push(data[i].music_id);
        }
        setFavorites(idFav);
        const tracks = data.map((track) => {
          return { ...track, isFavorite: true };
        });
        setMusic(tracks);
        setTracks(tracks);
      }
    };
    getPlaylistInfo();
  }, []);

  return (
    music != null && (
      <div className="main-view-container">
        <div className="top">
          <GoBack escape="/playlists" />
          <div>
            <button
              className="button-component addPlaylist"
              type="button"
              onClick={() => setModal(true)}
            >
              Add a song to playlist
            </button>
          </div>
        </div>
        <MusicList music={music} favorites={favorite} />
        <ModalAddPlaylist
          isOpen={modal}
          onRequestClose={() => setModal(false)}
          setModal={setModal}
          id={id}
        />
      </div>
    )
  );
}
