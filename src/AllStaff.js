import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Navigation from './Navigation';
import './css/Register.css'
axios.defaults.withCredentials = true;

export default class AllStaff extends Component {
  state = {
    staff: []
  }

  componentDidMount = () => {
    const staffUrl = "http://localhost:5000/crew/users"
    axios.get(staffUrl)
      .then(resp => {
        this.setState({ staff: resp.data })
      })
  }

  render() {
    const allStaff = this.state.staff

    return (
      <Fragment>
        <Navigation />
        <h2>All Staff</h2>
          <div className="allStaff">
              {allStaff.map(s => {
                   return <div>
                      <p>{s.firstName} {s.lastName}</p>
                      <p>{s.mobile}</p>
                      <p>{s.email}</p>
                      <hr/>
                    </div>
                })
              }
            </div>
      </Fragment>
    )
    }
}
