import React, { useEffect, useState } from 'react';
import Music from './music';
import { serveur } from '../const';
import useToken from '../hooks/useToken';

const MusicList = ({ music }) => {
  const [favorites, setFavorites] = useState([]);
  const { getToken } = useToken();

  const token = getToken();
  useEffect(() => {
    async function getFavorite() {
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
      } else {
        console.log("une erreur s'est produite lors de l'appel à /music");
      }
    }
    if (token) getFavorite();
  }, []);

  return (
    <div className="ml-container">
      <div className="ml-header">
        <div className="ml-header-song-number">#</div>
        <div className="ml-header-title">Title</div>
        <div className="ml-header-duration">Duration</div>
      </div>
      <div className="ml-list">
        {music?.map((item) => (
          <Music
            music={item}
            songNum={music.indexOf(item) + 1}
            favorites={favorites}
            key={item.id}
          />
        )) ?? ''}
      </div>
    </div>
  );
};

export default MusicList;
