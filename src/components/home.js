import React from 'react';

import AlbumCard from './album-card';

import '../styles/container.css';

const Home = () => {
  const albumsTest = [];

  return (
    <div className="main-view-container">
      {/* <Collection title="new" albums={albumsTest} /> */}
      {/* <Collection title="popular" albums={albumsTest} /> */}
      <div className="grid-collection-container">
        {albumsTest?.map((item) => (
          <AlbumCard data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
