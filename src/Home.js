import React, { Component, Fragment } from 'react'
import axios from 'axios';
// import Header from './Header';
import Navigation from './Navigation';
import './css/Home.css'
axios.defaults.withCredentials = true;

export default class Home extends Component {
  state = {
    rosters: [],
    // user: []
  }

  componentDidMount = () => {
    const rosterUrl = "http://localhost:5000/auth/roster"
    axios.get(rosterUrl)
      .then(resp => {
        this.setState({ rosters: resp.data })        
      })

  //   const myUrl = "http://localhost:5000/auth/me"
  //   axios.get(myUrl)
  //     .then(resp => {
  //       this.setState({ user: resp.data })
  //     })
  }
    
  render() {
    const allRosters = this.state.rosters
    const currentId = localStorage.getItem("userId")
    
    return (
      <Fragment>
        <Navigation />
        <h2>Upcoming Shifts</h2>
        <div className="home">
        <div className="homeShiftContainer">
          {allRosters ? allRosters.map(r => {
            return r.staff ? r.staff.map(s => {
             return s.staffMember === currentId ?   <div className="homeShift hs1">
                  <p className="homeDate">{r.date}</p>
                  <hr className="blueLine"/>
                  {/* <p>{s.staffMember}</p> */}
                  <p className="homeTime">{s.startTime}am - {s.endTime}pm</p>
                  <p className="homeLocation">{r.location}</p>
                </div>
                : null
            })
            : null
          }) : <p>No upcoming shifts</p>}
          {/* { allRosters.map(r => {
              return r.staff ? r.staff.map(s =>{
                  return s.staffMember === currentId ? 
                      <div>
                        {r.date} {s.startTime} - {s.endTime}
                      </div> : null
                    }
                )
                : null
            })
          } */}


          {/* <h3>Upcoming Shifts</h3>
          <div className="homeShiftContainer">
            <div className="homeShift hs1">
              <p className="homeDate">Wed 23rd Jan</p>
              <hr className="blueLine"/>
              <p className="homeTime">10am - 6pm</p>
              <p className="homeLocation">In Store</p>
            </div>
            <div className="homeShift hs2">
              <p className="homeDate">Wed 23rd Jan</p>
              <hr className="blueLine"/>
              <p className="homeTime">10am - 6pm</p>
              <p className="homeLocation">In Store</p>
            </div>
            <div className="homeShift hs3">
              <p className="homeDate">Wed 23rd Jan</p>
              <hr className="blueLine"/>
              <p className="homeTime">10am - 6pm</p>
              <p className="homeLocation">In Store</p>
            </div>
            <div className="homeShift hs4">
              <p className="homeDate">Wed 23rd Jan</p>
              <hr className="blueLine"/>
              <p className="homeTime">10am - 6pm</p>
              <p className="homeLocation">In Store</p>
            </div>
            <div className="homeShift hs5">
              <p className="homeDate">Wed 23rd Jan</p>
              <hr className="blueLine"/>
              <p className="homeTime">10am - 6pm</p>
              <p className="homeLocation">In Store</p>
            </div>
          </div> */}



        </div>
        </div>
      </Fragment>
    )
  }
}
