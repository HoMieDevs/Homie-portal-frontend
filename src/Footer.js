import React from 'react';
import './css/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer= () => {
  return (
      <div className="footerContainer">
          <div className="calendar">
            <FontAwesomeIcon 
              icon="calendar-alt"
              color="#fff"
              size="md"
            />
            <p>Roster</p>
          </div>
          <div className="timeOff">
            <FontAwesomeIcon 
              icon="calendar-times"
              color="#fff"
              size="md"
            />
            <p>Time Off</p>
          </div>
          <div className="hours">
            <FontAwesomeIcon 
              icon="clock"
              color="#fff"
              size="md"
            />
            <p>Hours</p>
          </div>
          <div className="swapShift">
            <FontAwesomeIcon 
              icon="sync"
              color="#fff"
              size="md"
            />
            <p>Swap Shift</p>
          </div>
          <div className="moreMenu">
            <FontAwesomeIcon 
              className="moreIcon"
              icon="chevron-up"
              color="#fff"
              size="xs"
            />
            <p className="moreText">More</p>
          </div>
      </div>
  );
}

export default Footer;