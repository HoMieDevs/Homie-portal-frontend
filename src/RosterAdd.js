import React, { Component, Fragment } from 'react'
import axios from 'axios';
import './css/Register.css'
axios.defaults.withCredentials = true;

export default class RosterAdd extends Component {
  state = {
      date: null,
      location: null,
      staffMember: null,
      startTime: null,
      endTime: null
  }

  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value } )
  }

  componentDidMount = () => {
   
  }

  submitForm = (e) => {
    e.preventDefault()
    console.log(this.state)
    // const { staffMember, startTime, endTime} = this.state.newShift
    const { date, location, staffMember, startTime, endTime } = this.state
    const url = "http://localhost:5000/auth/roster"
    // const data = { staffMember, startTime, endTime}
    const staff = [{
      staffMember,
      startTime,
      endTime
    }]
    const data = { date, location, staff }
    axios.post(url, data)
      .then(resp => {
        console.log(resp)
        this.setState({ message: 'shift added', error: null})
      })
      .catch(err => {
        console.log(err.response)
        if (err.response === 403) {
          this.setState({ error: 'shift was not submitted', message: null})
        }
      })
  }

  render() {
    const { error, message } = this.state

    return (
      <Fragment>
        <div className="Roster">

          <div className="addRoster">
              
            <form className="rosterForm">

              <div className="rosterField">
                  <label htmlFor="date">Date:</label>
                  <input 
                      type="date" 
                      id="date" 
                      placeholder="Date" 
                      onFocus={(e) => e.target.placeholder = ""} 
                      onBlur={(e) => e.target.placeholder = "Date"} 
                      onChange={this.handleInputChange}
                  />
              </div>

              <div className="rosterField">
                  <label htmlFor="location">Location</label>
                  <input 
                      type="text" 
                      id="location" 
                      placeholder="Location" 
                      onFocus={(e) => e.target.placeholder = ""} 
                      onBlur={(e) => e.target.placeholder = "Location"} 
                      onChange={this.handleInputChange}
                  />
              </div>

              <div id="staff">
                <div className="rosterField">
                    <label htmlFor="staffMember">Staff:</label>
                    <input 
                        type="text" 
                        id="staffMember" 
                        placeholder="Staff Name" 
                        onFocus={(e) => e.target.placeholder = ""} 
                        onBlur={(e) => e.target.placeholder = "Staff Name"} 
                        onChange={this.handleInputChange}
                    />
                </div>

                <div className="rosterField">
                    <label htmlFor="startTime">Start Time:</label>
                    <input 
                        type="text" 
                        id="startTime" 
                        placeholder="Start Time" 
                        onFocus={(e) => e.target.placeholder = ""} 
                        onBlur={(e) => e.target.placeholder = "Start Time"} 
                        onChange={this.handleInputChange}
                    />
                </div>

                <div className="rosterField">
                    <label htmlFor="endTime">End Time:</label>
                    <input 
                        type="text" 
                        id="endTime" 
                        placeholder="End Time" 
                        onFocus={(e) => e.target.placeholder = ""} 
                        onBlur={(e) => e.target.placeholder = "End Time"} 
                        onChange={this.handleInputChange}
                    />
                </div>

              </div>

              <button className="rosterStaffBtn" onClick={this.submitForm}>+ Shift</button>

            </form>

            { error && <p>{ error }</p> }
            { message && <p>{ message }</p>}
            
          </div>

        </div>
      </Fragment>
      )
  }

}