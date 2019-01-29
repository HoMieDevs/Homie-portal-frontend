import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Navigation from './Navigation';
import './css/Register.css'
axios.defaults.withCredentials = true;

export default class Roster extends Component {
  state = {
    rosters: [""],
    staff: [],
  }

  componentDidMount = () => {
    const rosterUrl = "http://localhost:5000/auth/roster/"
    axios.get(rosterUrl)
      .then(resp => {
        this.setState({ rosters: resp.data })        
      })

    const staffUrl = "http://localhost:5000/crew/users"
    axios.get(staffUrl)
      .then(resp => {
        this.setState({ staff: resp.data })
      })
  }

  render() {
    const id = this.props.match.params.id
    console.log(id)
    const oneRoster = this.state.rosters.find(r => r._id === id);
    const allStaff = this.state.staff

    return (oneRoster) ? (
      <Fragment>
        <Navigation />
        <div className="Roster">
          <div className="thisRoster">
            <h2>{oneRoster.date}</h2>
            <h3>{oneRoster.location}</h3>
            <p>
              {allStaff.map(s => {
                return oneRoster.staff.map(p => {
                  return s._id === p.person ?
                    <div>
                      <p>{s.firstName}</p>
                      <p>{s.lastName}</p>
                      <p>{p.startTime}</p>
                      <p>{p.endTime}</p>
                      <hr/>
                    </div>
                  : null
                })
              })}
            </p>

            {/* <p>
                {
                    oneRoster.staff.map((s, i) => 
                        <div key={i} className="shift">
                            {
                                allStaff.map(p => {                                      
                                    (p._id === s.person) ? console.log("match") : console.log("no match")
                                })
                            }
                        </div>
                    )
                }
            </p> */}
              
          </div>
        </div>
      </Fragment>
      ) : 
      <Fragment>
        <Navigation />
        <h2>No roster, try again!</h2>
      </Fragment>
  }

}