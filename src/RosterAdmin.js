// import React, { Component, Fragment } from 'react'
// import axios from 'axios';
// import Navigation from './Navigation';
// import './css/RosterAdmin.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// axios.defaults.withCredentials = true;
  
// export default class RosterAdmin extends Component {
//   state={
//   week: [
//     {
//     dayID: 1,
//     date: "Mon 28th Jan",
//     location: "In Store",
//     staff: [
//       { 
//         id: 1,
//         firstName: "Bob",
//         lastName: "Smith",
//         startTime: "10am",
//         endTime: "6pm"
//       },     
//       {
//         id: 2,
//         firstName: "Derrik",
//         lastName: "King",
//         startTime: "12pm",
//         endTime: "5pm"
//       }
//     ]   
//     },
//     {
//     dayID: 2,
//     date: "Tue 29th Jan",
//     location: "In Store",
//     staff: [
//       { 
//         id: 3,
//         firstName: "Kewl",
//         lastName: "Bean",
//         startTime: "10am",
//         endTime: "6pm"
//       },     
//       {
//         id: 4,
//         firstName: "David",
//         lastName: "Dhayveid",
//         startTime: "12pm",
//         endTime: "5pm"
//       },
//       {
//         id: 5,
//         firstName: "Old",
//         lastName: "Greg",
//         startTime: "12pm",
//         endTime: "5pm"
//       },
//       {
//         id: 5,
//         firstName: "Kendrick",
//         lastName: "Bobalicious",
//         startTime: "12pm",
//         endTime: "5pm"
//       }
//     ]
//     },
//     {
//     dayID: 3,
//     date: "Wed 30th Jan",
//     location: "In Store",
//     staff: [ 
//       {
//       id: 5,
//       firstName: "Old",
//       lastName: "Man",
//       startTime: "12pm",
//       endTime: "5pm"
//     },
//     {
//       id: 5,
//       firstName: "Rick",
//       lastName: "OoooOOO",
//       startTime: "12pm",
//       endTime: "5pm"
//     }
//     ]
//     },
//     // {
//     // dayID: 4,
//     // date: "Thu 31st Jan",
//     // location: "In Store",
//     // staff: [
//     // ]
//     // },
//     // {
//     // dayID: 5,
//     // date: "Fri 1st Feb",
//     // location: "In Store",
//     // staff: [
//     // ]
//     // },
//     // {
//     // dayID: 6,
//     // date: "Sat 2nd Feb",
//     // location: "In Store",
//     // staff: [
//     // ]
//     // },
//     // {
//     // dayID: 7,
//     // date: "Sun 3rd Feb",
//     // location: "In Store",
//     // staff: [
//     // ]
//     // },
//   ]
//   }

//   staffLength = () => {

//   }
    
//   render() {
//     const roster = this.state
//     // console.log(roster.staff.length)
//     return (
//       <Fragment>
//         <Navigation/>
//         <h2 className="storeHeading">Store Roster</h2>
//         {/* <h3>Office Roster</h3> */}
//         <div className="weekDateContainer">
//           <FontAwesomeIcon 
//             className="chevronCircleLeft"
//             icon="chevron-circle-left"
//             size="lg"
//           />
//           <h4 className="weekDate">Jan 21, 2018 - Jan 27, 2018</h4>
//           <FontAwesomeIcon 
//             className="chevronCircleRight"
//             icon="chevron-circle-right"
//             size="lg"
//           />
//         </div>


// {/* >>>>>>>>>>>>>>>>>>>> added staff >>>>>>>>>>> */}

//           <div className="weekRoster">

//               {roster.week.map(day => {
//                 return day.staff.length === 0 ?
//                   <div className="emptyDayContainer">
//                     <div className="addStaffBtn">
//                       <FontAwesomeIcon 
//                         className="addUserIcon"
//                         icon="user-plus"
//                         color="#fff"
//                         size="lg"
//                       />
//                     </div>
//                     <div className="dateContainer">
//                       <p className="rostDayName">{day.date}</p>
//                     </div>
//                     <div className="emptyStaffContainer">
//                       <p>
//                         No Staff Selected
//                       </p>
//                     </div>
//                   </div>
//                 :
//                   <div key={day.dayID} className="staffedDayContainer">
//                   <div className="addStaffBtn">
//                     <FontAwesomeIcon 
//                       className="addUserIcon"
//                       icon="user-plus"
//                       color="#fff"
//                       size="lg"
//                     />
//                   </div>
//                     <div className="dateContainer">
//                       <p className="rostDayName">{day.date}</p>
//                     </div>
//                     <div className="staffContainer">
//                     {day.staff.map(s => {
//                       return (
//                         <Fragment>
//                           <p>{s.firstName} {s.lastName}</p>
//                           <p>{s.startTime}-{s.endTime}</p>
//                         </Fragment>
//                       )
//                     })}
//                     </div>
//                   <div className="removeBtn">
//                     <FontAwesomeIcon 
//                       className="removeUserIcon"
//                       icon="user-times"
//                       color="#fff"
//                       size="lg"
//                     />
//                   </div>
//                   </div>
                
//               })}

//             </div>

//       </Fragment>
//     )
//   }
// }

