import React from 'react';

import Collection from './collection';

import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Collection title="new" />
      <Collection title="popular" />
    </div>
  );
};

export default Home;
