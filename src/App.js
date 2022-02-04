import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './components/home';
import Mediaplayer from './components/mediaplayer';
import Menu from './components/menu';
import Search from './components/search';

const App = () => {
  return (
    <div className="App">
      <div className="main-container">
        <div className="content">
          <HashRouter>
            <Menu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </HashRouter>
        </div>
      </div>
      <Mediaplayer />
    </div>
  );
};

export default App;
