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
import TimePicker from 'react-time-picker';

axios.defaults.withCredentials = true;



export default class ModalParent extends Component {
  state = {
    open: false,
    value: "Please Select A Staff Member",
    start: "10:00",
    end: "10:00",

    rosters: undefined,
    staffList: undefined,
    displayStaffAvailable:  false,
    availableStaff: undefined,
    addEmployeeForm: false,
    currentRosterId: undefined,
    currentRosterLocation: undefined,
    currentRosterDate: undefined,
  }

  componentDidMount = () => {
    this.getAllRosters()
    this.getAllStaff()
  }

  openAddEmployeeModal = ( rosterId, rosterLocation, rosterDate, e) => {
    e.preventDefault()
    // set state of selected roster: id, location and date
    // console.log(rosterLocation)
    // console.log(rosterId)
    // console.log(rosterDate)
    this.setState({
      currentRosterId: rosterId,
      currentRosterLocation: rosterLocation,
      currentRosterDate: rosterDate,
      addEmployeeForm: true
    })
    this.getRostersAvailableStaff(rosterLocation, rosterDate)
  }

  closeAddEmployeeModal = e => {
    e.preventDefault()
    this.setState({
        addEmployeeForm: false
      })
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

  getRostersAvailableStaff = (rosterLocation, rosterDate) => {
    console.log("ROSTER AVAILABLE STAFF FUNCTION RUNNING")
    console.log(`the roster location is ${rosterLocation}`)
    console.log(`the roster date is ${rosterDate}`)
    const rosterDayUrl = `http://localhost:5000/auth/staff/${rosterLocation}/${rosterDate}`
    axios.get(rosterDayUrl)
      .then(resp => {
        this.setState({ 
          availableStaff: resp.data,
        }) 
      })
  }

  addEmployee = (employee) => {
    console.log("ADD EMPLOYEE IS RUNNING")
    console.log(employee)
    const url = `http://localhost:5000/auth/roster/${this.state.currentRosterId}`
    axios.put(url, employee)
      .then(resp => {
        // console.log(resp)
        this.setState({ message: 'employee successfully added to shift', error: null})
        console.log("put request went through")
      })
      .catch(err => {
        // console.log(err.response)
        if (err.response === 403) {
          this.setState({ error: 'employee addition unsuccessful', message: null})
          console.log("put request failed")
        }
      })
  } 

  selectStaff = this.selectStaff.bind(this);

  selectStaff(event) {
    this.setState({value: event.target.value});
  }
  
  startChange = time => this.setState({ start: time })
  endChange = time => this.setState({ end: time })

  handleAdd = (e) => {
    e.preventDefault()
    console.log("HANDLE ADD IS RUNNING")
    // // Create new object
    const employeeToAdd = { 
      staffMember: this.state.value,
      startTime: this.state.start,
      endTime: this.state.end
    }
    console.log(employeeToAdd)
    // Send to server
    this.addEmployee(employeeToAdd)
    // // Close Modal
    this.setState(() => ({
      addEmployeeForm: false
    }))
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
{/* 
        <div >
          <h2>react-responsive-modal</h2>
          <button onClick={this.onOpenModal}>Open modal</button>
        </div> */}

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
          rosters.length > 0 ?
          rosters.map((roster, index) => 
            roster._id && roster.location && roster.date ?
            <div key={index} className="staffedDayContainer">
              <div className="addStaffBtn"
                type="button"
                htmlFor="staffAddButton"
                onClick={this.openAddEmployeeModal.bind(this, roster._id, roster.location, roster.date)}
              >
                <FontAwesomeIcon 
                  className="addUserIcon"
                  icon="user-plus"
                  color="#fff"
                  size="lg"
                />
              </div>
          
          
          
          <AddEmployeeModal 
            open={this.state.addEmployeeForm} 
            onClose={this.closeAddEmployeeModal} 
            addEmployee={this.addEmployee}
            availableStaff={this.state.availableStaff}
            displayStaffAvailable={this.displayStaffAvailable}
            value={this.state.value}
            selectStaff={this.selectStaff}
            startChange={this.startChange}
            endChange={this.endChange}
            start={this.state.start}
            end={this.state.end}
            handleAdd={this.handleAdd}
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
            : console.log("roster.id location or date doesnt exist")
          )
          :null
        : 
          null
        }
          
               </div>

      </Fragment>
      ) 
  }

}