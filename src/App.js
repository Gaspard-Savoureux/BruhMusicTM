import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './components/home';
import Mediaplayer from './components/mediaplayer';
import Menu from './components/menu';

const App = () => {
  return (
    <div className="App">
      <div className="main-container">
        <Menu />
        <div className="content">
          <HashRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </HashRouter>
        </div>
      </div>
      <Mediaplayer />
    </div>
  );
};

export default App;
