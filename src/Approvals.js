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

  changeApproved = (id, unid) => {

    const unUrl = `http://localhost:5000/auth/unavailabilityapprove/${id}/${unid}`

    const data = true
    axios.put(unUrl, data)
      .then(resp => {
        this.setState({ message: 'unavailability approved', error: null})
      })
      .catch(err => {
        if (err.response === 403) {
          this.setState({ error: 'unavailability was not approved', message: null})
        }
      })
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
                    console.log(s)
                    return s.unavailability.length > 0 ? 
                        s.unavailability.map(u => {
                            return u.approved ? null :
                            <div key={u._id}>
                                <p>{s.firstName} {s.lastName}</p>
                                <p>{u.date}</p>
                                <p>{u.startTime}-{u.endTime}</p>
                                <p>{u.comment}</p>
                                <button onClick={() => this.changeApproved(s._id, u._id)}>Approve</button>
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
                            <div key={u._id}>
                                <p>{s.firstName} {s.lastName}</p>
                                <p>{u.date}</p>
                                <p>{u.startTime}-{u.endTime}</p>
                                <p>{u.comment}</p>
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