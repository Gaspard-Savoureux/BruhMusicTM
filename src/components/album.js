import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/collection.css';

const Album = (props) => {
  return (
    <Link to={`/album/${props.data.id}`} className="collection-album">
      <img className="collection-album-cover" src={props.data.cover} alt={props.data.title} />
      <div className="collection-album-title">
        {props.data.title}
      </div>
      <div className="collection-album-artist">
        {props.data.artist}
      </div>
    </Link>
  );
};

export default Album;
