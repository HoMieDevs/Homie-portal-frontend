import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Navigation from './Navigation';
import './css/RosterAdmin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'react-moment';
import 'moment-timezone';
axios.defaults.withCredentials = true;

export default class Approvals extends Component {
  state = {
    staffSchema: []
  }

  componentDidMount = () => {
    const staffUrl = "http://localhost:5000/crew/users"
    axios.get(staffUrl)
      .then(resp => {
        this.setState({ staffSchema: resp.data })
      })
  }

  setApproved = () => {
      if(this.state.staffSchema) {
          this.state.staffSchema.map(s => {
              s.unavailability.map(u => {
                  return u.approved
              })
          })
      }
  }

  handleClick() {
    this.setState({ approved: true })
    console.log("button clicked")
  }

  render() {
    
    const allStaff = this.state.staffSchema

    return (
     <Fragment>
        <Navigation/>
        <h2 className="approvalsHeading">To Be Approved</h2>

        <div className="allUnavailability">

             {
                allStaff.map(s => {
                    return s.unavailability.length > 0 ? 
                        s.unavailability.map(u => {
                            return u.approved ? null :
                            <div key={u._id}>
                                <p>{s.firstName} {s.lastName} {u.date} {u.startTime}-{u.endTime}</p>
                                <button onClick={this.handleClick}>Approve</button>
                            </div>
                        }) : null
                })
            }

        </div>

        <h2 className="approvalsHeading">Approved</h2>

        <div className="allUnavailability">

            {
                allStaff.map(s => {
                    return s.unavailability.length > 0 ? 
                        s.unavailability.map(u => {
                            return u.approved ?
                            <div>
                                <p key={u._id}>{s.firstName} {s.lastName} {u.date} {u.startTime}-{u.endTime}</p>
                            </div>
                            : null
                        }) : null
                })
            }

        </div>

      </Fragment>
      ) 
  }

}