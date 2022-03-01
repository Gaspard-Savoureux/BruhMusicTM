import { useContext } from 'react';
import { MusicPlayerContext } from '../MusicPlayerContext';
import { serveur } from '../const';

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
    currentTrackIndex,
    artist,
  ) {
    state.audioPlayer.setAttribute('src', track);
    state.audioPlayer.load();
    if (state.isMute) {
      state.audioPlayer.volume = 0;
    } else {
      state.audioPlayer.volume = state.volume;
    }
    state.audioPlayer.play();
    state.audioPlayer.addEventListener('ended', playNextTrack);
    setState({
      ...state,
      trackId,
      currentTrackName,
      duration,
      isPlaying: true,
      isFavorite,
      isLoaded: true,
      image: image ?? state.image,
      currentTrackIndex,
      artist,
    });
  }

  function setTracks(tracks) {
    setState({ ...state, tracks });
  }

  function playPreviousTrack() {
    const newIndex =
      (((state.currentTrackIndex - 1) % state.tracks.length) +
        state.tracks.length) %
      state.tracks.length;
    const previousTrack = state.tracks[newIndex];
    const track = `${serveur}/uploads/${previousTrack.file_name}`;
    const image = previousTrack.image
      ? `${serveur}/uploads/${previousTrack.image}`
      : 'bunny.png';

    playTrack(
      previousTrack.id,
      track,
      previousTrack.duration,
      previousTrack.title,
      previousTrack.isFavorite,
      image,
      newIndex,
    );
  }

  function playNextTrack() {
    const newIndex = (state.currentTrackIndex + 1) % state.tracks.length;
    const nextTrack = state.tracks[newIndex];
    const track = `${serveur}/uploads/${nextTrack.file_name}`;
    const image = nextTrack.image
      ? `${serveur}/uploads/${nextTrack.image}`
      : 'bunny.png';

    playTrack(
      nextTrack.id,
      track,
      nextTrack.duration,
      nextTrack.title,
      nextTrack.isFavorite,
      image,
      newIndex,
    );
  }

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
    setTracks,
    playPreviousTrack,
    playNextTrack,
    tracks: state.tracks,
    mute,
    changeProgress,
    volume: state.volume,
    setVolume,
    duration: state.duration,
    formatTime,
    audio: state.audioPlayer,
    isFavorite: state.isFavorite,
    image: state.image,
    toggleFavorite,
    artist: state.artist,
  };
};

export default useMusicPlayer;
