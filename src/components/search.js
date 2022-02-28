import React, { useState, useEffect } from 'react';

import MusicList from './music-list';

import useMusicPlayer from '../hooks/useMusicPlayer';
import '../styles/container.css';
import '../styles/form-components.css';

import { serveur } from '../const';
import useToken from '../hooks/useToken';

export default function Search() {
  const [filteredMusic, setFilteredMusic] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [favorites, setFavorites] = useState([]);
  const { getToken } = useToken();
  const token = getToken();

  const { setTracks } = useMusicPlayer();

  function handleSearchChange(event) {
    setSearchFilter(event.target.value);
  }

  const onSubmitSearch = async (event) => {
    event.preventDefault();
    if (searchFilter !== '') {
      const url = `${serveur}/music?title=${searchFilter}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const tracks = data.map((track) => {
          return { ...track, isFavorite: favorites.includes(track.id) };
        });
        setFilteredMusic(tracks);
        setTracks(tracks);
      } else {
        console.log("une erreur s'est produite lors de l'appel à /music");
      }
    } else {
      setFilteredMusic(filteredMusic);
    }
  };

  useEffect(() => {
    async function getFavorite() {
      const url = `${serveur}/favorite`;
      const content = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, content);

      if (res.ok) {
        const data = await res.json();
        const { length } = data;
        const idFav = [];
        for (let i = 0; i < length; i += 1) {
          idFav.push(data[i].music_id);
        }
        setFavorites(idFav);
      } else {
        console.log("une erreur s'est produite lors de l'appel à /music");
      }
    }
    if (token) getFavorite();
  }, []);

  return (
    <div className="main-view-container">
      <div className="section-title">Recherche</div>
      <form className="search-bar-container" onSubmit={onSubmitSearch}>
        <input
          className="search-bar"
          type="text"
          placeholder="Recherche"
          onChange={handleSearchChange}
        />
        <div
          className="search-button"
          onClick={onSubmitSearch}
          onKeyDown={onSubmitSearch}
        >
          <i className="fas fa-search" aria-hidden="true" />
        </div>
      </form>
      <MusicList music={filteredMusic} favorites={favorites} />
    </div>
  );
}
