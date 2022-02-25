import React, { useState } from 'react';
import { serveur } from '../const';
import '../styles/music.css';

import useMusicPlayer from '../hooks/useMusicPlayer';
import useToken from '../hooks/useToken';

export default function Music({ music, songNum, favorites }) {
  const { playTrack, formatTime } = useMusicPlayer();
  const [thisIsFavorite, setThisIsFavorite] = useState(
    favorites.includes(music.id),
  );
  const { getToken } = useToken();

  const imageSrc = music.image
    ? `${serveur}/uploads/${music.image}`
    : './bunny.png';
  const changeAudio = () => {
    const track = `${serveur}/uploads/${music.file_name}`;
    if (thisIsFavorite) {
      return playTrack(music.id, track, music.duration, music.title, true);
    }
    return playTrack(music.id, track, music.duration, music.title, false);
  };

  const addOrRemoveFav = async () => {
    const url = `${serveur}/favorite?musicId=${music.id}`;
    const res = await fetch(url, {
      method: thisIsFavorite ? 'DELETE' : 'POST',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    });
    if (res.ok) setThisIsFavorite(!thisIsFavorite);
  };

  const BoutonFav = () => {
    if (!getToken()) return '';
    if (thisIsFavorite) return <i className="fas fa-heart" />;
    return <i className="far fa-heart" />;
  };

  return (
    <div className="music-container">
      <div
        className="music-grid"
        role="button"
        onClick={changeAudio}
        onKeyDown={changeAudio}
        tabIndex={0}
      >
        <div className="music-num">{songNum}</div>
        <img
          className="image"
          src={imageSrc}
          width="50px"
          height="50px"
          alt={`pic-${music.id}`}
        />
        <div className="music-info-box">
          <div className="music-title">{music.title}</div>
          <div className="music-artist">{music.user_id}</div>
        </div>
        <div className="music-box-end">
          <div className="music-duration">{formatTime(music.duration)}</div>
        </div>
      </div>
      <div
        className="music-favorite"
        role="button"
        onClick={addOrRemoveFav}
        onKeyDown={addOrRemoveFav}
        tabIndex={0}
      >
        <BoutonFav />
      </div>
    </div>
  );
}
