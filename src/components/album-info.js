import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { serveur } from '../const';
import MusicList from './music-list';

import '../styles/album-info.css';

export default function AlbumInfo() {
  // Page pour afficher un album et ses informations
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const getAlbumInfo = async () => {
      const res = await fetch(`${serveur}/album/${id}`);

      if (res.ok) {
        const data = await res.json();
        await setAlbum(data);
        console.log(data);
      } else {
        console.log(res);
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
          <div className="albuminfo-title">{album?.name ?? ''}</div>
          <div className="albuminfo-artist">{album?.genre ?? ''}</div>
        </div>
      </div>
      <MusicList music={album?.musicList ?? []} />
    </div>
  );
}
