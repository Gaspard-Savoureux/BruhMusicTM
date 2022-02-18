import React from 'react';
import { serveur } from '../const';
import '../styles/music.css';

import useMusicPlayer from '../hooks/useMusicPlayer';

export default function Music({ music, songNum, favorites }) {
  const { playTrack, formatTime } = useMusicPlayer();
  const isFavorite = favorites.includes(music.id);

  const changeAudio = () => {
    const track = `${serveur}/uploads/${music.file_name}`;
    if (isFavorite) playTrack(track, music.duration, music.title, true);
    else playTrack(track, music.duration, music.title, false);
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
        <div className="music-box-end">
          <div className="music-favorite">
            {isFavorite ? (
              <i className="fas fa-heart" />
            ) : (
              <i className="far fa-heart" />
            )}
          </div>

          <div className="music-duration">{formatTime(music.duration)}</div>
        </div>
      </div>
    </div>
  );
}
