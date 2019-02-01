import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Navigation from './Navigation';
import './css/Home.css'
axios.defaults.withCredentials = true;

export default class TimeOff extends Component {
    
  render() {
    return (
      <Fragment>
        <Navigation />
        <h2>Time Off</h2>
      </Fragment>
    )
  }
}
