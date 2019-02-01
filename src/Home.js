import React, { Component, Fragment } from 'react'
import axios from 'axios';
// import Header from './Header';
import Navigation from './Navigation';
import './css/Home.css'
axios.defaults.withCredentials = true;

export default class Home extends Component {
  state = {
    rosters: [""],
    user: []
  }

  componentDidMount = () => {
    const rosterUrl = "http://localhost:5000/auth/roster/"
    axios.get(rosterUrl)
      .then(resp => {
        this.setState({ rosters: resp.data })        
      })

    const myUrl = "http://localhost:5000/auth/me"
    axios.get(myUrl)
      .then(resp => {
        this.setState({ user: resp.data })
      })
  }
    
  render() {
    const allRosters = this.state.rosters
    const currentUser = this.state.user

    return (
      <Fragment>
        <Navigation />
        <div className="home">

          {
            allRosters.map(r => {
              return r.staff ?
              <div>
                {r.staff.map(s =>{
                  return <div>
                    {s.staffMember === currentUser._id ? 
                      <div>
                        {r.date} {s.startTime} - {s.endTime}
                      </div> : null
                    }
                    </div>
                })}
                </div>
                : null
            })
          }


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
      </Fragment>
    )
  }
}
