import { memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// Styled components
import NavItem from './item';

// Icons
import { AiFillHome } from 'react-icons/ai';
import { FaUserFriends, FaBell } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';

import "./public/stylesheets/style.scss";

const Nav = memo(() => {

  const { pathname } = useLocation();

  const setLinkActive = useCallback(( key=null ) => {
    const pathnameToArray = pathname.match(/[A-Za-z0-9]*\w/g);
    if( !pathnameToArray ){
      return !key? true:false;
    }
    return pathnameToArray.includes(key);
  }, [pathname]);
  
  return (
    <nav>
      <NavItem
        to = "/"
        active = {setLinkActive()}
      >
        <i>
          <AiFillHome size="20px" />
        </i>
        <span>Home</span>
      </NavItem>
      <NavItem
        to = "/home"
        active = {setLinkActive('Friends')}
      >
        <i>
          <FaUserFriends size="23px" />
        </i>
        <span>Friends</span>
      </NavItem>
      <NavItem
        to = "/home"
        active = {setLinkActive('Follow')}
      >
        <i>
          <FaBell size="17px" />
        </i>
        <span>Follow</span>
      </NavItem>
      <NavItem
        to = "/account"
        active = {setLinkActive('account')}
      >
        <i>
          <FaCircleUser size="18px"/>
        </i>
        <span>User name</span>
      </NavItem>
    </nav>
  );
});

export default Nav;
