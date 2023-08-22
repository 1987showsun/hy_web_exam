/* eslint-disable import/no-anonymous-default-export */
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ShortsList } from '../../../components/list';

export default ({
}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { collection = [] } = useSelector((state) => state.account);
    
    return(
        <ShortsList>
            {
              collection.map((item, i) => {
                const { id, cover, title } = item;
                return (
                  <button 
                    key       = {id} 
                    className = "shorts-list-item-button"
                    onClick   = {() => {
                        searchParams.set('short_id', id);
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