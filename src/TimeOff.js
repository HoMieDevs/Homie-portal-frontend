import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Navigation from './Navigation';
import SubmitUnavailability from "./SubmitUnavailability";
import './css/Timeoff.css';
axios.defaults.withCredentials = true;

export default class TimeOff extends Component {
  state = { 
    date: null,
    allDay: null,
    startTime: null,
    endTime: null,
    comment: null,
    approved: null
  }
  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value })
  }
  submitForm = (e) => {
    e.preventDefault()
    // console.log(this.state)
    const {  allDay, date, startTime, endTime, comment } = this.state
    const userId = localStorage.getItem("userId");
    const url = `http://localhost:5000/auth/unavailability/${userId}/`
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
    
    axios.put(url, data)
        .then(resp => {
            console.log(resp)
            this.setState({ message: `Time off form has been submitted`, error: null})
        })
        .catch(err => {
            console.log(err.response)
            if (err.response === 403) {
                this.setState({ error: 'Time off form submission unsuccessful', message: null})
            }
        })
}

  render() {
    const { error, message } = this.state
    console.log(this.state)
    return (
      <Fragment>
      <Navigation />
      <h2>Time Off</h2>
      <div className="time-off">
        <form>
          <div className="fields">
            <label className="repeat-option gr">
              <h3>Repeat:</h3> 
              <select id="allDay" onChange={this.handleInputChange}>
                <option value="once">Once</option>
                <option value="every-week">Every week</option>
              </select>
            </label>
            <label className="start-date gr">
              <h3>Date:</h3>
              <input type="date" className="date" id="date" placeholder="date" onChange={this.handleInputChange}/>
            </label>
            <label className="start-time gr">
              <h3>Start Time:</h3>
              <input type="time" className="time" id="startTime" placeholder="time" onChange={this.handleInputChange}/>
            </label>
            <label className="end-time gr">
              <h3>End Time:</h3>
              <input type="time" className="time" id="endTime" placeholder="time" onChange={this.handleInputChange}/>
            </label>
            <label className="comment gr">
              <h3>Comment:</h3>
              <textarea id="comment" onChange={this.handleInputChange}/>
            </label>
          </div> {/* END fields */}
          <input onClick={this.submitForm} className="submit-button" type="submit" value="Submit" />
        </form>

          <h2>Submitted Time Off</h2>
          <SubmitUnavailability />
      </div>
      { error && <p>{ error }</p> }
      { message && <p>{ message }</p>}
      </Fragment >
    );
  }
}
