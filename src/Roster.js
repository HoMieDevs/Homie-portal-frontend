// import React, { Component, Fragment } from "react";
// import axios from "axios";
// import Navigation from "./Navigation";
// import "./css/Register.css";
// axios.defaults.withCredentials = true;

// export default class Roster extends Component {
//   state = {
//     rosters: [""],
//     staff: []
//   };

//   componentDidMount = () => {
//     // const rosterUrl = "http://localhost:5000/auth/roster/";
//     const rosterUrl = `${process.env.REACT_APP_API_URL}/auth/roster`;
//     axios.get(rosterUrl).then(resp => {
//       this.setState({ rosters: resp.data });
//     });

//     // const staffUrl = "http://localhost:5000/crew/users";
//     const staffUrl = `${process.env.REACT_APP_API_URL}/crew/users`;
//     axios.get(staffUrl).then(resp => {
//       this.setState({ staff: resp.data });
//     });
//   };

//   render() {
//     const id = this.props.match.params.id;
//     const oneRoster = this.state.rosters.find(r => r._id === id);
//     const allStaff = this.state.staff;

//     return oneRoster ? (
//       <Fragment>
//         <Navigation />
//         <div className="Roster">
//           <div className="thisRoster">
//             <h3>{oneRoster.location}</h3>
//             <h2>{oneRoster.date}</h2>
//             <div>
//               {allStaff.map(s => {
//                 return oneRoster.staff.map(p => {
//                   return s.staffMember === p.person ? (
//                     <div>
//                       <p>
//                         {s.firstName} {s.lastName}
//                       </p>
//                       <p>
//                         {p.startTime} - {p.endTime}
//                       </p>
//                       <hr />
//                     </div>
//                   ) : null;
//                 });
//               })}
//             </div>
//           </div>
//         </div>
//       </Fragment>
//     ) : (
//       <Fragment>
//         <Navigation />
//         <h2>No roster, try again!</h2>
//       </Fragment>
//     );
//   }
// }
