import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { serveur } from '../const';
import MusicList from './music-list';

import '../styles/album-info.css';

export default function AlbumInfo() {
  const { id } = useParams();

  const [album, setAlbum] = useState(null);

  useEffect(() => {
    // TODO fetch album information
    const getAlbumInfo = async () => {
      const res = await fetch(`${serveur}/album/${id}`, {
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        setAlbum(data);
      }
    };
    getAlbumInfo();
  }, []);

  return (
    <div className="albuminfo-container">
      <div className="albuminfo-header">
        <img
          className="albuminfo-image"
          src={album?.cover ?? './bunny.png'}
          alt="album cover"
        />
        <div className="albuminfo-infobox">
          <div className="albuminfo-title">{album?.title ?? ''}</div>
          <div className="albuminfo-artist">{album?.artist ?? ''}</div>
        </div>
      </div>
      <MusicList music={album?.songs ?? []} />
    </div>
  );
}
