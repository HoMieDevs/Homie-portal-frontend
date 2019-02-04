import React, { Component, Fragment } from "react";
import axios from "axios";
import "./css/Register.css";
import Home from "./Home";
import Navigation from "./Navigation";
import SubmitUnavailability from "./SubmitUnavailability";
import CurrentUser from "./CurrentUser";
axios.defaults.withCredentials = true;

export default class Unavailability extends Component {
  state = {
    date: null,
    allDay: null,
    startTime: null,
    endTime: null,
    comment: null,
    approved: null
  };

  handleInputChange = e => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  };

  submitForm = e => {
    e.preventDefault();
    console.log(this.state);
    const { date, allDay, startTime, endTime, comment } = this.state;
    const userId = localStorage.getItem("userId");

    // const url =
    //   "http://localhost:5000/auth/unavailability/5c490ad5d0df64349e49d792/";

    const url = `http://localhost:5000/auth/unavailability/${userId}/`;

    const unavailability = [
      {
        date,
        allDay,
        startTime,
        endTime,
        comment
      }
    ];

    const data = { unavailability };

    axios
      .put(url, data)
      .then(resp => {
        console.log(resp);
        this.setState({ message: "unavailability added", error: null });
      })
      .catch(err => {
        console.log(err.response);
        if (err.response === 403) {
          this.setState({
            error: "unavailability was not submitted",
            message: null
          });
        }
      });
  };

  render() {
    const { error, message } = this.state;

    return (
      <Fragment>
        <Navigation />
        <div className="Unavailability">
          <div className="addUnavailability">
            <form className="unavailabilityrForm">
              <div className="unavailabilityField">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  placeholder="Date"
                  onFocus={e => (e.target.placeholder = "")}
                  onBlur={e => (e.target.placeholder = "Date")}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="unavailabilityField">
                <label htmlFor="allDay">All Day:</label>
                <input
                  type="text"
                  id="allDay"
                  placeholder="Allday"
                  onFocus={e => (e.target.placeholder = "")}
                  onBlur={e => (e.target.placeholder = "Allday")}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="unavailabilityField">
                <label htmlFor="startTime">Start Time:</label>
                <input
                  type="text"
                  id="startTime"
                  placeholder="startTime"
                  onFocus={e => (e.target.placeholder = "")}
                  onBlur={e => (e.target.placeholder = "startTime")}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="unavailabilityField">
                <label htmlFor="endTime">End Time:</label>
                <input
                  type="text"
                  id="endTime"
                  placeholder="endTime"
                  onFocus={e => (e.target.placeholder = "")}
                  onBlur={e => (e.target.placeholder = "endTime")}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="unavailabilityField">
                <label htmlFor="comment">Comment:</label>
                <input
                  type="text"
                  id="comment"
                  placeholder="comment"
                  onFocus={e => (e.target.placeholder = "")}
                  onBlur={e => (e.target.placeholder = "comment")}
                  onChange={this.handleInputChange}
                />
              </div>
              <button className="rosterStaffBtn" onClick={this.submitForm}>
                + Submit
              </button>
            </form>

            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
          </div>
          <SubmitUnavailability />
        </div>
      </Fragment>
    );
  }
}
