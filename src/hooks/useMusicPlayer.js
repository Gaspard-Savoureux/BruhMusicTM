import { useContext } from 'react';
import { MusicPlayerContext } from '../MusicPlayerContext';

const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  function togglePlay() {
    if (state.isPlaying) {
      state.audioPlayer.pause();
    } else {
      state.audioPlayer.play();
    }
    setState((state) => ({ ...state, isPlaying: !state.isPlaying }));
  }

  function playTrack(track) {
    if (track === state.currentTrackName) {
      togglePlay();
    }
    state.audioPlayer.pause();
    state.audioPlayer = new Audio(track);
    state.audioPlayer.play();
    state.currentTrackName = track;
  }
  // function playTrack(index) {
  //   if (index === state.currentTrackIndex) {
  //     togglePlay();
  //   } else {
  //     state.audioPlayer.pause();
  //     state.audioPlayer = new Audio(state.tracks[index].file);
  //     state.audioPlayer.play();
  //     setState((state) => ({
  //       ...state,
  //       currentTrackIndex: index,
  //       isPlaying: true,
  //     }));
  //   }
  // }

  // function playPreviousTrack() {
  //   const newIndex =
  //     (((state.currentTrackIndex + -1) % state.tracks.length) +
  //       state.tracks.length) %
  //     state.tracks.length;
  //   playTrack(newIndex);
  // }

  // function playNextTrack() {
  //   const newIndex = (state.currentTrackIndex + 1) % state.tracks.length;
  //   playTrack(newIndex);
  // }

  function mute() {
    if (state.audioPlayer.volume !== -1) {
      state.premute = state.audioPlayer.volume;
      state.audioPlayer.volume = -1;
      state.volume = -1;
    } else {
      const { premute } = state.premute;
      state.audioPlayer.volume = premute;
      state.volume = premute;
    }
  }

  function changeProgress(event, slider) {
    let progressValue =
      ((event.clientX - slider.current.getBoundingClientRect().left) / // degeulasse
        parseInt(window.getComputedStyle(slider.current).width, 10)) *
      100;
    if (progressValue > 100) {
      progressValue = 100;
    } else if (progressValue < 0) {
      progressValue = 0;
    }
    return progressValue;
  }

  function volume() {
    return 0;
  }

  return {
    playTrack,
    togglePlay,
    currentTrackName:
      state.currentTrackIndex !== null &&
      state.tracks[state.currentTrackIndex].name,
    trackList: state.tracks,
    isPlaying: state.isPlaying,
    // playPreviousTrack,
    // playNextTrack,
    mute,
    changeProgress,
    volume,
  };
};

export default useMusicPlayer;
