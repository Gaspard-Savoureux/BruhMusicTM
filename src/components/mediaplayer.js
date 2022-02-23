import React, { useRef, useEffect, useState } from 'react';
import '../styles/mediaplayer.css';

import useMusicPlayer from '../hooks/useMusicPlayer';
import { serveur } from '../const';
import useToken from '../hooks/useToken';

const Mediaplayer = () => {
  const {
    trackId,
    currentTrackName,
    togglePlay,
    isPlaying,
    isLoaded,
    isMute,
    mute,
    changeProgress,
    volume,
    setVolume,
    formatTime,
    audio,
    isFavorite,
    image,
    toggleFavorite,
  } = useMusicPlayer();

  const [timelineIsClicked, setTimelineIsClicked] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const timeline = useRef();
  const timelineProgressBar = useRef();
  const volumeSlider = useRef();
  const volumeSliderProgressBar = useRef();

  const { getToken } = useToken();

  useEffect(() => {
    audio.ontimeupdate = () => {
      if (!timelineIsClicked) {
        setCurrentTime(formatTime(audio.currentTime));
        setDuration(formatTime(audio.duration));
        timelineProgressBar.current.style.width = `${
          (audio.currentTime / audio.duration) * 100
        }%`;
      }
    };
  }, [audio.currentTime, audio, timelineIsClicked]);

  // TODO factoriser les fonctions "mouseDown"
  const mouseDownTimeline = (event) => {
    if (!isLoaded) return;
    setTimelineIsClicked(true);
    let progressValue = changeProgress(event, timeline);
    timelineProgressBar.current.style.width = `${progressValue}%`;
    document.onmousemove = (eventMouseMove) => {
      eventMouseMove.preventDefault();
      progressValue = changeProgress(eventMouseMove, timeline);
      timelineProgressBar.current.style.width = `${progressValue}%`;
      setCurrentTime(formatTime((progressValue / 100) * audio.duration));
    };
    document.onmouseup = () => {
      audio.currentTime = (progressValue / 100) * audio.duration;
      setTimelineIsClicked(false);
      document.onmouseup = null;
      document.onmousemove = null;
    };
  };

  const mouseDownVolumeSlider = (event) => {
    let progressValue = changeProgress(event, volumeSlider);
    volumeSliderProgressBar.current.style.width = `${progressValue}%`;
    setVolume(progressValue / 100);
    audio.volume = progressValue / 100;
    document.onmousemove = (eventMouseMove) => {
      eventMouseMove.preventDefault();
      progressValue = changeProgress(
        eventMouseMove,
        volumeSlider,
        volumeSliderProgressBar,
      );
      volumeSliderProgressBar.current.style.width = `${progressValue}%`;
      setVolume(progressValue / 100);
      audio.volume = progressValue / 100;
    };
    document.onmouseup = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };
  };

  async function addOrRemoveFav() {
    const url = `${serveur}/favorite?musicId=${trackId}`;
    await fetch(url, {
      method: isFavorite ? 'DELETE' : 'POST',
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    });
    toggleFavorite();
  }

  return (
    <div className="media-player">
      <div className="media-player-container">
        <div className="media-player-items-left">
          <img
            className="album-cover-icon"
            src={image ? `${serveur}/uploads/${image}` : 'bunny.png'}
            alt="album cover"
          />
          <div className="song-info-box">
            <div className="song-title">{currentTrackName}</div>
            <div className="artist-name">
              by Artist Name sdf sdf sdf sdf sdfsdfa sadf sdfs fsdf s
            </div>
          </div>
        </div>
        <div className="media-player-items-center">
          <div className="media-player-buttons">
            <div className="media-player-button">
              <i className="fas fa-random" />
            </div>
            <div
              className="media-player-button" /* onClick={() => backButtonHandler} */
            >
              <i className="fas fa-step-backward" />
            </div>
            <div className="media-player-button" onClick={togglePlay}>
              {isPlaying ? (
                <i className="fas fa-pause" />
              ) : (
                <i className="fas fa-play" />
              )}
            </div>
            <div
              className="media-player-button" /* onClick={forwardButtonHandler} */
            >
              <i className="fas fa-step-forward" />
            </div>
            <div className="media-player-button" onClick={addOrRemoveFav}>
              {isFavorite ? (
                <i className="fas fa-heart" />
              ) : (
                <i className="far fa-heart" />
              )}
            </div>
          </div>
          <div className="media-player-timeline-container">
            <div className="current-time">{currentTime}</div>
            <div
              className="media-player-timeline-clickable"
              ref={timeline}
              onMouseDown={mouseDownTimeline}
            >
              <div className="media-player-timeline">
                <div
                  className="media-player-timeline-progress"
                  ref={timelineProgressBar}
                />
                <div className="media-player-timeline-cursor" />
              </div>
            </div>
            <div className="song-duration">{duration}</div>
          </div>
        </div>
        <div className="media-player-items-right">
          <div className="media-player-button" onClick={mute}>
            {volume >= 0.3 && !isMute && <i className="fas fa-volume-up" />}
            {volume < 0.3 && volume > 0 && !isMute && (
              <i className="fas fa-volume-down" />
            )}
            {volume === 0 && !isMute && <i className="fas fa-volume-off" />}
            {isMute && <i className="fas fa-volume-mute" />}
          </div>
          <div
            className="media-player-volume-clickable"
            ref={volumeSlider}
            onMouseDown={mouseDownVolumeSlider}
          >
            <div className="media-player-volume">
              <div
                className="media-player-volume-progress"
                ref={volumeSliderProgressBar}
              />
              <div className="media-player-volume-cursor" />
            </div>
          </div>
          <div className="media-player-button">
            <i className="fas fa-music" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mediaplayer;
