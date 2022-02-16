import React, { useState } from 'react';
import MusicList from './music-list';

import Collection from './collection';

import '../styles/home.css';
import '../styles/search.css';
import { serveur } from '../const';

export default function Search() {
  const [filteredMusic, setFilteredMusic] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const exampleSongs = [
    {
      "id": 1,
      "title": "little_dark_age",
      "file_name": "|-1-|--little_dark_age.flac",
      "duration": 326.751,
      "plays": 0,
      "uploaded": "2022-02-10T20:49:43.000Z",
      "image": null,
      "user_id": 1,
      "album_id": null
    },
    {
      "id": 3,
      "title": "alt-J (∆) - Fitzpleasure (Official Music Video)",
      "file_name": "|-1-|--alt-J (∆) - Fitzpleasure (Official Music Video).flac",
      "duration": 221.344,
      "plays": 0,
      "uploaded": "2022-02-10T22:12:47.000Z",
      "image": null,
      "user_id": 1,
      "album_id": null
    },
    {
      "id": 4,
      "title": "alt-J (∆) - Fitzpleasure (Official Music Video)",
      "file_name": "|-1-|--alt-J (∆) - Fitzpleasure (Official Music Video).flac",
      "duration": 221.344,
      "plays": 0,
      "uploaded": "2022-02-10T22:12:47.000Z",
      "image": null,
      "user_id": 1,
      "album_id": null
    },
]

  function handleSearchChange(event) {
    setSearchFilter(event.target.value);
  }

  async function onSubmitSearch(event) {
    event.preventDefault();
    if (searchFilter !== '') {
      const url = `${serveur}/music?title=${searchFilter}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setFilterregisterModaledMusics(data);
      } else {
        console.log("une erreur s'est produite lors de l'appel à /music");
      }registerModal
    } else {
      setFilteredMusic(filteredMusic);
    }
  }

  return (
    <div className="home-container">
      <Collection title="Search" />
      <form className="search-bar-container" onSubmit={onSubmitSearch}>
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          onChange={handleSearchChange}
        />
        <div className="search-button" onClick={onSubmitSearch}>
          <i class="fas fa-search" aria-hidden="true"></i>
        </div>
      </form>
      <MusicList music={exampleSongs} />
    </div>
  );
}
