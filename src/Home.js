import React, { Component, Fragment } from "react";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
// import Header from './Header';
import Navigation from "./Navigation";
import "./css/Home.css";
axios.defaults.withCredentials = true;

export default class Home extends Component {
  state = {
    rosters: []
    // user: []
  };

  componentDidMount = () => {
    // const rosterUrl = "http://localhost:5000/auth/roster";
    // const rosterUrl = `${process.env.REACT_APP_DEV_API_URL}/auth/roster`
    const rosterUrl = `${process.env.REACT_APP_API_URL}/auth/roster`;
    axios.get(rosterUrl).then(resp => {
      this.setState({ rosters: resp.data });
    });

    //   const myUrl = "http://localhost:5000/auth/me"
    //   axios.get(myUrl)
    //     .then(resp => {
    //       this.setState({ user: resp.data })
    //     })
  };

  render() {
    const allRosters = this.state.rosters;
    const currentId = localStorage.getItem("userId");
    const rost = allRosters.map(r => {
      console.log(r.staff);
    });

    return (
      <Fragment>
        <Navigation />
        <h2>Upcoming Shifts</h2>
        <div className="home">
          <div className="homeShiftContainer">
            {allRosters ? (
              allRosters.map(r => {
                return r.staff
                  ? r.staff.map(s => {
                      return s.staffMember === currentId ? (
                        <div className="homeShift hs1">
                          <p className="homeDate">
                            <Moment format="ddd Do MMM" date={r.date} />{" "}
                          </p>
                          <hr className="blueLine" />
                          {/* <p>{s.staffMember}</p> */}
                          <p className="homeTime">
                            {s.startTime}am - {s.endTime}pm
                          </p>
                          <p className="homeLocation">{r.location}</p>
                        </div>
                      ) : null;
                    })
                  : null;
              })
            ) : (
              <p>No upcoming shifts</p>
            )}
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
          </div>
        </div>
      </Fragment>
    );
  }
}
