import React, { Component, Fragment } from "react";
import axios from "axios";
import "./css/Register.css";
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
    const { date, allDay, startTime, endTime, comment, approved } = this.state;

    const url =
      "http://localhost:5000/auth/unavailability/5c4a9b4dc8989d0ff203c621/";

    const unavailability = [
      {
        date,
        allDay,
        startTime,
        endTime,
        comment,
        approved
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

              <div className="unavailabilityField">
                <label htmlFor="approved">Approved:</label>
                <input
                  type="text"
                  id="approved"
                  placeholder="approved"
                  onFocus={e => (e.target.placeholder = "")}
                  onBlur={e => (e.target.placeholder = "approved")}
                  onChange={this.handleInputChange}
                />
              </div>

              <button className="rosterStaffBtn" onClick={this.submitForm}>
                + Shift
              </button>
            </form>

            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
          </div>
        </div>
      </Fragment>
    );
  }
}
