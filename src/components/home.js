import React from 'react';

import AlbumCard from './album-card';

import '../styles/container.css';

const Home = () => {
  const albumsTest = [
    { title: "album XD", artist: "artist", cover: "./sample.mp3", cover: "bunny.png", id: 1 },
    { title: "long album name hjdhb XD2", artist: "artist", cover: "./sample.mp3", cover: "bunny.png", id: 2 },
    { title: "album XD3", artist: "artist", cover: "./sample.mp3", cover: "bunny.png", id: 3 },
    { title: "album XD", artist: "artist", cover: "./sample.mp3", cover: "bunny.png", id: 4 },
    { title: "long album name hjdhb XD2", artist: "artist", cover: "./sample.mp3", cover: "bunny.png", id: 5 },
    { title: "album XD3", artist: "artist", cover: "./sample.mp3", cover: "bunny.png", id: 6 },
    { title: "album XD", artist: "artist", cover: "./sample.mp3", cover: "bunny.png", id: 7 },
    { title: "long album name hjdhb XD2", artist: "artist", cover: "./sample.mp3", cover: "bunny.png", id: 8 },
    { title: "album XD3", artist: "artist", cover: "./sample.mp3", cover: "bunny.png", id: 9 },
  ];

  return (
    <div className="main-view-container">
      {/* <Collection title="new" albums={albumsTest} /> */}
      {/* <Collection title="popular" albums={albumsTest} /> */}
      <div className="grid-collection-container">
        {albumsTest?.map((item) => <AlbumCard data={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default Home;
