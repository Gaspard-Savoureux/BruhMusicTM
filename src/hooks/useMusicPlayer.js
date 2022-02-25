import { useContext } from 'react';
import { MusicPlayerContext } from '../MusicPlayerContext';

const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  function togglePlay() {
    if (!state.isLoaded) return;
    if (state.isPlaying) {
      state.audioPlayer.pause();
    } else {
      state.audioPlayer.play();
    }
    setState({ ...state, isPlaying: !state.isPlaying });
  }

  function playTrack(
    trackId,
    track,
    duration,
    currentTrackName,
    isFavorite,
    image,
  ) {
    // if (track === state.currentTrackName) togglePlay();

    // state.audioPlayer.pause();
    state.audioPlayer.setAttribute('src', track);
    state.audioPlayer.load();
    if (state.isMute) {
      state.audioPlayer.volume = 0;
    } else {
      state.audioPlayer.volume = state.volume;
    }
    state.audioPlayer.play();

    setState({
      ...state,
      trackId,
      currentTrackName,
      duration,
      isPlaying: true,
      isFavorite,
      isLoaded: true,
      image: image ?? state.image,
    });
  }

  // TODO système de track list à implémenté
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
    if (state.isMute) {
      setState({ ...state, isMute: false });
      state.audioPlayer.volume = state.volume;
    } else {
      setState({ ...state, isMute: true });
      state.audioPlayer.volume = 0;
    }
  }

  function changeProgress(event, slider) {
    let progressValue =
      ((event.clientX - slider.current.getBoundingClientRect().left) /
        parseInt(window.getComputedStyle(slider.current).width, 10)) *
      100;
    if (progressValue > 100) {
      progressValue = 100;
    } else if (progressValue < 0) {
      progressValue = 0;
    }
    return progressValue;
  }

  // format le temps recu en minutes:secondes tels que 00:00
  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (Number.isNaN(minutes)) minutes = 0;
    if (Number.isNaN(seconds)) seconds = 0;
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  }

  function setVolume(value) {
    state.audioPlayer.volume = value;
    state.volume = value;
  }

  function toggleFavorite() {
    setState({ ...state, isFavorite: !state.isFavorite });
  }

  return {
    playTrack,
    togglePlay,
    trackId: state.trackId,
    currentTrackName: state.currentTrackName,
    trackList: state.tracks,
    isPlaying: state.isPlaying,
    isLoaded: state.isLoaded,
    isMute: state.isMute,
    // playPreviousTrack,
    // playNextTrack,
    mute,
    changeProgress,
    volume: state.volume,
    setVolume,
    duration: state.duration,
    // currentTime,
    formatTime,
    audio: state.audioPlayer,
    isFavorite: state.isFavorite,
    image: state.image,
    toggleFavorite,
  };
};

export default useMusicPlayer;
