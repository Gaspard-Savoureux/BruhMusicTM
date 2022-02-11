import React, { useState } from 'react';

import '../styles/home.css';
import '../styles/search.css';
import '../styles/song.css'

import { serveur } from '../const';

export default function Profile() {
  

  return (
    <div className="home-container">
      <h1>Favorite Albums</h1>
      <h1>Liked Songs</h1>
      <div class="song-container">
        <img src="https://upload.wikimedia.org/wikipedia/en/e/ed/The_Weeknd_-_Kiss_Land.png" class="song-image"/>
        <div class="song-description">
          <p>Song Title</p>
          <p>Artist</p>
        </div>
      </div>
      <div class="song-container">
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Blood_of_the_Saints.jpg/220px-Blood_of_the_Saints.jpg" class="song-image"/>
        <div class="song-description">
          <p>Song Title</p>
          <p>Artist</p>
        </div>
      </div>
    </div>
  );
}
