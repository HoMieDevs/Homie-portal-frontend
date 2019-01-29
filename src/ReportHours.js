import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Navigation from './Navigation';
import './css/Home.css'
axios.defaults.withCredentials = true;

export default class ReportHours extends Component {
    
  render() {
    return (
      <Fragment>
        <Navigation />
        <h2>Report Hours</h2>
      </Fragment>
    )
  }
}
