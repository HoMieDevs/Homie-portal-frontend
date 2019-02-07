import React, { Component, Fragment } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import SubmitUnavailability from "./SubmitUnavailability";
import "./css/Timeoff.css";
var moment = require("moment");
axios.defaults.withCredentials = true;

export default class TimeOff extends Component {
  state = {
    allDay: null,
    startTime: null,
    endTime: null,
    comment: null,
    approved: null,
    UserUnavailability: []
  };

  handleInputChange = e => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  };

  getUnavailabilities = () => {
    const userId = localStorage.getItem("userId");
    axios
      // .get(`${process.env.REACT_APP_DEV_API_URL}/auth/unavailibility/${userId}`)
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
  };

  submitForm = e => {
    e.preventDefault();

    const fromDate = moment(new Date(this.state.startDate));
    const toDate = moment(new Date(this.state.endDate));

    const enumerateDaysBetweenDates = function(fromDate, toDate) {
      const now = moment(new Date(fromDate));
      const dates = [];

      while (now.isSameOrBefore(toDate)) {
        dates.push(now.format("YYYY/MM/DD"));
        now.add(1, "days");
      }
      return dates.sort(function(a, b) {
        // convert date object into number to resolve issue in typescript
        // return +new Date(a.date) - +new Date(b.date);
        // console.log(dates);
        return a - b;
      });
      // return dates;
    };

    // console.log(enumerateDaysBetweenDates(fromDate, toDate).length);

    const lenghOfArray = enumerateDaysBetweenDates(fromDate, toDate).length;

    let length = 0;
    let date = moment(new Date(this.state.startDate));
    let numOfDays = 0;
    const promises = [];
    while (length < lenghOfArray) {
      const { allDay, startTime, endTime, comment } = this.state;
      const userId = localStorage.getItem("userId");

      // const url = `http://localhost:5000/auth/unavailability/${userId}/`;
      const url = `${
        process.env.REACT_APP_API_URL
      }/auth/unavailability/${userId}/`;

      date = moment(new Date(this.state.startDate))
        .add(numOfDays, "days")
        .format("YYYY-MM-DD");

      const unavailability = [
        {
          date,
          allDay,
          startTime,
          endTime,
          comment
        }
      ];

      console.log(date);
      const data = { unavailability };
      console.log(data);

      promises.push(axios.put(url, data));
      promises.push(this.getUnavailabilities());
      console.log(this.getUnavailabilities());
      length++;
      numOfDays += 1;
    }
    Promise.all(promises)
      .then(responses => {
        // console.log(responses);
        this.setState({ message: "successfully added", error: null });
      })
      // .then(resp => {
      //   console.log(resp);
      //   this.setState({ message: "unavailability added", error: null });
      // })
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
    // console.log(this.state);
    return (
      <Fragment>
        <Navigation />
        <h2>Time Off</h2>
        <div className="time-off">
          <form>
            <div className="fields">
              {/* <label className="repeat-option gr">
              <h3>Repeat:</h3> 
              <select id="allDay" onChange={this.handleInputChange}>
                <option value="once">Once</option>
                <option value="every-week">Every week</option>
              </select>
            </label> */}
              <label className="start-date gr">
                <h3>Start Date:</h3>
                <input
                  type="date"
                  className="time"
                  id="startDate"
                  placeholder="date"
                  onChange={this.handleInputChange}
                />
              </label>
              <label className="end-date gr">
                <h3>End Date:</h3>
                <input
                  type="date"
                  className="time"
                  id="endDate"
                  placeholder="date"
                  onChange={this.handleInputChange}
                />
              </label>
              <label className="all-day gr">
                <h3>All Day:</h3>
                <input
                  type="text"
                  className="time"
                  id="allDay"
                  placeholder="All Day"
                  onChange={this.handleInputChange}
                />
              </label>
              <label className="start-time gr">
                <h3>Start Time:</h3>
                <input
                  type="time"
                  className="time"
                  id="startTime"
                  placeholder="time"
                  onChange={this.handleInputChange}
                />
              </label>
              <label className="end-time gr">
                <h3>End Time:</h3>
                <input
                  type="time"
                  className="time"
                  id="endTime"
                  placeholder="time"
                  onChange={this.handleInputChange}
                />
              </label>
              <label className="comment gr">
                <h3>Comment:</h3>
                <textarea id="comment" onChange={this.handleInputChange} />
              </label>
            </div>{" "}
            {/* END fields */}
            <input
              onClick={this.submitForm}
              className="submit-button"
              type="submit"
              value="Submit"
            />
          </form>
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
          <h2>Submitted Time Off</h2>
          <SubmitUnavailability renderPage={this.getUnavailabilities} />
        </div>
      </Fragment>
    );
  }
}
