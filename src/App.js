import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './components/home';
import Mediaplayer from './components/mediaplayer';
import Menu from './components/menu';
import Search from './components/search';
import Profile from './components/profile';

import { MusicPlayerProvider } from './MusicPlayerContext';
import { TokenContextProvider } from './TokenContext';

export default function App() {
  return (
    <div className="App">
      <MusicPlayerProvider>
        <div className="main-container">
          <div className="content">
            <TokenContextProvider>
              <HashRouter>
                <Menu />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </HashRouter>
            </TokenContextProvider>
          </div>
        </div>
        <Mediaplayer />
      </MusicPlayerProvider>
    </div>
  );
}
