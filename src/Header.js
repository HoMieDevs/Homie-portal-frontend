import React from 'react';
import homieLogo from './images/homieLogo.svg'
import './css/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
  return (
      <header className="headerContainer">
          <FontAwesomeIcon 
            className="avatarBorder"
            icon="user"
            color="#fff"
            size="lg"
          />
          <img className="homieLogo" src={homieLogo} alt="homie logo"/>
          <div className="signOut">
            <FontAwesomeIcon 
              icon="sign-out-alt"
              color="#fff"
              size="lg"
            />
            <p>Sign Out</p>
          </div>
      </header>
  );
}

export default Header;