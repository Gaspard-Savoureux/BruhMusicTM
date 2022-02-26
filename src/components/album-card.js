import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/collection.css';

const AlbumCard = ({ album }) => {
  // Composante album card
  return (
    <Link to={`/album/${album?.id}`} className="album-card">
      <img
        className="album-card-cover"
        src={album?.cover ?? 'bunny.png'}
        alt={album?.name}
      />
      <div className="album-card-title">{album?.name}</div>
      <div className="album-card-artist">{album?.artist}</div>
    </Link>
  );
};

export default AlbumCard;
