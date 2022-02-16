import React from 'react';
import { serveur } from '../const';
import '../styles/music.css';

import useMusicPlayer from '../hooks/useMusicPlayer';

export default function Music({ music, songNum }) {
  const { playTrack, formatTime } = useMusicPlayer();

  const duration = formatTime(music.duration);

  const changeAudio = () => {
    const track = `${serveur}/uploads/${music.file_name}`;
    playTrack(track, music.duration, music.title);
  };

  return (
    <div
      className="music-container"
      role="button"
      onClick={changeAudio}
      onKeyDown={changeAudio}
      tabIndex={0}
    >
      <div className="music-grid">
        <div className="music-num">{songNum}</div>
        <div className="music-info-box">
          <div className="music-title">{music.title}</div>
          <div className="music-artist">{music.user_id}</div>
          </div>
        <div className="music-duration">{formatTime(music.duration)}</div>
      </div>
    </div>
  );
}
