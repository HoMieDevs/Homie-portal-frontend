import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import homieLogo from './images/homieLogo.svg';
import './css/Navigation.css';
axios.defaults.withCredentials = true;


export default class Navigation extends Component {
  handleLogout = (e) => {
    this.logout()
  }

  logout = (e) => {
    const url = "http://localhost:5000/auth/logout"
    axios.get(url)
      .then(resp => {
        console.log(resp)
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('userId')
        }
      )
  }
  render() {
  return (
    <React.Fragment>

      <header className="headerContainer">

        {/* >>>>>>>>>>>>>>>>>>>> AVATAR */}
        <div className="avatarContainer">
        <NavLink
          to="/myinfo"
          className="avatarLink"
          activeStyle={{
          color: "#3CBCD7",
          borderColor: "#3CBCD7"

        }}
        >
          <FontAwesomeIcon 
            className="avatarIcon"
            icon="user"
            size="lg"
          />
        </NavLink>
        </div>

        {/* >>>>>>>>>>>>>>>>>>>> HOMIE LOGO */}

        <NavLink
          to="/home"
          className="homieLogoMain"
        >
          <img className="homieLogo" src={homieLogo} alt="homie logo"/>
        </NavLink>

        {/* >>>>>>>>>>>>>>>>>>>> SIGN OUT */}

        <NavLink
          to="/"
          className="signOut"
          onClick={this.handleLogout}
          activeStyle={{
          color: "#3CBCD7",
        }}
        >
        <FontAwesomeIcon 
            icon="sign-out-alt"
            color="#fff"
            size="lg"
          />
          <span className="signOutText">Sign Out</span>
        </NavLink>
      </header>






      <div className="footerContainer">
        <NavLink
          to="/home"
          className="homeNav"
          activeStyle={{
          color: "#3CBCD7"
        }}
        >
          <FontAwesomeIcon 
            className="homeIcon"
            icon="home"
            size="lg"
          />
          <span className="homeText">Home</span>
          </NavLink>
        <NavLink
          to="/roster"
          className="calendar"
          activeStyle={{
          color: "#3CBCD7"
        }}
        >
          <FontAwesomeIcon 
            className="calendarIcon"
            icon="calendar-alt"
            size="lg"
          />
          <span className="rosterText">Roster</span>
        </NavLink>
        <NavLink
          to="/timeoff"
          className="timeOff"
          activeStyle={{
          color: "#3CBCD7"
        }}
        >
          <FontAwesomeIcon 
            className="unavailIcon"
            icon="calendar-times"
            size="lg"
          />
          <span className="timeOffText">Time Off</span>
        </NavLink>
        <NavLink
          to="/report"
          className="hoursNav"
          activeStyle={{
          color: "#3CBCD7"
        }}
        >
          <FontAwesomeIcon 
            className="clockIcon"
            icon="clock"
            size="lg"
          />
          <span className="hoursText">Hours</span>
        </NavLink>
      </div>
    </React.Fragment>
  );
}
}
