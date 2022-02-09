import React from 'react';
import { serveur } from '../const';
import '../styles/music.css';

import useMusicPlayer from '../hooks/useMusicPlayer';

function Music({ music }) {
  const { playTrack } = useMusicPlayer();
  const date = new Date(null);
  date.setSeconds(music.duration);
  const result = date.toISOString().substr(14, 5);

  const changeAudio = () => {
    const track = `${serveur}/uploads/${music.file_name}`;
    playTrack(track);
  };

  return (
    <div
      className="music"
      role="button"
      onClick={changeAudio()}
      /* onKeyDown={changeAudio()} */
      tabIndex={0}
    >
      <div className="title">{music.title}</div>
      <div className="duration">{result}</div>
    </div>
  );
}

export default Music;
