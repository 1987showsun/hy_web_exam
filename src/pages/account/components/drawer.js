import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from "react-router-dom";
import Drawer from "rc-drawer";

// Components
import Slick from './slick';

// Icons
import { HiChevronLeft } from 'react-icons/hi';

export default React.memo(({
}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const viewShortId = searchParams.get('short_id')
    const [ stateOpen  , setOpen        ] = useState(false);

    const onCloase = () => {
        searchParams.delete('short_id');
        setSearchParams(searchParams);
    }

    useEffect(() => {
        setOpen( viewShortId? true:false);
    }, [viewShortId]);

    const setOpenStatus = useMemo(() => stateOpen, [stateOpen]);

    return(
        <Drawer
            getContainer = "#root"
            open         = {setOpenStatus}
            width        = "414px"
            handler      = {false}
            level        = {null}
            autoFocus    = {false}
            showMask     = {true}
            maskClosable = {true}
            placement    = "right"
            onClose      = {onCloase.bind(this)}
        >
            <div className="drawer-header">
            <button
                className    = "drawer-prev"
                onClick      = {onCloase.bind(this)}
            >
                <HiChevronLeft size="20px" />
            </button>
            </div>
            <div className="drawer-container">
                {
                    setOpenStatus && 
                        <Slick />
                }
            </div>
        </Drawer>
    );
})