import React from 'react';
import Music from './music';

const MusicList = ({ music, favorites }) => {
  return (
    <div className="ml-container">
      <div className="ml-header">
        <div className="ml-header-song-number">#</div>
        <div className="ml-header-title">Title</div>
        <div className="ml-header-duration">Duration</div>
      </div>
      <div className="ml-list">
        {music?.map((item) => (
          <Music
            music={item}
            songNum={music.indexOf(item) + 1}
            favorites={favorites}
            key={item.id}
          />
        )) ?? ''}
      </div>
    </div>
  );
};

export default MusicList;
