import React, { Component, Fragment } from 'react'
import axios from 'axios';
import './css/Register.css'
import Navigation from './Navigation'
axios.defaults.withCredentials = true;

export default class SelectStaff extends Component {
  state = {
      value: 1
  }

  componentDidMount = () => {
    const rosterDate = "2019-12-12T00:00:00.000Z"
    const location = "store"
    const rosterDayUrl = `http://localhost:5000/auth/staff/${location}/${rosterDate}`
    axios.get(rosterDayUrl)
      .then(resp => {
        this.setState({ staffSelect: resp.data })        
      })
  }
  
  selectStaff = this.selectStafff.bind(this);

  selectStaff(event) {
    this.setState({value: event.target.value});
  }
  selectStafff(event) {
    this.setState({value: event.target.value});
  }

  render() {
    console.log(this.state)
    return (
      <Fragment>
        <Navigation />
        <form onSubmit={this.handleSubmit}>
          <label>
            Staff Member:
            <select value={this.state.value} onChange={this.selectStaff}>
              <option value='staffSelectPlaceholder' >Select A Staff Member</option>
            {this.state.staffSelect ? 
            this.state.staffSelect.allStaff.map(s => s ? 
              <Fragment>
               {s.unavail ? 
                s.unavail.map(u =>
                u.allDay ? <option value={s.id} disabled>{s.firstName} {s.lastName} | Unavailable: All Day </option>  : <option value={s.id}>{s.firstName} {s.lastName} | Unavailable: {u.startTime} - {u.endTime} </option>)
              : <option value={s.id}>{s.firstName} {s.lastName}</option> 
              }
              </Fragment>
              : null) 
            : null} 
            </select>
          </label>
          <br/>
          <label>Start Time:</label>
          <input type="text"/>
          <br/>
          <label>End Time:</label>
          <input type="text"/>
          <br/>
          <input type="submit" value="Submit" />
        </form>

        <h2>{this.state.value}</h2>
      </Fragment>
      )
  }

}
