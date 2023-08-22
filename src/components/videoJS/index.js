/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { memo, useRef, useState, useEffect } from "react";
import ReactHlsPlayer from "react-hls-player";

// Components
import Volume from './volume';
import TimeLine from './timeline';

// Icons
import { BsFillPlayFill } from 'react-icons/bs';

// Stylesheets
import './public/stylesheets/style.scss';
import "react-video-seek-slider/styles.css";

export default memo(({
  data          = {},
  currentPlayId = "",
  src           = "",
  tryTimeSec    = null,
  tryTimeReturn = () => {}
}) => {

  const videoNode = useRef(null);
  const [ stateVideoMuted    , setVideoMuted    ] = useState(true);
  const [ stateTryTimeout    , setTryTimeout    ] = useState(false);
  const [ statePlayStatus    , setPlayStatus    ] = useState(false);
  const [ stateDuration      , setDuration      ] = useState(0);

  const {
    id    : item_id,
    cover = ""
  } = data;

  useEffect(() => {

    const video = videoNode.current;

    if( video ){
      if( item_id==currentPlayId ){
        const playPromise = video.play();
        playPromise.then(_ => {
          video.play();
          setPlayStatus(true);
        }).catch(error => {
          console.log( 'error===>',error );
        });
      }else{
        video.pause();
      }

      video.onplay = () => {
        setPlayStatus(true);
      }

      video.onpause = () => {
        setPlayStatus(false);
      }
      video.onended = () => {
        video.currentTime = 0;
      }

      video.onloadedmetadata = () => {
        setDuration(video.duration);
      }
    }
  }, [videoNode, item_id, currentPlayId, tryTimeSec]);

  return (
    <div className="player-wrap">
      <div data-vjs-player>
        <ReactHlsPlayer
          className = "video-js"
          playerRef = {videoNode}
          poster    = {cover}
          src       = {src}
          // src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
          autoPlay  = {false}
          controls  = {false}
          muted     = {true}
          width     = "100%"
          height    = "100%"
          playsnline= "true"
        />
      </div>
      <div className="mask-wrap">

        <Volume 
          muted        = {stateVideoMuted}
          handleVolume = {() => {
            const muted = videoNode.current.muted;
            videoNode.current.muted = !muted;
            setVideoMuted(!muted);
          }}
        />

        <div 
          className = "play-induction-wrap" 
          onClick   = {() => {
            if( !stateTryTimeout ){
              if( statePlayStatus ){
                videoNode.current.pause();
              }else{
                videoNode.current.play();
              }
            }
          }}
        >
          <button className="play-icon-wrap">
            {!statePlayStatus? <BsFillPlayFill size="40px" />:""}
          </button>
        </div>
        
        <TimeLine
          data          = {data}
          currentPlayId = {currentPlayId}
          playStatus    = {statePlayStatus}
          video         = {videoNode.current}
          duration      = {stateDuration}
          tryTimeSec    = {tryTimeSec}
          tryTimeReturn = {() => {
            setTryTimeout(true);
            tryTimeReturn();
          }}
        />
      </div>
    </div>
  );
});
