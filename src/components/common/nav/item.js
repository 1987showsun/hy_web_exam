/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const NavItem = styled.div`
    width: 100%;
    height: 100%;
    a, button{
        appearance: none;
        border: none;
        background: transparent;
        width: 100%;
        height: 100%;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        opacity: 0.4;
        span, i{
            color: #fff;
        }
        &[data-active="true"]{
            opacity: 1;
        }
    }
    i, span{
        display: flex;
        align-self: center;
        justify-content: center;
    }
    i{
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    span{
        font-size: 0.7rem;
    }
`;


export default ({
    children= null,
    to      = null,
    onClick = null,
    active  = false
}) => {

    const selectedRenderView = useMemo(() => {
        if( to ){
            return (
                <Link data-active={active} to={to}>{children}</Link>
            );
        }else if( onClick ){
            return (
                <button data-active={active} onClick={onClick.bind(this)}>
                    {children}
                </button>
            );
        }
        return null;
    }, [to, active, onClick, children]);

    return (
        <NavItem>
            {selectedRenderView}
        </NavItem>
    );
}