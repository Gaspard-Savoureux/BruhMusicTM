import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicList from './music-list';

import '../styles/container.css';
import '../styles/form-components.css';

import { serveur } from '../const';
import useToken from '../hooks/useToken';
import useMusicPlayer from '../hooks/useMusicPlayer';

export default function Favorite() {
  const [music, setMusic] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { getToken } = useToken();
  const { setTracks } = useMusicPlayer();
  const navigate = useNavigate();

  useEffect(() => {
    async function getFavorite() {
      const token = getToken();
      if (token === '') navigate('/');

      const url = `${serveur}/favorite`;
      const content = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, content);

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
      } else {
        console.log("une erreur s'est produite lors de l'appel à /music");
      }
    }
    getFavorite();
  }, []);

  return (
    <div className="main-view-container">
      <MusicList music={music} favorites={favorites} />
    </div>
  );
}
