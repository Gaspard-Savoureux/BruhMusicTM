import React, { useState } from 'react';

const MusicPlayerContext = React.createContext([{}, () => {}]);

const MusicPlayerProvider = (props) => {
  const [state, setState] = useState({
    audioPlayer: new Audio(),
    tracks: [],
    currentTrackIndex: null,
    currentTrackName: '‎',
    isPlaying: false,
    isLoaded: false,
    isMute: false,
    premute: null,
    volume: 1,
    duration: '--',
    isFavorite: false,
    image: null,
    idTrack: null,
  });

  return (
    <MusicPlayerContext.Provider value={[state, setState]}>
      {props.children}
    </MusicPlayerContext.Provider>
  );
};

export { MusicPlayerContext, MusicPlayerProvider };
