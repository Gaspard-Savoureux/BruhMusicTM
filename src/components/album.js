import React, { useEffect, useState } from 'react';

import AlbumCard from './album-card';

import { serveur } from '../const';
import '../styles/container.css';

const Album = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getAlbums = async () => {
      const res = await fetch(`${serveur}/album`, {
        method: 'GET',
      });

      if (res.ok) {
        const data = await res.json();
        setAlbums(data);
        console.log(data);
      }
    };
    getAlbums();
  }, []);

  return (
    <div className="main-view-container">
      {/* <Collection title="new" albums={albumsTest} /> */}
      {/* <Collection title="popular" albums={albumsTest} /> */}
      <div className="grid-collection-container">
        {albums?.map((album) => (
          <AlbumCard album={album} key={album.id} />
        ))}
      </div>
    </div>
  );
};

export default Album;
