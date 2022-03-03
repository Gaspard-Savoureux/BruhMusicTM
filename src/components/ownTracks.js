import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OwnMusic from './ownMusic';

import '../styles/container.css';
import '../styles/form-components.css';

import { serveur } from '../const';
import useToken from '../hooks/useToken';
import useMusicPlayer from '../hooks/useMusicPlayer';

export default function OwnTracks() {
  const [music, setMusic] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { getToken } = useToken();
  const { setTracks } = useMusicPlayer();
  const navigate = useNavigate();

  useEffect(() => {
    async function getFavorite() {
      const token = getToken();
      if (token === '') navigate('/');

      const url = `${serveur}/music/user/${localStorage.getItem('id')}`;
      const content = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, content);

      if (res.ok) {
        const data = await res.json();
        setMusic(data);
        setTracks(data);
      } else {
        console.log("une erreur s'est produite lors de l'appel à /music");
      }
    }
    getFavorite();
  }, []);

  return (
    <div className="main-view-container">
      <div className="section-title">Your tracks</div>
      <div className="ml-container">
        <div className="ml-header">
          <div className="ml-header-song-number">#</div>
          <div className="ml-header-title">Titre</div>
          <div className="ml-header-duration">Durée</div>
        </div>
        <div className="ml-list">
          {music?.map((item) => (
            <OwnMusic
              music={item}
              songNum={music.indexOf(item) + 1}
              favorites={favorites}
              key={item.id}
            />
          )) ?? ''}
        </div>
      </div>
    </div>
  );
}
