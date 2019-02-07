import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Navigation from './Navigation';
import './css/RosterAdmin.css'
import './css/Approvals.css'
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
        // const sorted = allStaff.map(s => {
        //   s.unavailability.sort((a, b) => {
        //     return a.date > b.date ?  -1 : a.date < b.date ? 1 : 0
        //   })
        // })
        // console.log(sorted)
        this.setState({ staffSchema: resp.data })
      })
  }

  // componentDidUpdate = () => {
  //   const staffUrl = "http://localhost:5000/crew/users"
  //   axios.get(staffUrl)
  //     .then(resp => {
  //       this.setState({ staffSchema: resp.data })
  //     })
  // }

  changeApproved = (id, unid) => {
    const unUrl = `http://localhost:5000/auth/unavailabilityapprove/${id}/${unid}`

    // const unUrl = `${process.env.REACT_APP_API_URL}/auth/unavailabilityapprove/${id}/${unid}`


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

  rejectUn = (id, unid) => {
    const unUrl = `http://localhost:5000/auth/unavailability/${id}/${unid}`

    // const unUrl = `${process.env.REACT_APP_API_URL}/auth/unavailability/${id}/${unid}`
    console.log(unid)


    const data = true
    axios.delete(unUrl, data)
      .then(resp => {
        this.setState({ message: 'unavailability rejected', error: null})
      })
      .catch(err => {
        if (err.response === 403) {
          this.setState({ error: 'unavailability was not rejected', message: null})
        }
      })
  }

  render() {
    
    const allStaff = this.state.staffSchema

    return (
     <Fragment>
        <Navigation/>

        <div className="allUnavailability">
        <div className="approvals">
            <h3>To be approved:</h3>
        <div className="approvals-container">

             {
                allStaff.map(s => {
                    console.log(s)
                    return s.unavailability.length > 0 ? 
                        s.unavailability.map(u => {
                            return u.approved ? null :
                            <div className="approvals-class-container" key={u._id}>
                                 <div className="reject-button-container">    
                                    <button className="reject-button" onClick={() => this.rejectUn(s._id, u._id)}>
                                        <FontAwesomeIcon 
                                            className="reject-button-icon"
                                            icon="times-circle"
                                            color="#fff"
                                            size="lg"/>
                                    </button>
                                </div>
                                <div className="approvals-shift hs1">
                                    <p className="approvals-name">{s.firstName} {s.lastName}</p>
                                    <p className="approvals-date"><Moment format="ddd Do MMM" date={u.date} /></p>
                                    <p className="approvals-start-time">{u.startTime}</p>
                                    <p className="approvals-end-time">{u.endTime}</p>
                                    <hr className="blueLine"/>
                                    <p className="approvals-comment">{u.comment}</p>
                                </div>
                                <div className="approve-button-container">    
                                    <button className="approve-button" onClick={() => this.changeApproved(s._id, u._id)}>
                                        <FontAwesomeIcon 
                                            className="approve-button-icon"
                                            icon="check-circle"
                                            color="#fff"
                                            size="lg"/>
                                    </button>
                                </div>
                            </div>
                        }) : null
                })
            }
      </div>
        </div>

<h3>Approved: </h3>
        <div className="approvals-container">
            
            {
                allStaff.map(s => {
                    return s.unavailability.length > 0 ? 
                        s.unavailability.map(u => {
                            return u.approved ?
                            <div key={u._id}>
                            <div className="approvals-shift hs1">
                                <p className="approvals-name">{s.firstName} {s.lastName}</p>
                                <p className="approvals-date"><Moment format="ddd Do MMM" date={u.date} /></p>
                                <p className="approvals-start-time">{u.startTime}</p>
                                <p className="approvals-end-time">{u.endTime}</p>
                                <hr className="blueLine"/>
                                <p className="approvals-comment">{u.comment}</p>
                                </div>
                            </div>
                            : null
                        }) : null
                })
            }

        </div>
            </div>
      </Fragment>
      ) 
  }

}