import React, { useEffect, useState } from 'react';
import Music from './music';

import Collection from './collection';

import '../styles/home.css';
import '../styles/search.css';
import { serveur } from '../const';

export default function Search() {
  const [musics, setMusics] = useState([]);
  const [filteredMusics, setFilteredMusics] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');

  function handleSearchChange(event) {
    setSearchFilter(event.target.value);
  }

  async function onClickSearch() {
    if (searchFilter !== '') {
      const url = `${serveur}/music?title=${searchFilter}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setFilteredMusics(data);
      } else {
        console.log("une erreur s'est produite lors de l'appel à /api/podcast");
      }
    } else {
      setFilteredMusics(musics);
    }
  }

  // useEffect(() => {
  //   async function componentDidMount() {
  //     const url = `${serveur}/music`;
  //     const res = await fetch(url);
  //     if (res.ok) {
  //       const data = await res.json();
  //       setMusics(data);
  //       setFilteredMusics(data);
  //     } else {
  //       console.log("une erreur s'est produite lors de l'appel à /music");
  //     }
  //   }

  //   componentDidMount().then(() => console.log('componentDidMount terminé'));
  // }, [setMusics]);
  // ajouter un handleOnInput qui attend deux secondes pour search
  return (
    <div className="home-container">
      <Collection title="Search" />
      <input
        className="search"
        type="text"
        placeholder="Search"
        onChange={handleSearchChange}
      />
      <button type="submit" onClick={onClickSearch}>
        Search
      </button>
      <div className="row columns is-multiline">
        {filteredMusic.length != 0 && (
          filteredMusics.map((music) => (
            <Music music={music} key={music.id} />
          ))
        }

      </div>
    </div>
  );
}
