import React, { Component, Fragment } from 'react'
import axios from 'axios';
import './css/Register.css'
import Navigation from './Navigation'
import Moment from 'react-moment';
import 'moment-timezone';
import TimePicker from 'react-time-picker';

axios.defaults.withCredentials = true;

export default class SelectStaff extends Component {
  state = {
      value: "Please Select A Staff Member",
      start: "10:00",
      end: "10:00",
      // time: '10:00',
  }

  componentDidMount = () => {
    const rosterDate = "2019-12-12T00:00:00.000Z"
    const location = "store"
    const rosterDayUrl = `http://localhost:5000/auth/staff/${location}/${rosterDate}`
    axios.get(rosterDayUrl)
      .then(resp => {
        this.setState({ staffSelect: resp.data }) 
        console.log(this.state)       
      })
  }
  
  selectStaff = this.selectStaff.bind(this);

  selectStaff(event) {
    this.setState({value: event.target.value});
  }
  
  onChange = time => this.setState({ start: time })
  onChange2 = time => this.setState({ end: time })

  render() {
    console.log(this.state)
    return (
      <Fragment>
        <Navigation />
        <form onSubmit={this.handleSubmit}>
          <label>
            Staff Member:
          <br/>
            <select value={this.state.value} onChange={this.selectStaff}>
              <option value=''>Select A Staff Member</option>
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
          <br/>
          <br/>
          <label>Start Time:</label>
          <br/>
          <TimePicker
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
          value={this.state.start}
        />
          <br/>
          <label>End Time:</label>
          <br/>
          <TimePicker
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
          value={this.state.emd}
        />
          <br/>

        </form>

        <br/>
        <p>user.id:</p>
        <h4>{this.state.value}</h4>
        <br/>
        <p>startTime:</p>
        <h4>{this.state.start}</h4>
        <br/>
        <p>endTime:</p>
        <h4>{this.state.end}</h4>
        <br/>
        <p>save in 24hour time then convert with moment to display on the roster page:</p>
        <Moment format="h:mma" time={this.state.start} />
      </Fragment>
      )
  }

}

// save in 24hr time and display on roster page with momentjs to convert.
// logic so start time cant be after end time
// logic so end time cant be before end time
// unavailabilities need to be set in 24hr time as well so we can compare the unavail with the input times
// logic so start time doesnt clash with unavailabilities
// logic so end time doesnt clash with unavailabilities
// get on submit to grab all values and submit an axios.post request with all above logic inside to stop the submit if any errors occur
// if staff member already has a shift on that day then they can’t be added again (either errors out or they’re disabled/hidden from selection