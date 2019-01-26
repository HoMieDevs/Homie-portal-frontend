import React from 'react';
import homieLogo from './images/homie-visual-logo.svg'
import './css/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
  return (
      <header>
          <FontAwesomeIcon 
            className="avatarBorder"
            icon="user"
            color="#fff"
            size="xs"
          />
          <img className="homieLogo" src={homieLogo} alt="homie logo"/>
          <div className="signOut">
            <FontAwesomeIcon 
              icon="sign-out-alt"
              color="#fff"
              size="xs"
            />
            <p>Sign Out</p>
          </div>
      </header>
  );
}

export default Header;