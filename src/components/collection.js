import React from 'react';

import '../styles/collection.css';

const Collection = (props) => {
  return (
    <div className="collection-container">
      <div className="collection-title">{props.title}</div>
      <div className="collection-album-container">

      </div>
    </div>
  );
};

export default Collection;
