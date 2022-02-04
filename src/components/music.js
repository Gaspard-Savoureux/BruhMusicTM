import React from 'react';

import '../styles/music.css';

function Music({ music }) {
  const date = new Date(null);
  date.setSeconds(music.duration);
  const result = date.toISOString().substr(14, 5);
  return (
    <div className="music">
      <div className="title">{music.title}</div>
      <div className="duration">{result}</div>
    </div>
  );
}

export default Music;
