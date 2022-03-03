import React, { useState } from 'react';
import { serveur } from '../const';
import { useNavigate } from 'react-router-dom';
import '../styles/music.css';

import useMusicPlayer from '../hooks/useMusicPlayer';
import useToken from '../hooks/useToken';

export default function OwnMusic({ music, songNum, favorites }) {
  const { playTrack, formatTime } = useMusicPlayer();
  const [num, setNum] = useState(songNum);
  const [thisIsFavorite, setThisIsFavorite] = useState(
    favorites.includes(music.id),
  );
  const { getToken } = useToken();
  const navigate = useNavigate();

  const imageSrc = music.image
    ? `${serveur}/uploads/${music.image}`
    : './bunny.png';
  const changeAudio = () => {
    const track = `${serveur}/uploads/${music.file_name}`;
    const index = songNum - 1;
    return playTrack(
      music.id,
      track,
      music.duration,
      music.title,
      thisIsFavorite,
      imageSrc,
      index,
      music.username,
    );
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

  const deleteMusic = async () => {
    const url = `${serveur}/music/${music.id}`;
    await fetch(url, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    });
    navigate('/settings');
    navigate('/owntracks');
  };

  const BoutonFav = () => {
    if (!getToken()) return '';
    if (thisIsFavorite) return <i className="fas fa-heart" />;
    return <i className="far fa-heart" />;
  };

  return (
    <div className="own-music-container">
      <div
        className="music-grid"
        role="button"
        onClick={changeAudio}
        onKeyDown={changeAudio}
        tabIndex={0}
      >
        <div className="music-num">{num}</div>
        <img
          className="image"
          src={imageSrc}
          width="50px"
          height="50px"
          alt={`pic-${music.id}`}
        />
        <div className="music-info-box">
          <div className="music-title">{music.title}</div>
          <div className="music-artist">{music.username}</div>
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
      <div
        className="trash"
        role="button"
        onClick={deleteMusic}
        onKeyDown={deleteMusic}
        tabIndex={0}
      >
        <i className="fas fa-trash-alt" />
      </div>
    </div>
  );
}
