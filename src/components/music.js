import React from 'react';
import { serveur } from '../const';
import '../styles/music.css';

import useMusicPlayer from '../hooks/useMusicPlayer';

function Music({ music }) {
  const { playTrack, formatTime } = useMusicPlayer();

  const duration = formatTime(music.duration);

  const changeAudio = () => {
    const track = `${serveur}/uploads/${music.file_name}`;
    playTrack(track, duration, music.title);
  };

  return (
    <div
      className="music"
      role="button"
      onClick={changeAudio}
      onKeyDown={changeAudio}
      tabIndex={0}
    >
      <div className="title">{music.title}</div>
      <div className="duration">{duration}</div>
    </div>
  );
}

export default Music;
