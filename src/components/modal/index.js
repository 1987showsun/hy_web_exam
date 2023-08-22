/* eslint-disable import/no-anonymous-default-export */
import { useRef, useEffect, useMemo } from 'react';

// Stylesheets
import './public/stylesheets/style.scss';

export default ({
    className= null,
    header   = null,
    children = null,
    maxWidth = null,
    footer   = null,
    open     = false,
    onClose  = () => {}
}) => {

    const initialClassName = 'modal-wrap';
    const modalRef = useRef(null);

    const closeWindow = (e) => {
        const eventPath = e.path || e.composedPath();
        if( eventPath[0] === modalRef.current ){
            onClose();
        }
    }

    const setClassName = useMemo(() => className? `${className} ${initialClassName}`:initialClassName, [className]);

    useEffect(() => {
        window.addEventListener('click', closeWindow, false);
        return () => {
            window.removeEventListener('click', closeWindow, false);
        }
    }, [modalRef]);

    return(
        <div 
            ref      = {modalRef}
            className= {setClassName}
            data-open= {open}
        >
            <div 
                className='modal-container'
                style    = {{
                    ...!maxWidth? null: { maxWidth: maxWidth }
                }}
            >
                {
                    header &&
                        <div className="modal-header-wrap">
                            {header}
                        </div>
                }
                {
                    children &&
                        <div className="modal-content-wrap">
                            { children }
                        </div>
                }
                <div className="modal-footer-wrap">
                    {
                        footer!==null? (
                            footer? footer:null
                        ):(
                            <>
                                <button></button>
                                <button></button>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}