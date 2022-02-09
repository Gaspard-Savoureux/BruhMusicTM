import React, { useRef, useEffect } from 'react';
import '../styles/mediaplayer.css';

import useMusicPlayer from '../hooks/useMusicPlayer';

const Mediaplayer = () => {
  const {
    // trackList,
    currentTrackName,
    togglePlay,
    isPlaying,
    // mute,
    // changeProgress,
    volume,
    duration,
  } = useMusicPlayer();

  // const [timelineIsClicked, setTimelineIsClicked] = useState(false);
  // const [audio, setAudio] = useState(new Audio('./sample.mp3'));
  // const [musicIsPlaying, setMusicIsPlaying] = useState(false);
  // const [musicIsFavorite, setMusicIsFavorite] = useState(false);
  // const [currentTime, setCurrentTime] = useState('0:00');
  // const [duration, setDuration] = useState('0:00');
  // const [volume, setVolume] = useState(1);
  // const [volumePreMute, setVolumePreMute] = useState(1);
  const timeline = useRef();
  const timelineProgressBar = useRef();
  const volumeSlider = useRef();
  const volumeSliderProgressBar = useRef();

  // useEffect(() => {
  //   audio.ontimeupdate = () => {
  //     if (!timelineIsClicked) {
  //       setCurrentTime(formatTime(audio.currentTime));
  //       setDuration(formatTime(audio.duration));
  //       timelineProgressBar.current.style.width = `${
  //         (audio.currentTime / audio.duration) * 100
  //       }%`;
  //     }
  //   };
  // }, [audio.currentTime, audio, timelineIsClicked]);

  // useEffect(() => {
  //   audio.onended = () => {
  //     setMusicIsPlaying(false);
  //     // load next track if there is none setMusicIsPlaying to false
  //   };
  //   audio.onloadedmetadata = () => {
  //     setCurrentTime(formatTime(audio.currentTime));
  //     setDuration(formatTime(audio.duration));
  //   };
  // }, [audio]);

  // const backButtonHandler = () => {
  //   if (audio.currentTime > 3) {
  //     audio.currentTime = 0;
  //   }
  // };

  // const forwardButtonHandler = () => {
  // go to next song, if there is none stop current song
  //};

  // const changeProgress = (event, slider) => {
  //   let progressValue =
  //     ((event.clientX - slider.current.getBoundingClientRect().left) / // degeulasse
  //       parseInt(window.getComputedStyle(slider.current).width, 10)) *
  //     100;
  //   if (progressValue > 100) {
  //     progressValue = 100;
  //   } else if (progressValue < 0) {
  //     progressValue = 0;
  //   }
  //   return progressValue;
  // };

  // TODO factoriser les fonctions "mouseDown"
  // const mouseDownTimeline = (event) => {
  //   setTimelineIsClicked(true);
  //   let progressValue = changeProgress(event, timeline);
  //   timelineProgressBar.current.style.width = `${progressValue}%`;
  //   document.onmousemove = (eventMouseMove) => {
  //     progressValue = changeProgress(eventMouseMove, timeline);
  //     timelineProgressBar.current.style.width = `${progressValue}%`;
  //     setCurrentTime(formatTime((progressValue / 100) * audio.duration));
  //   };
  //   document.onmouseup = () => {
  //     audio.currentTime = (progressValue / 100) * audio.duration;
  //     setTimelineIsClicked(false);
  //     document.onmouseup = null;
  //     document.onmousemove = null;
  //   };
  // };

  // const mouseDownVolumeSlider = (event) => {
  //   let progressValue = changeProgress(event, volumeSlider);
  //   volumeSliderProgressBar.current.style.width = `${progressValue}%`;
  //   setVolume(progressValue / 100);
  //   audio.volume = progressValue / 100;
  //   document.onmousemove = (eventMouseMove) => {
  //     progressValue = changeProgress(
  //       eventMouseMove,
  //       volumeSlider,
  //       volumeSliderProgressBar,
  //     );
  //     volumeSliderProgressBar.current.style.width = `${progressValue}%`;
  //     setVolume(progressValue / 100);
  //     audio.volume = progressValue / 100;
  //   };
  //   document.onmouseup = () => {
  //     document.onmouseup = null;
  //     document.onmousemove = null;
  //   };
  // };

  // const mute = () => {
  //   if (volume !== -1) {
  //     audio.volume = 0;
  //     setVolumePreMute(volume);
  //     setVolume(-1);
  //   } else {
  //     audio.volume = volumePreMute;
  //     setVolume(volumePreMute);
  //   }
  // };

  return (
    <div className="media-player">
      <div className="media-player-container">
        <div className="media-player-items-left">
          <img className="album-cover-icon" src="bunny.png" alt="album cover" />
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
            {/* <div className="media-player-button"> */}
            {/*   {musicIsFavorite ? ( */}
            {/*     <i className="fas fa-heart" /> */}
            {/*   ) : ( */}
            {/*     <i className="far fa-heart" /> */}
            {/*   )} */}
            {/* </div> */}
          </div>
          <div className="media-player-timeline-container">
            {/* <div className="current-time">{currentTime}</div> */}
            <div
              className="media-player-timeline-clickable"
              ref={timeline}
              /* onMouseDown={mouseDownTimeline} */
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
          <div className="media-player-button" onClick={() => mute()}>
            {volume >= 0.3 && <i className="fas fa-volume-up" />}
            {volume < 0.3 && volume > 0 && <i className="fas fa-volume-down" />}
            {volume === 0 && <i className="fas fa-volume-off" />}
            {volume === -1 && <i className="fas fa-volume-mute" />}
          </div>
          <div
            className="media-player-volume-clickable"
            ref={volumeSlider}
            /* onMouseDown={mouseDownVolumeSlider} */
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
