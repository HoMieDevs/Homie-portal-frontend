import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Navigation from './Navigation';
import RosterAdd from './RosterAdd'
import './css/RosterAdmin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'react-moment';
import 'moment-timezone';
axios.defaults.withCredentials = true;

export default class Roster extends Component {
  state = {
    rosters: [""],
    staffSchema: []
  }

  componentDidMount = () => {
    const rosterUrl = "http://localhost:5000/auth/roster"
    axios.get(rosterUrl)
      .then(resp => {
        this.setState({ rosters: resp.data })        
      })

    const staffUrl = "http://localhost:5000/crew/users"
    axios.get(staffUrl)
      .then(resp => {
        this.setState({ staffSchema: resp.data })
      })
  }

  render() {
    // const id = this.props.match.params.id
    // const oneRoster = this.state.rosters.find(r => r._id === id);
    const allStaff = this.state.staffSchema
    const allRosters = this.state.rosters

    return (
     <Fragment>
        <Navigation/>
        <RosterAdd />
        <h2 className="storeHeading">Store Roster</h2>
        {/* <h3>Office Roster</h3> */}
        <div className="weekDateContainer">
          <FontAwesomeIcon 
            className="chevronCircleLeft"
            icon="chevron-circle-left"
            size="lg"
          />
          <h4 className="weekDate">Jan 21, 2018 - Jan 27, 2018</h4>
          <FontAwesomeIcon 
            className="chevronCircleRight"
            icon="chevron-circle-right"
            size="lg"
          />
        </div>



        <div className="weekRoster">
        {
            allRosters.map(r => {
                return  <div className="staffedDayContainer">
                  <div className="addStaffBtn">
                    <FontAwesomeIcon 
                      className="addUserIcon"
                      icon="user-plus"
                      color="#fff"
                      size="lg"
                    />
                  </div>
                  <div className="dateContainer">
                      <p className="rostDayName">{r.date}</p>
                    </div>
                    <div className="staffContainer">                    
                      {allStaff.map(s => {
                        return r.staff.map(p => {
                        return s.staffMember === p.person ?
                            <Fragment>
                            <p>{s.firstName} {s.lastName}</p>
                            <p>{p.startTime} - {p.endTime}</p>
                            </Fragment>
                        : null
                        })
                    })}
                    </div> 
                    <div className="removeBtn">
                    <FontAwesomeIcon 
                      className="removeUserIcon"
                      icon="user-times"
                      color="#fff"
                      size="lg"
                    />
                  </div>
                </div>
            })
        }
        </div>

      </Fragment>
      ) 
  }

}