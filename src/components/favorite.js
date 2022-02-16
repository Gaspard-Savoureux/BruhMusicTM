import React, { useEffect, useState } from 'react';

import MusicList from './music-list';
// import Collection from './collection';

import '../styles/home.css';
import '../styles/search.css';

import { serveur } from '../const';
import useToken from '../hooks/useToken';

export default function Favorite() {
  const [music, setMusic] = useState([]);
  const { getToken } = useToken();

  useEffect(async () => {
    const url = `${serveur}/favorite`;
    const content = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    const res = await fetch(url, content);

    if (res.ok) {
      const data = await res.json();
      setMusic(data);
    } else {
      console.log("une erreur s'est produite lors de l'appel à /music");
    }
  }, []);

  return (
    <div className="home-container">
      <MusicList music={music} />
    </div>
  );
}
