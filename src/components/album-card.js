import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/collection.css';

const AlbumCard = (props) => {
  return (
    <Link to={`/album/${props.data.id}`} className="album-card">
      <img
        className="album-card-cover"
        src={props.data.cover}
        alt={props.data.title}
      />
      <div className="album-card-title">{props.data.title}</div>
      <div className="album-card-artist">{props.data.artist}</div>
    </Link>
  );
};

export default AlbumCard;
