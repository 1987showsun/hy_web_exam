/* eslint-disable import/no-anonymous-default-export */
import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Stylesheets
import '../public/stylesheets/tab.scss';

export default memo(({

}) => {

    const [ searchParams    , setSearchParams ] = useSearchParams();
    const tabType = searchParams.get('tabType');

    return(
        <ul className='tab-wrap'>
            <li>
                <button 
                    data-active = {tabType==="following"} 
                    onClick     = {() => {
                        searchParams.set('tabType', 'following');
                        setSearchParams(searchParams);
                    }}
                >
                        Following
                </button>
            </li>
            <li>
                <button 
                    data-active = {tabType==null || tabType==='foryou'} 
                    onClick     = {() => {
                        searchParams.delete('tabType');
                        setSearchParams(searchParams);
                    }}
                >
                    For you
                </button>
            </li>
        </ul>
    );
});