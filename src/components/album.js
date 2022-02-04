import React from 'react';

import '../styles/collection.css';

const Album = (props) => {
  return (
    <div className="collection-album">
      <img className="collection-album-cover" src={props.data.cover} alt={props.data.title} />
      <div className="collection-album-title">
        {props.data.title}
      </div>
      <div className="collection-album-artist">
        {props.data.artist}
      </div>
    </div>
  );
};

export default Album;
