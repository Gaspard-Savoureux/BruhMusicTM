import React from 'react';

import Album from './album';

import '../styles/collection.css';

const Collection = (props) => {
  return (
    <div className="collection-container">
      <div className="collection-title">{props.title}</div>
      <div className="collection-albums-container">
        {props?.albums?.map(item => <Album data={item} key={item.title} />)}
      </div>
    </div>
  );
};

export default Collection;
