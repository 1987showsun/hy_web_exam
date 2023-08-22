/* eslint-disable import/no-anonymous-default-export */
import { memo, useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSearchParams } from 'react-router-dom';

// Components
import Video from '../../../components/videoJS';

import 'swiper/css';
import 'swiper/css/pagination';

export default memo(({
    list = []
}) => {

    const swiperRef = useRef(null);
    
    const { collection = [] } = useSelector((state) => state.account);
    const [ searchParams    , setSearchParams ] = useSearchParams();
    const currentPlayId = searchParams.get('short_id');

    useEffect(() => {
        if( collection.length>0 ){
            const findIndexItem = collection.findIndex(item => item.id===currentPlayId);
            swiperRef.current?.swiper.slideTo(findIndexItem);
        }
    }, [swiperRef, collection]);

    return(
        <>
            <Swiper
                ref           = {swiperRef}
                direction     = {'vertical'}
                touchStartPreventDefault = {false}
                onSlideChange = {(swiper) => {
                    const { activeIndex } = swiper;
                    const findItem = collection.find((item,i) => i===activeIndex );
                    if( findItem ){
                        searchParams.set('short_id', findItem['id']);
                        setSearchParams(searchParams, {replace: true});
                    }
                }}
                className     = "mySwiper"
            >
                {
                    collection.map(item => {
                        const { id } = item;
                        return(
                            <SwiperSlide
                                key = {id}
                            >   
                                <Video 
                                    data          = {item}
                                    currentPlayId = {currentPlayId}
                                    src           = {item.play_url}
                                />
                            </SwiperSlide>
                        );
                    })
                }
            </Swiper>
        </>
    );
});