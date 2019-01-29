import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Navigation from './Navigation';
import './css/MyInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
axios.defaults.withCredentials = true;

export default class MyInfo extends Component {
    
  render() {
    return (
      <Fragment>
        <Navigation />
        <h2>My Info</h2>
        <FontAwesomeIcon
          className="avatarIcon"
          icon="user"
          size="2x"
        />
        <br/>
        <button>Edit Avatar</button>
        <div className="myInfoText">
        <p>First Name:</p>
        <p>Bill</p>
        <p>Last Name:</p>
        <p>Brown</p>
        <p>Email Address:</p>
        <p>example@example.com</p>
        <p>Mobile:</p>
        <p>04 9199 8992</p>
        </div>
        <button>Edit</button>
      </Fragment>
    )
  }
}
