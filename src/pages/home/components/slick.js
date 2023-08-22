/* eslint-disable import/no-anonymous-default-export */
import { memo, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';

// Components
import Video from '../../../components/videoJS';
import Modal from '../../../components/modal';

import 'swiper/css';
import 'swiper/css/pagination';

export default memo(({
    tabType = null
}) => {

    const swiperRef = useRef(null);
    
    const { 
        foryouShorts   = [],
        folloingShorts = []
    } = useSelector((state) => state.home);

    const [ stateCurrentPlayItem, setCurrentPlayItem ] = useState({});
    const [ stateModalConfig    , setModalConfig     ] = useState({
        className: "try-alert",
        header   : "請登入會員觀看完整演片",
        maxWidth : "320px",
        open     : false,
    });

    const handleSelectListData = (type) => {
        if( type=="foryou" ){
            return foryouShorts;
        }else if( type=="following" ){
            return folloingShorts;
        }
        return [];
    }

    const handleTryConfirm = (type) => {
        switch(type){
            case 'cancel':
                setModalConfig(prev => ({ ...prev, open: false }));
                break;

            default:
                
        }
    }

    const returnList = useMemo(() => {
        return handleSelectListData(tabType);
    }, [tabType, foryouShorts, folloingShorts]);

    useEffect(() => {
        if( stateCurrentPlayItem[tabType] ){
            const findIndexItem = handleSelectListData(tabType).findIndex(item => item.id==stateCurrentPlayItem[tabType]);
            swiperRef.current?.swiper.slideTo(findIndexItem);
        }
    }, [swiperRef, tabType, stateCurrentPlayItem]);

    useEffect(() => {
        const selectedList = handleSelectListData(tabType);
        if( selectedList.length>0 ){
            const checkKeyName = stateCurrentPlayItem.hasOwnProperty(tabType);
            if(!checkKeyName){
                setCurrentPlayItem(prev => ({
                    ...prev,
                    [tabType]: selectedList[0].id
                }));
            }
        }
    }, [tabType, foryouShorts, folloingShorts]);

    return(
        <>
            <Swiper
                ref           = {swiperRef}
                direction     = {'vertical'}
                touchStartPreventDefault = {false}
                onSlideChange = {(swiper) => {
                    const { activeIndex } = swiper;
                    const findCurrentItem = returnList[activeIndex];
                    setCurrentPlayItem(prev => ({
                        ...prev,
                        [tabType]: findCurrentItem.id
                    }));
                }}
                className     = "mySwiper"
            >
                {
                    returnList.map((item,i) => {
                        const { id } = item;
                        return(
                            <SwiperSlide
                                key = {id}
                            >   
                                <Video 
                                    data          = {item}
                                    currentPlayId = {stateCurrentPlayItem[tabType]}
                                    src           = {item.play_url}
                                    tryTimeSec    = {4} // sec default: null
                                    tryTimeReturn = {() => setModalConfig(prev => ({ ...prev, open: true }))}
                                />
                            </SwiperSlide>
                        );
                    })
                }
            </Swiper>

            <Modal
                {...stateModalConfig}
                footer = {
                    <>
                        <button className='main' onClick={handleTryConfirm.bind(this, 'signin')}>登入短影音</button>
                        <button className='vice' onClick={handleTryConfirm.bind(this, 'cancel')}>取消</button>
                    </>
                }
            >
                <p>登入會員觀看更多短影片，享受更多功能</p>
            </Modal>
        </>
    );
});