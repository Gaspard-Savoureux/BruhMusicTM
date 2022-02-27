import React, { useEffect, useState } from 'react';

import AlbumCard from './album-card';
import { serveur } from '../const';

import '../styles/container.css';

const Home = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getAlbums = async () => {
      const res = await fetch(`${serveur}/album`, {
        method: 'GET',
      });

      if (res.ok) {
        const data = await res.json();
        setAlbums(data);
      }
    };
    getAlbums();
  }, []);


  return (
    <div className="main-view-container">
      <div className="grid-collection-container">
        {albums?.map((item) => (
          <AlbumCard album={item} key={item.id} />
        )) ?? ''}
      </div>
    </div>
  );
};

export default Home;
