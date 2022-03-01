import React, { useEffect, useState } from 'react';

import AlbumCard from './album-card';

import { serveur } from '../const';
import '../styles/container.css';
import '../styles/form-components.css';

const Album = () => {
  const [albums, setAlbums] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');

  function handleSearchChange(event) {
    setSearchFilter(event.target.value);
  }

  const onSubmitSearch = async (event) => {
    event.preventDefault();
    const url =
      searchFilter !== ''
        ? `${serveur}/album?name=${searchFilter}`
        : `${serveur}/album`;
    console.log(url);
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setAlbums(data);
    } else {
      console.log("une erreur s'est produite lors de l'appel à /music");
    }
  };

  useEffect(() => {
    const getAlbums = async () => {
      const res = await fetch(`${serveur}/album`);

      if (res.ok) {
        const data = await res.json();
        setAlbums(data);
      }
    };
    getAlbums();
  }, []);

  return (
    <div className="main-view-container">
      {/* <Collection title="new" albums={albumsTest} /> */}
      {/* <Collection title="popular" albums={albumsTest} /> */}
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
      <br />
      <div className="grid-collection-container">
        {albums?.map((album) => (
          <AlbumCard album={album} key={album.id} />
        ))}
      </div>
    </div>
  );
};

// https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fregotafarla.com%2Fllucc%2FCbIhdway6aKIX-yLrUHEigHaMW.jpg&f=1&nofb=1
export default Album;
