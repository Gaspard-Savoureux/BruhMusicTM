import React from 'react';

import AlbumCard from './album-card';

import '../styles/container.css';

const Album = () => {
  const albumsTest = [
    {
      title: 'album XD',
      artist: 'artist',
      cover: './sample.mp3',
      cover: 'bunny.png',
      id: 1,
    },
  ];

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

export default Album;
