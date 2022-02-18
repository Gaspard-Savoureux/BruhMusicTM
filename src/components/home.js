import React, { useState } from 'react';

import Collection from './collection';

import '../styles/home.css';

const Home = () => {
  const albumsTest = [
    { title: "album XD", artist: "artist", cover: "./sample.mp3", cover: "bunny.png", id: 1 },
    { title: "long album name hjdhb XD2", artist: "artist", cover: "./sample.mp3", cover: "bunny.png", id: 1 },
    { title: "album XD3", artist: "artist", cover: "./sample.mp3", cover: "bunny.png", id: 1 },
  ];

  return (
    <div className="home-container">
      <Collection title="new" albums={albumsTest} />
      <Collection title="popular" albums={albumsTest} />
    </div>
  );
};

export default Home;
