/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import styled from 'styled-components';
import './public/stylesheets/style.scss';

export default ({
    children = null
}) => {
    return(
        <div className="list-container">
            <div className='shorts-wrap'>
                { children.map((item, i) => {
                    return (
                        <div key={i} className='list-item'>{item}</div>
                    );
                }) }
            </div>
        </div>
    );
}