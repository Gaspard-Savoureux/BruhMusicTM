import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/collection.css';
import '../styles/playlist.css';

const Playlist = ({ id, name, description }) => {
  return (
    <Link to={`/playlists/${id}`} className="card">
      <div className="container playlist" id={id}>
        <h1>
          <b>{name}</b>
        </h1>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default Playlist;
