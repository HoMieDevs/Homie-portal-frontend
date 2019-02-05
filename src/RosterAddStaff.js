import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import TimePicker from 'react-time-picker';

import './css/Register.css'
axios.defaults.withCredentials = true;

export default class RosterAdd extends Component {
  state = {
      staffMember: null,
      startTime: null,
      endTime: null,
      theDate: ""
  }

  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value } )
  }

  submitForm = (e) => {
    e.preventDefault()
    const { staffMember, startTime, endTime } = this.state
    const id = this.props.match.params.id
    const url = `http://localhost:5000/auth/roster/${id}`

    const staff = [{
      staffMember,
      startTime,
      endTime
    }]
    console.log(staff)
    const data = { staff }
    axios.put(url, data)
      .then(resp => {
        // console.log(resp)
        this.setState({ message: 'shift added', error: null})
      })
      .catch(err => {
        // console.log(err.response)
        if (err.response === 403) {
          this.setState({ error: 'shift was not submitted', message: null})
        }
      })
  }

  componentDidMount = () => {
    const id = this.props.match.params.id
    const url = `http://localhost:5000/auth/roster/${id}`
    axios.get(url)
      .then(resp => { 
        console.log(resp.data)
        this.setState({ currentRoster: resp.data }, () => {
          this.setState({ theDate: this.state.currentRoster.date})
        } 
      )

    const staffUrl = "http://localhost:5000/crew/users"
    axios.get(staffUrl)
      .then(resp => {
        this.setState({ allStaff: resp.data })
      })
    })
  }

  onChange = time => this.setState({ startTime: time })
  onChange2 = time => this.setState({ endTime: time })

  render() {
    const { error, message } = this.state

    return (
      <Fragment>
        <div className="Roster">

          <div className="addRoster">
              
            <form className="rosterForm">

              <div id="staff">
                <div className="rosterField">

                    <label htmlFor="staffMember">Staff:</label>
                    <select 
                        type="text" 
                        id="staffMember" 
                        placeholder="Staff Name" 
                        onFocus={(e) => e.target.placeholder = ""} 
                        onBlur={(e) => e.target.placeholder = "Staff Name"} 
                        onChange={this.handleInputChange}
                    >
                      <option value=''>Select A Staff Member</option>
                      {this.state.allStaff ? 
                      this.state.allStaff.map(s => s ? 
                        <Fragment>
                          {
                            <option value={s._id}>{s.firstName} {s.lastName} {
                                    s.unavailability.map(u =>
                                      u.date === this.state.theDate ?
                                      u.allDay ? `| Unavailable: All Day` : 
                                      `| Unavailable: ${u.startTime} - ${u.endTime}`
                                    : null)
                            }</option>
                          }
                        </Fragment>
                        : null) 
                      : null} 
                    </select>
                </div>

                <div className="rosterField">
                    <label htmlFor="startTime">Start Time:</label>
                    <TimePicker
                      id="startTime"
                      hourHandLength={45}
                      hourHandOppositeLength={15}
                      hourHandWidth={6}
                      hourMarksLength={16}
                      hourMarksWidth={6}
                      isOpen={null}
                      locale={"en-US"}
                      maxDetail={"minute"}
                      minuteHandLength={67}
                      minuteHandOppositeLength={15}
                      minuteHandWidth={4}
                      minuteMarksWidth={2}
                      onChange={this.onChange}
                      value={this.state.startTime}
                    />
                </div>

                <div className="rosterField">
                    <label htmlFor="endTime">End Time:</label>
                    <TimePicker
                      id="endTime"
                      hourHandLength={45}
                      hourHandOppositeLength={15}
                      hourHandWidth={6}
                      hourMarksLength={16}
                      hourMarksWidth={6}
                      isOpen={null}
                      locale={"en-US"}
                      maxDetail={"minute"}
                      minuteHandLength={67}
                      minuteHandOppositeLength={15}
                      minuteHandWidth={4}
                      minuteMarksWidth={2}
                      onChange={this.onChange2}
                      value={this.state.endTime}
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