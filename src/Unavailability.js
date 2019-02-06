// import React, { Component, Fragment } from "react";
// import axios from "axios";
// import "./css/Register.css";
// import Home from "./Home";
// import Navigation from "./Navigation";
// import SubmitUnavailability from "./SubmitUnavailability";
// import CurrentUser from "./CurrentUser";
// axios.defaults.withCredentials = true;
// var moment = require("moment");

// export default class Unavailability extends Component {
//   state = {
//     startDate: null,
//     endDate: null,
//     allDay: null,
//     startTime: null,
//     endTime: null,
//     comment: null,
//     approved: null,
//     date: null
//   };

//   handleInputChange = e => {
//     const { value, id } = e.currentTarget;
//     this.setState({ [id]: value });
//   };

//   submitForm = e => {
//     e.preventDefault();

//     const fromDate = moment(new Date(this.state.startDate));
//     const toDate = moment(new Date(this.state.endDate));

//     const enumerateDaysBetweenDates = function(startDate, endDate) {
//       const now = startDate;
//       const dates = [];

//       while (now.isSameOrBefore(endDate)) {
//         dates.push(now.format("M/D/YYYY"));
//         now.add(1, "days");
//       }
//       return dates;
//     };

//     // console.log(enumerateDaysBetweenDates(fromDate, toDate).length);

//     const lenghOfArray = enumerateDaysBetweenDates(fromDate, toDate).length;

//     let length = 0;
//     let date = moment(new Date(this.state.startDate));

//     while (length < lenghOfArray) {
//       length += 1;
//       const { allDay, startTime, endTime, comment } = this.state;
//       const userId = localStorage.getItem("userId");

//       const url = `http://localhost:5000/auth/unavailability/${userId}/`;

//       date = moment(new Date(this.state.startDate)).add(1, "days");
//       console.log(typeof date);

//       const unavailability = [
//         {
//           date,
//           allDay,
//           startTime,
//           endTime,
//           comment
//         }
//       ];

//       const data = { unavailability };

//       axios
//         .put(url, data)
//         .then(resp => {
//           console.log(resp);
//           this.setState({ message: "unavailability added", error: null });
//         })
//         .catch(err => {
//           console.log(err.response);
//           if (err.response === 403) {
//             this.setState({
//               error: "unavailability was not submitted",
//               message: null
//             });
//           }
//         });
//     }
//   };

//   render() {
//     const { error, message } = this.state;

//     return (
//       <Fragment>
//         <Navigation />
//         <div className="Unavailability">
//           <div className="addUnavailability">
//             <form className="unavailabilityrForm">
//               <div className="unavailabilityField">
//                 <label htmlFor="date">Start Date:</label>
//                 <input
//                   type="date"
//                   id="startDate"
//                   placeholder="Date"
//                   onFocus={e => (e.target.placeholder = "")}
//                   onBlur={e => (e.target.placeholder = "Date")}
//                   onChange={this.handleInputChange}
//                 />
//               </div>

//               <div className="unavailabilityField">
//                 <label htmlFor="date">EndDate:</label>
//                 <input
//                   type="date"
//                   id="endDate"
//                   placeholder="Date"
//                   onFocus={e => (e.target.placeholder = "")}
//                   onBlur={e => (e.target.placeholder = "Date")}
//                   onChange={this.handleInputChange}
//                 />
//               </div>

//               <div className="unavailabilityField">
//                 <label htmlFor="allDay">All Day:</label>
//                 <input
//                   type="text"
//                   id="allDay"
//                   placeholder="Allday"
//                   onFocus={e => (e.target.placeholder = "")}
//                   onBlur={e => (e.target.placeholder = "Allday")}
//                   onChange={this.handleInputChange}
//                 />
//               </div>

//               <div className="unavailabilityField">
//                 <label htmlFor="startTime">Start Time:</label>
//                 <input
//                   type="text"
//                   id="startTime"
//                   placeholder="startTime"
//                   onFocus={e => (e.target.placeholder = "")}
//                   onBlur={e => (e.target.placeholder = "startTime")}
//                   onChange={this.handleInputChange}
//                 />
//               </div>

//               <div className="unavailabilityField">
//                 <label htmlFor="endTime">End Time:</label>
//                 <input
//                   type="text"
//                   id="endTime"
//                   placeholder="endTime"
//                   onFocus={e => (e.target.placeholder = "")}
//                   onBlur={e => (e.target.placeholder = "endTime")}
//                   onChange={this.handleInputChange}
//                 />
//               </div>

//               <div className="unavailabilityField">
//                 <label htmlFor="comment">Comment:</label>
//                 <input
//                   type="text"
//                   id="comment"
//                   placeholder="comment"
//                   onFocus={e => (e.target.placeholder = "")}
//                   onBlur={e => (e.target.placeholder = "comment")}
//                   onChange={this.handleInputChange}
//                 />
//               </div>
//               <button className="rosterStaffBtn" onClick={this.submitForm}>
//                 + Submit
//               </button>
//             </form>

//             {error && <p>{error}</p>}
//             {message && <p>{message}</p>}
//           </div>
//           <SubmitUnavailability />
//         </div>
//       </Fragment>
//     );
//   }
// }
