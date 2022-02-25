import React from 'react';
import { Link } from 'react-router-dom';

import { serveur } from '../const';
import '../styles/collection.css';

const AlbumCard = ({ album }) => {
  const serv = album?.cover ? `${serveur}/uploads/${album.cover}` : 'bunny.png';
  console.log(album);
  return (
    <Link to={`/album/${album?.id}`} className="album-card">
      <img className="album-card-cover" src={serv} alt={album?.title} />
      <div className="album-card-title">{album?.name}</div>
      <div className="album-card-artist">{album?.artist}</div>
    </Link>
  );
};

export default AlbumCard;
