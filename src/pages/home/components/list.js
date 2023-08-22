/* eslint-disable import/no-anonymous-default-export */
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ShortsList } from '../../../components/list';

export default ({
}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { shorts = [] } = useSelector((state) => state.home);

    return(
        <ShortsList>
            {
              shorts.map((item, i) => {
                const { cover, title } = item;
                return (
                  <button 
                    key       = {i} 
                    className = "shorts-list-item-button"
                    onClick   = {() => {
                        searchParams.set('view_short_id', i);
                        setSearchParams(searchParams, {replace: true});
                    }}
                  >
                    <img src={cover} alt={title} title={title}/>
                  </button>
                );
              })
            }
        </ShortsList>
    );
}