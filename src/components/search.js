import React, { useState } from 'react';

import MusicList from './music-list';

import '../styles/container.css';
import '../styles/form-components.css';

import { serveur } from '../const';

export default function Search() {
  const [filteredMusic, setFilteredMusic] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');

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
        setFilteredMusic(data);
      } else {
        console.log("une erreur s'est produite lors de l'appel à /music");
      }
    } else {
      setFilteredMusic(filteredMusic);
    }
  }

  return (
    <div className="main-view-container">
      <div className="section-title">Search</div>
      <form className="search-bar-container" onSubmit={onSubmitSearch}>
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          onChange={handleSearchChange}
        />
        <div className="search-button" onClick={onSubmitSearch}>
          <i className="fas fa-search" aria-hidden="true" />
        </div>
      </form>
      <MusicList music={filteredMusic} />
    </div>
  );
}
