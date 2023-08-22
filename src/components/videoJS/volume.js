/* eslint-disable import/no-anonymous-default-export */
import { memo, useMemo } from 'react';


// Icons
import { BsFillVolumeMuteFill } from 'react-icons/bs';

export default memo(({
    muted        = true,
    handleVolume = () => {}
}) => {

    const displayVolumeButton = useMemo(() => {
        if( muted ){
            return (
                <button
                    className='volume-button'
                    onClick = {handleVolume.bind(this)}
                >
                <i>
                    <BsFillVolumeMuteFill size="18px" />
                </i>
                <span>消除靜音</span>
                </button>
            );
        }
        return null;
    }, [muted]);

    return displayVolumeButton;
});