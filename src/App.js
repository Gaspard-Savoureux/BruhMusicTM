import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './components/home';
import Mediaplayer from './components/mediaplayer';
import Menu from './components/menu';
import Search from './components/search';
import Profile from './components/profile';
import Favorite from './components/favorite';
import Settings from './components/settings';
import AlbumInfo from './components/album-info';
import Album from './components/album';

import { MusicPlayerProvider } from './MusicPlayerContext';
import { TokenContextProvider } from './TokenContext';

export default function App() {
  return (
    <div className="App">
      <MusicPlayerProvider>
        <TokenContextProvider>
          <div className="main-container">
            <div className="content">
              <HashRouter>
                <Menu />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/favorite" element={<Favorite />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/album" element={<Album />} />
                  <Route path="/album/:id" element={<AlbumInfo />} />
                </Routes>
              </HashRouter>
            </div>
          </div>
          <Mediaplayer />
        </TokenContextProvider>
      </MusicPlayerProvider>
    </div>
  );
}
