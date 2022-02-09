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
    setState({ ...state, isPlaying: !state.isPlaying });
  }

  function playTrack(track, duration, currentTrackName) {
    if (track === state.currentTrackName) {
      togglePlay();
    }
    state.audioPlayer.pause();
    state.audioPlayer = new Audio(track);
    state.audioPlayer.play();
    setState({
      //
      ...state,
      currentTrackName,
      duration,
      isPlaying: true,
    });
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
      setState({
        //
        ...state,
        premute: state.audioPlayer.volume,
        volume: -1,
      });
      state.audioPlayer.volume = -1;
    } else {
      const { premute } = state.premute;
      state.audioPlayer.volume = premute;
      setState({ ...state, volume: premute });
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

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  }

  // function currentTime(time) {
  //   console.log(time);
  //   if (!time) return state.audioPlayer.currentTime;
  //   state.audio.currentTime = time;
  // }

  return {
    playTrack,
    togglePlay,
    currentTrackName: state.currentTrackName,
    trackList: state.tracks,
    isPlaying: state.isPlaying,
    // playPreviousTrack,
    // playNextTrack,
    mute,
    changeProgress,
    volume: state.volume,
    duration: state.duration,
    // currentTime,
    formatTime,
    audio: state.audioPlayer,
  };
};

export default useMusicPlayer;
