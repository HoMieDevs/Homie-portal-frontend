import React, { Component, Fragment } from 'react'
import axios from 'axios';
// import Header from './Header';
import Navigation from './Navigation';
import './css/Home.css'
axios.defaults.withCredentials = true;

export default class Home extends Component {
    
  render() {
    return (
      <Fragment>
        <Navigation />
        <div className="home">
          <h3>Upcoming Shifts</h3>
          <div className="homeShiftContainer">
            <div className="homeShift hs1">
              <p className="homeDate">Wed 23rd Jan</p>
              <hr className="blueLine"/>
              <p className="homeTime">10am - 6pm</p>
              <p className="homeLocation">In Store</p>
            </div>
            <div className="homeShift hs2">
              <p className="homeDate">Wed 23rd Jan</p>
              <hr className="blueLine"/>
              <p className="homeTime">10am - 6pm</p>
              <p className="homeLocation">In Store</p>
            </div>
            <div className="homeShift hs3">
              <p className="homeDate">Wed 23rd Jan</p>
              <hr className="blueLine"/>
              <p className="homeTime">10am - 6pm</p>
              <p className="homeLocation">In Store</p>
            </div>
            <div className="homeShift hs4">
              <p className="homeDate">Wed 23rd Jan</p>
              <hr className="blueLine"/>
              <p className="homeTime">10am - 6pm</p>
              <p className="homeLocation">In Store</p>
            </div>
            <div className="homeShift hs5">
              <p className="homeDate">Wed 23rd Jan</p>
              <hr className="blueLine"/>
              <p className="homeTime">10am - 6pm</p>
              <p className="homeLocation">In Store</p>
            </div>
          </div>
          <h3>Hours Worked</h3>
          <p className="homeBook">8 Hours</p>
        </div>
      </Fragment>
    )
  }
}
