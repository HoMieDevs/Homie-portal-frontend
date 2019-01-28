import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import './css/RosterAdmin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
axios.defaults.withCredentials = true;

export default class RosterAdmin extends Component {
    
  render() {
    return (
      <Fragment>
        <Header/>
          <div className="weekRoster">
            <div className="dayContainer">
              <div className="addStaffBtn">
                <FontAwesomeIcon 
                  className="addUserIcon"
                  icon="user-plus"
                  color="#fff"
                  size="lg"
                />
              </div>
              <div className="dateContainer">
                <p className="rostDayName">
                  Mon
                </p>
                <p className="rostDayNum">
                  28th
                </p>
                <p className="rostMonth"> 
                  Jan 
                </p>
              </div>
              <div className="staffContainer">
                <p>
                  No Staff Selected
                </p>
              </div>
            </div>
            <div className="dayContainer">
              <div className="addStaffBtn">
                <FontAwesomeIcon 
                  className="addUserIcon"
                  icon="user-plus"
                  color="#fff"
                  size="lg"
                />
              </div>
              <div className="dateContainer">
                <p className="rostDayName">
                  Tue
                </p>
                <p className="rostDayNum">
                  29th
                </p>
                <p className="rostMonth"> 
                  Jan 
                </p>
              </div>
              <div className="staffContainer">
                <p>
                  No Staff Selected
                </p>
              </div>
            </div>
            <div className="dayContainer">
              <div className="addStaffBtn">
                <FontAwesomeIcon 
                  className="addUserIcon"
                  icon="user-plus"
                  color="#fff"
                  size="lg"
                />
              </div>
              <div className="dateContainer">
                <p className="rostDayName">
                  Wed
                </p>
                <p className="rostDayNum">
                  30th
                </p>
                <p className="rostMonth"> 
                  Jan 
                </p>
              </div>
              <div className="staffContainer">
                <p>
                  No Staff Selected
                </p>
              </div>
            </div>
            <div className="dayContainer">
              <div className="addStaffBtn">
                <FontAwesomeIcon 
                  className="addUserIcon"
                  icon="user-plus"
                  color="#fff"
                  size="lg"
                />
              </div>
              <div className="dateContainer">
                <p className="rostDayName">
                  Thu
                </p>
                <p className="rostDayNum">
                  31st
                </p>
                <p className="rostMonth"> 
                  Jan 
                </p>
              </div>
              <div className="staffContainer">
                <p>
                  No Staff Selected
                </p>
              </div>
            </div>
            <div className="dayContainer">
              <div className="addStaffBtn">
                <FontAwesomeIcon 
                  className="addUserIcon"
                  icon="user-plus"
                  color="#fff"
                  size="lg"
                />
              </div>
              <div className="dateContainer">
                <p className="rostDayName">
                  Fri
                </p>
                <p className="rostDayNum">
                  1st
                </p>
                <p className="rostMonth"> 
                  Feb 
                </p>
              </div>
              <div className="staffContainer">
                <p>
                  No Staff Selected
                </p>
              </div>
            </div>
            <div className="dayContainer">
              <div className="addStaffBtn">
                <FontAwesomeIcon 
                  className="addUserIcon"
                  icon="user-plus"
                  color="#fff"
                  size="lg"
                />
              </div>
              <div className="dateContainer">
                <p className="rostDayName">
                  Sat
                </p>
                <p className="rostDayNum">
                  2nd
                </p>
                <p className="rostMonth"> 
                  Feb 
                </p>
              </div>
              <div className="staffContainer">
                <p>
                  No Staff Selected
                </p>
              </div>
            </div>
            <div className="dayContainer">
              <div className="addStaffBtn">
                <FontAwesomeIcon 
                  className="addUserIcon"
                  icon="user-plus"
                  color="#fff"
                  size="lg"
                />
              </div>
              <div className="dateContainer">
                <p className="rostDayName">
                  Sun
                </p>
                <p className="rostDayNum">
                  3rd
                </p>
                <p className="rostMonth"> 
                  Feb 
                </p>
              </div>
              <div className="staffContainer">
                <p>
                  No Staff Selected
                </p>
              </div>
            </div>
          </div>
        <Footer/>
      </Fragment>
    )
  }
}
