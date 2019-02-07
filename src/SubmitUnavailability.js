import React, { Component, Fragment } from "react";
import axios from "axios";
import "./css/Register.css";
axios.defaults.withCredentials = true;

class SubmitUnavailability extends Component {
  state = {
    UserUnavailability: []
  };

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    axios
      // .get(`${http://localhost:5000/auth/unavailibility/${userId}`)
      .get(`${process.env.REACT_APP_API_URL}/auth/unavailibility/${userId}`)
      .then(resp => {
        console.log(resp.data.UserUnavailability);
        const sorted = resp.data.UserUnavailability.sort((a, b) => {
          return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
          // return new Date(a.date) > new Date(b.date);
        });
        console.log(sorted);
        this.setState({ UserUnavailability: sorted });
      });
  }

  componentDidUpdate() {
    
  }

  deleteTimeOff = (unid) => {
    const userId = localStorage.getItem("userId");
    // .delete(`http://localhost:5000/auth/unavailability/${userId}/${unid}`)
    `${process.env.REACT_APP_API_URL}/auth/unavailability/${userId}/${unid}`
    .then(console.log('Deleted'))
    .catch(err => console.log(err))

    axios
      // .get(`http://localhost:5000/auth/unavailibility/${userId}`)
      .get(`${process.env.REACT_APP_API_URL}/auth/unavailibility/${userId}`)
      .then(resp => {
        const sorted = resp.data.UserUnavailability.sort((a, b) => {
          return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
          // return new Date(a.date) > new Date(b.date);
        });
        this.setState({ UserUnavailability: sorted });
      });
  }

  render() {
    return (
      <div className="main">
        {this.state.UserUnavailability.map((unavailability, index) => {
          // console.log(unavailability.allDay)
          return (
            <Fragment>
            <div className="individual-time-off">
              <li className="time-off-date"><span>Date: </span> {unavailability.date}</li>
              <li className="time-off-start-time"><span>Start Time: </span> {unavailability.startTime}</li>
              <li className="time-off-end-time"><span>End Time: </span> {unavailability.endTime}</li>
              <li className="time-off-all-day"><span>{unavailability.allDay ? <p>All Day: Yes</p>: null }</span></li>
              <hr className="time-off-blue-line"/>
              <li className="time-off-comment"><span>Comment: </span>{unavailability.comment}</li>
           </div>
              <input
                onClick={() => this.deleteTimeOff(unavailability._id)}
                className="delete-button"
                type="delete"
                value="Delete"
              />
            </Fragment>
          );
        })}
      </div>
    );
  }
}

export default SubmitUnavailability;