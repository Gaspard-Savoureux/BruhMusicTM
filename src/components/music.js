import React from 'react';

import '../styles/collection.css';

export default function Music(music) {
  const { title } = music;
  return (
    <div className="collection-container">
      <div className="collection-title">{title}</div>
    </div>
  );
}
