import React, { Component, Fragment } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import "./css/MyInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
axios.defaults.withCredentials = true;

// render() {
//   const id = this.props.match.params.id
//   console.log(id)
//   const oneRoster = this.state.rosters.find(r => r._id === id);
//   const allStaff = this.state.staff

//   return (oneRoster) ? (
//     <Fragment>
//       <Navigation />
//       <div className="Roster">
//         <div className="thisRoster">
//           <h2>{oneRoster.date}</h2>
//           <h3>{oneRoster.location}</h3>
//           <p>
//             {allStaff.map(s => {
//               return oneRoster.staff.map(p => {
//                 return s._id === p.person ?
//                   <div>
//                     <p>{s.firstName}</p>
//                     <p>{s.lastName}</p>
//                     <p>{p.startTime}</p>
//                     <p>{p.endTime}</p>
//                     <hr/>
//                   </div>
//                 : null
//               })
//             })}
//           </p>

export default class MyInfo extends Component {
  state = {
    firstName: "loading",
    LastName: "loading",
    email: "loading",
    mobile: "loading"
  };

  componentDidMount = () => {
    // const myUrl = "http://localhost:5000/auth/me"
    const myUrl = `${process.env.REACT_APP_API_URL}/auth/me`;
    axios.get(myUrl).then(resp => {
      const { firstName, lastName, email, mobile } = resp.data;
      this.setState({ firstName, lastName, email, mobile });
    });
  };

  render() {
    const { firstName, lastName, email, mobile } = this.state;
    console.log(mobile);
    return (
      <Fragment>
        <Navigation />
        <h2>My Info</h2>
        <FontAwesomeIcon className="avatarIcon" icon="user" size="2x" />
        <br />
        <button>Edit Avatar</button>
        <div className="myInfoText">
          <p>First Name:</p>
          <p>{firstName}</p>
          <p>Last Name:</p>
          <p>{lastName}</p>
          <p>Email Address:</p>
          <p>{email}</p>
          <p>Mobile:</p>
          <p>{mobile === undefined ? "-" : mobile}</p>
        </div>
        <button>Edit</button>
      </Fragment>
    );
  }
}
