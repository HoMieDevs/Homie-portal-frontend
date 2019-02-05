import React, { Component, Fragment } from 'react'
import axios from 'axios';

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
    // console.log(this.state)
    // const { staffMember, startTime, endTime} = this.state.newShift
    const { staffMember, startTime, endTime } = this.state
    // const id = localStorage.getItem("id");
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

  // setStaff = () => {
  //   console.log('setting staff')
  //   const rosterDate = this.state.currentRoster.date
  //   const location = this.state.currentRoster.location
  //   const rosterDayUrl = `http://localhost:5000/auth/staff/${location}/${rosterDate}`
  //   axios.get(rosterDayUrl)
  //     .then(resp => {
  //       this.setState({ staffSelect: resp.data })    
  //     })
  // }
  
  // selectStaff = this.selectStaff.bind(this);

  // selectStaff(event) {
  //   this.setState({staffMember: event.target.value})
  // }
  
  // onChange = time => this.setState({ startTime: time })
  // onChange2 = time => this.setState({ endTime: time })

  render() {
    const { error, message } = this.state
    console.log(this.state.allStaff)

    // let staffList = null;
    // if(this.state.allStaff) {
    //   staffList = this.state.allStaff.map(st => {
    //     if(st.unavailability.length > 0) {
    //       st.unavailability.map(u => {
    //         if(u.date === this.state.theDate) {
    //           if(u.allDay) {
    //             return `${st.firstName} ${st.lastName} | Unavailable: All Day`
    //           } else {
    //             return `${st.firstName} ${st.lastName} | Unavailable: ${u.startTime} - ${u.endTime}`
    //           }
    //         }
    //       })
    //     } else {
    //       return `${st.firstName} ${st.lastName}`
    //     }
    //   })
    // }

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
                          {/* {
                              
                                s.unavailability.map(u =>
                                  u.date === this.state.theDate ?
                                  u.allDay ? <option value={s._id}>{s.firstName} {s.lastName} | Unavailable: All Day</option> : 
                                  <option value={s._id}>{s.firstName} {s.lastName} | Unavailable: {u.startTime} - {u.endTime}</option>
                                : <option value={s._id}>{s.firstName} {s.lastName}</option>)
                             
                          } */}
                          {/* {
                            <option value={s._id}>{s.firstName} {s.lastName} {
                              s.unavailability.length > 0 ?
                                s.unavailability.map(u =>
                                  u.allDay ? <span>| Unavailable: All Day</span> : 
                                  <span>| Unavailable: {u.startTime} - {u.endTime}</span> )
                              : <span>Available</span>
                            } </option> 
                          } */}
                        </Fragment>
                        : null) 
                      : null} 
                    </select>
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