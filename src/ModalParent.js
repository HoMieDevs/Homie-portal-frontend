import React, { Component, Fragment } from 'react'
import axios from 'axios';
import { render } from "react-dom";
import Modal from "react-responsive-modal";
import Navigation from './Navigation';
import TestModal from './TestModal'
import './css/RosterAdmin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddEmployeeModal from './AddEmployeeModal'
import Moment from 'react-moment';
import 'moment-timezone';

axios.defaults.withCredentials = true;



export default class ModalParent extends Component {
  state = {
    open: false,

    rosters: undefined,
    staffList: undefined,
    displayStaffAvailable:  false,
    availableStaff: undefined,
    addEmployeeForm: undefined,
    currentRosterId: undefined,
    currentRosterLocation: undefined,
    currentRosterDate: undefined,
  }

  // openAddEmployeeModal = () => {
  //   this.setState({ addEmployeeForm: true })
  // }

  // closeAddEmployeeModal = e => {
  //   e.preventDefault()
  //   this.setState(() => {
  //     return {
  //       addEmployeeForm: undefined
  //     }
  //   })
  // }

  componentDidMount = () => {
    this.getAllRosters()
    this.getAllStaff()
  }

  getAllRosters = () => {
    const rosterUrl = "http://localhost:5000/auth/roster"
    axios.get(rosterUrl)
      .then(resp => {
        this.setState({ rosters: resp.data })        
      })
  }
  getAllStaff = () => {
    const staffUrl = "http://localhost:5000/crew/users"
    axios.get(staffUrl)
      .then(resp => {
        this.setState({ staffList: resp.data })
      })
  }

  getRostersAvailableStaff = (rosterLocation, rosterDate,) => {
    const rosterDayUrl = `http://localhost:5000/auth/staff/${rosterLocation}/${rosterDate}`
    axios.get(rosterDayUrl)
      .then(resp => {
        this.setState({ availableStaff: resp.data }) 
        // console.log(rosterLocation)
        // console.log(this.state.availableStaff) 
      })
  }

  addEmployee = (employee) => {
    const url = `http://localhost:5000/auth/roster/${this.state.currentRosterId}`
    axios.put(url, employee)
      .then(resp => {
        // console.log(resp)
        this.setState({ message: 'employee successfully added to shift', error: null})
      })
      .catch(err => {
        // console.log(err.response)
        if (err.response === 403) {
          this.setState({ error: 'employee addition unsuccessful', message: null})
        }
      })
  } 

  handleAdd = (rosterId, rosterLocation, rosterDate, e) => {
    e.preventDefault()
    this.onOpenModal()
    // set state of selected roster: id, location and date
    this.setState({
      currentRosterId: rosterId,
      currentRosterLocation: rosterLocation,
      currentRosterDate: rosterDate
    })

    this.getRostersAvailableStaff(rosterLocation, rosterDate)

    // // Create new object
    // const employeeToAdd = { 
    //   staffMember: this.selectStaff(e), 
    //   startTime: e.target[1].name === 'startTime'
    //   ? e.target[1].value
    //   : null,
    //   endTime: e.target[2].name === 'endTime'
    //   ? e.target[2].value
    //   : null,
    // }
    // // Send to server
    // // this.addEmployee(employeeToAdd, rosterId)
    // this.addEmployee(employeeToAdd)
    // // Close Modal
    this.setState(() => ({
      addEmployeeForm: undefined
    }))
  }

  openAddEmployeeModal = () => {
    this.setState({ addEmployeeForm: true })
  }

  closeAddEmployeeModal = e => {
    e.preventDefault()
    this.setState(() => {
      return {
        addEmployeeForm: undefined
      }
    })
  }
  

  toggleStaffDrop = () => {
    this.setState((previousState) => {
      return {
        displayStaffAvailable: !previousState.displayStaffAvailable
      }
    })
  }


  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const staffList = this.state.staffList
    const rosters = this.state.rosters
    // console.log(this.state.currentRosterDate)
    // console.log(this.state.currentRosterLocation)
    // console.log(this.state.currentRosterId)
    console.log(this.state)
    const {open} = this.state
    return (
     <Fragment>
        <Navigation/>

        <div >
          <h2>react-responsive-modal</h2>
          <button onClick={this.onOpenModal}>Open modal</button>
        </div>

        {/* <AddEmployeeModal /> */}
        {/* <RosterAdd /> */}
        <h2 className="storeHeading">Store Roster</h2>
        {/* <h3>Office Roster</h3> */}
        <div className="weekDateContainer">
          <FontAwesomeIcon 
            className="chevronCircleLeft"
            icon="chevron-circle-left"
            size="lg"
          />
          <h4 className="weekDate">Jan 21, 2018 - Jan 27, 2018</h4>
          <FontAwesomeIcon 
            className="chevronCircleRight"
            icon="chevron-circle-right"
            size="lg"
          />
        </div>



        <div className="weekRoster">
        {rosters ? 
          rosters.map((roster, index) => {
           return <div key={index} className="staffedDayContainer">
              <div className="addStaffBtn"
                type="button"
                htmlFor="staffAddButton"
                onClick={this.handleAdd.bind(this, roster._id, roster.location, roster.date)}
              >
                <FontAwesomeIcon 
                  className="addUserIcon"
                  icon="user-plus"
                  color="#fff"
                  size="lg"
                />
              </div>
          
          
          
          <AddEmployeeModal 
            open={this.state.open} 
            onClose={this.onCloseModal} 
            addEmployee={this.addEmployee}
            availableStaff={this.state.availableStaff}
            displayStaffAvailable={this.displayStaffAvailable}
          />
          
          
          
          
          
          
              <div className="dateContainer">
                <p className="rostDayName">{roster.date}</p>
              </div>
              <div className="staffContainer">
              {staffList ? 
                staffList.map(oneStaff =>
                  roster.staff.length > 0 ? 
                    roster.staff.map((employee, index) => {
                      return employee && oneStaff ?
                        employee.staffMember === oneStaff._id  ? 
                          <Fragment key={index}>
                            <p>{oneStaff.firstName} {oneStaff.lastName}</p>
                            <p>{employee.startTime}-{employee.endTime}</p>
                          </Fragment>
                        : 
                        null
                      : null
                    })
                  : 
                  null
                )
              :
              null
              }        
              </div>
            </div>
          })
        : 
          null
        }
          
               </div>

      </Fragment>
      ) 
  }

}