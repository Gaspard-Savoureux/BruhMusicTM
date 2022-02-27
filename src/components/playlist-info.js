import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { serveur } from '../const';
import MusicList from './music-list';
import useMusicPlayer from '../hooks/useMusicPlayer';

import '../styles/album-info.css';

export default function PlaylistInfo() {
  const { id } = useParams();
  const [music, setMusic] = useState(null);
  const [favorite, setFavorites] = useState([]);
  const { setTracks } = useMusicPlayer();

  useEffect(() => {
    // TODO fetch album information
    const getPlaylistInfo = async () => {
      const res = await fetch(`${serveur}/playlists-music/${id}`, {
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        const { length } = data;
        const idFav = [];
        for (let i = 0; i < length; i += 1) {
          idFav.push(data[i].music_id);
        }
        setFavorites(idFav);
        const tracks = data.map((track) => {
          return { ...track, isFavorite: true };
        });
        setMusic(tracks);
        setTracks(tracks);
      }
    };
    getPlaylistInfo();
  }, []);

  return (
    music != null && (
      <div className="albuminfo-container">
        <div className="albuminfo-header">
          <img
            className="albuminfo-image"
            src={music?.image ?? './bunny.png'}
            alt="album cover"
          />
          <div className="albuminfo-infobox">
            <div className="albuminfo-title">{music?.title ?? ''}</div>
            <div className="albuminfo-artist">{music?.description ?? ''}</div>
          </div>
        </div>
        <div className="main-view-container">
          <MusicList music={music} favorites={favorite} />
        </div>
      </div>
    )
  );
}
