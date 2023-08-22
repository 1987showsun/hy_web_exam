/* eslint-disable import/no-anonymous-default-export */
import { useRef, useState, useEffect } from 'react';

export default ({
    data          = {},
    currentPlayId = "",
    playStatus    = false,
    video         = null,
    duration      = 0,
    tryTimeSec    = null,
    tryTimeReturn = () => {}
}) => {

    const timeline = useRef(null);
    const [ stateTryTimeout    , setTryTimeout    ] = useState(false);
    const [ stateActionSwitch  , setActionSwitch  ] = useState(false);
    const [ stateTimeLineWidth , setTimeLineWidth ] = useState(0);

    const {
        id: item_id
    } = data;

    useEffect(() => {
        if( video ){
            video.ontimeupdate = () => {
                const currentTime = video.currentTime;
                setTimeLineWidth((currentTime/duration)*100);
                if( tryTimeSec && !isNaN(Number(tryTimeSec)) ){
                    if( currentTime>=tryTimeSec ){
                        video.pause();
                        tryTimeReturn('123');
                        setTryTimeout(true);
                        
                    }
                }
            }
        }
    }, [video, duration, tryTimeSec]);

    useEffect(() => {
        
        const timelineRef = timeline.current;
        const touchoffAction = e => {
            if( !stateTryTimeout ){
                const { type } = e;
                const moveLocationAction = (e) => {
                    const { type } = e;
                    const _timelineW = timelineRef.offsetWidth;
                    let offsetX = 0;
                    if( type.indexOf('touch')>-1 ){
                        offsetX    = e.touches[0].pageX;
                    }else if( type.indexOf('mouse')>-1 ){
                        offsetX    = e.offsetX;
                    }
                    const scheduleW =  (offsetX/_timelineW)*100;
                    setTimeLineWidth( scheduleW );
                    video.currentTime = duration * (scheduleW/100);
                    return false;
                }

                if( type==="mousedown" || type==="touchstart" ){
                    // console.log(type);
                    setActionSwitch(true);
                    video.pause();
                    moveLocationAction(e);
                }else if( type==="mousemove" || type==="touchmove" ){
                    if( stateActionSwitch ){
                        moveLocationAction(e);
                    }
                }else{
                    setActionSwitch(false);
                    if( item_id==currentPlayId ){
                        video.play();
                    }
                    // video.play();
                }
            }
        }

        timelineRef.addEventListener('mousedown', touchoffAction);
        timelineRef.addEventListener('touchstart' , touchoffAction);
        timelineRef.addEventListener('mousemove'  , touchoffAction);
        timelineRef.addEventListener("touchmove"  , touchoffAction);
        timelineRef.addEventListener("mouseup"    , touchoffAction);
        timelineRef.addEventListener("touchend"   , touchoffAction);

        return () => {
            timelineRef.removeEventListener("mousedown"  , touchoffAction);
            timelineRef.removeEventListener('touchstart' , touchoffAction);
            timelineRef.removeEventListener('mousemove'  , touchoffAction);
            timelineRef.removeEventListener("touchmove"  , touchoffAction);
            timelineRef.removeEventListener("mouseup"    , touchoffAction);
            timelineRef.removeEventListener("touchend"   , touchoffAction);
        }
}, [timeline, video, stateActionSwitch, duration, stateTryTimeout]);

    return(
        <div 
            ref       = {timeline}
            className = "player-timeLine"
            data-play = {playStatus}
        >
            <div className = 'player-timeLine-mask'>
                <div 
                    className = 'player-timeLine-CurrentTime' 
                    style     = {{
                        width: `${stateTimeLineWidth}%`
                    }}
                />
            </div>
        </div>
    );
};