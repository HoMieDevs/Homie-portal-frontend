import React, { Component, Fragment } from 'react'
import axios from 'axios';
import { render } from "react-dom";
import Modal from "react-responsive-modal";
import Navigation from './Navigation';
import TestModal from './TestModal'
import './css/RosterAdmin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddEmployeeModal from './AddEmployeeModal'
import DeleteEmployeeModal from './DeleteEmployeeModal'
import Moment from 'react-moment';
import 'moment-timezone';
import TimePicker from 'react-time-picker';

axios.defaults.withCredentials = true;



export default class ModalParent extends Component {
  state = {
    open: false,
    addPlaceholder: "Select Staff Member",
    deleteSelected: undefined,
    addSelect: undefined,
    startTime: undefined,
    endTime: undefined,
    dropAddClass: "dropdown",
    rosters: undefined,
    staffList: undefined,
    displayStaffAvailable:  false,
    deleteStaff: undefined,
    deleteEmployeeForm: false,
    availableStaff: undefined,
    addEmployeeForm: false,
    currentRosterId: undefined,
    currentRosterLocation: undefined,
    currentRosterDate: undefined,
    // unavailablePlaceholder: undefined
  }

  componentDidMount = () => {
    this.getAllRosters()
    this.getAllStaff()
  }


  openAddEmployeeModal = ( rosterId, rosterLocation, rosterDate, e) => {
    e.preventDefault()
    // set state of selected roster: id, location and date
    this.setState({
      currentRosterId: rosterId,
      currentRosterLocation: rosterLocation,
      currentRosterDate: rosterDate,
      addEmployeeForm: true
    })
    this.getRostersAvailableStaff(rosterLocation, rosterDate)
  }

  openDeleteEmployeeModal = ( rosterId, rosterLocation, rosterDate, e ) => {
    e.preventDefault()
    this.setState({
      currentRosterId: rosterId,
      currentRosterLocation: rosterLocation,
      currentRosterDate: rosterDate,
      deleteEmployeeForm: true
    })
    this.state.rosters.forEach(roster =>
        roster._id === rosterId ?
        this.setState({
          deleteStaff: roster.staff
        })
        : null
      )
  }
  
  closeAddEmployeeModal = e => {
    e.preventDefault()
    this.setState({
      addEmployeeForm: false,
      currentRosterId: undefined,
      currentRosterLocation: undefined,
      currentRosterDate: undefined,
      addPlaceholder: "Select Staff Member",
      addSelect: undefined,
      startTime: undefined,
      endTime: undefined,
      dropAddClass: "dropdown"
      })
  }
  closeDeleteEmployeeModal = e => {
    e.preventDefault()
    this.setState({
      deleteEmployeeForm: false,
      currentRosterId: undefined,
      currentRosterLocation: undefined,
      currentRosterDate: undefined,
      addPlaceholder: "Select Staff Member",
      addSelect: undefined,
      dropAddClass: "dropdown"
      })
  }


  getAllRosters = () => {
    // const rosterUrl = "http://localhost:5000/auth/roster"
    const rosterUrl = `${process.env.REACT_APP_API_URL}/auth/roster`
    axios.get(rosterUrl)
      .then(resp => {
        this.setState({ rosters: resp.data })        
      })
  }
  getAllStaff = () => {
    // const staffUrl = "http://localhost:5000/crew/users"
    const staffUrl = `${process.env.REACT_APP_API_URL}/crew/users`
    axios.get(staffUrl)
      .then(resp => {
        this.setState({ staffList: resp.data })
      })
  }

  getRostersAvailableStaff = (rosterLocation, rosterDate) => {
    // const rosterDayUrl = `http://localhost:5000/auth/staff/${rosterLocation}/${rosterDate}`
    const rosterDayUrl = `${process.env.REACT_APP_API_URL}/auth/staff/${rosterLocation}/${rosterDate}`
    console.log(rosterDayUrl)
    axios.get(rosterDayUrl)
      .then(resp => {
        this.setState({ 
          availableStaff: resp.data,
        }) 
      })
  }

  addEmployee = (staff) => {
    // const url = `http://localhost:5000/auth/roster/${this.state.currentRosterId}`
    const url = `${process.env.REACT_APP_API_URL}/auth/roster/${this.state.currentRosterId}`
    axios.put(url, staff)
      .then(resp => {
        this.setState({ message: 'employee successfully added to shift', error: null})
        console.log(resp)
        this.getAllRosters()
        this.getAllStaff()
      })
      .catch(err => {
        if (err.response === 403) {
          this.setState({ error: 'employee addition unsuccessful', message: null})
          console.log("put request failed")
        }
      })
  } 

  selectDeleteStaff = this.selectDeleteStaff.bind(this);
  selectStaff = this.selectStaff.bind(this);
  
  selectDeleteStaff(event) {
    const employeeToDelete = event.target.id
    // this.state.availableStaff.allStaff.forEach(employee =>
    //   employee.id === addSelection ?
    //   // employee.unavail ?
    //   //   employee.unavail.map( un =>
    //   //     un.date === currentRosterDate ?
    //   //     this.setState({
    //   //       unavailablePlaceholder: `${un.startTime} - ${un.endTime}`
    //   //     })
    //   //     : null
    //   //   )
    //     this.setState({
    //       addPlaceholder: `Selected - ${employee.firstName} ${employee.lastName}`,
    //       dropAddClass: "dropdown selected-add"
    //     })
    //   : null
    //   )
   this.setState({ 
    deleteSelected: employeeToDelete,
  }) 
    console.log(this.state.deleteSelected);
  }
  
  selectStaff(event) {
    console.log(this.state.availableStaff)
    const addSelection = event.target.id
    this.state.availableStaff.allStaff.forEach(employee =>
      employee.id === addSelection ?
      // employee.unavail ?
      //   employee.unavail.map( un =>
      //     un.date === currentRosterDate ?
      //     this.setState({
      //       unavailablePlaceholder: `${un.startTime} - ${un.endTime}`
      //     })
      //     : null
      //   )
        this.setState({
          addPlaceholder: `Selected - ${employee.firstName} ${employee.lastName}`,
          dropAddClass: "dropdown selected-add"
        })
      : null
      )
   this.setState({ 
    addSelect: addSelection,
  }) 
    console.log(this.state.addSelect);
  }
  
  timeChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  };


  // startChange = time => this.setState({ startTime: time })
  // endChange = time => this.setState({ endTime: time })

  handleAdd = (e) => {
    e.preventDefault()
    // // Create new object
    const staff = { 
      staffMember: this.state.addSelect,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    }
    // Send to server
    this.addEmployee(staff)
    // // Close Modal
    this.setState(() => ({
      addEmployeeForm: false,
      currentRosterId: undefined,
      currentRosterLocation: undefined,
      currentRosterDate: undefined,
      addPlaceholder: "Select Staff Member",
      addSelect: undefined,
      startTime: undefined,
      endTime: undefined,
      dropAddClass: "dropdown"
    }))
  }

  handleDelete = (e) => {
    e.preventDefault()
    const deleteRostId = this.state.currentRosterId
    const deleteEmployeeId = this.state.deleteSelected
    const deleteUrl = `${process.env.REACT_APP_API_URL}/auth/roster/${deleteRostId}/${deleteEmployeeId}`
    axios.delete(deleteUrl)
    .then(resp => {
      this.setState({ message: 'employee shift successfully removed', error: null})
      console.log(resp)
      this.getAllRosters()
      this.getAllStaff()
    })
    .catch(err => {
      if (err.response === 403) {
        this.setState({ error: 'employee shift deletion unsuccessful', message: null})
        console.log("put request failed")
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
    console.log(this.state)
    const {open} = this.state
    
    return (
     <Fragment>
     <Navigation/>
        <h2 className="storeHeading">Store Roster</h2>
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
    
      {rosters && rosters.length !== 0 ? 
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
              <div className="dateContainer">
                <p className="rostDayName"><Moment format="ddd Do MMM" date={roster.date} /></p>
              </div>
            {staffList && roster.staff.length > 0 ? 
            <Fragment>
              <div className="removeBtn"
                type="button"
                htmlFor="staffAddButton"
                onClick={this.openDeleteEmployeeModal.bind(this, roster._id, roster.location, roster.date)}
              >
                    <FontAwesomeIcon 
                      className="removeUserIcon"
                      icon="user-times"
                      color="#fff"
                      size="lg"
                    />
                  </div>
              <div className="staffContainer">
              {staffList.map(oneStaff =>
                roster.staff.map((employee, index) => { 
                  return employee && oneStaff &&  employee.staffMember === oneStaff._id ?
                    <Fragment key={index}>
                      <p>{oneStaff.firstName} {oneStaff.lastName}</p>
                      <p>{employee.startTime}-{employee.endTime}</p>
                    </Fragment>
                  : null
                 })) 
                 }                  
                   </div>
                   </Fragment>
            : <div className="emptyStaffContainer">
                <p>
                  No Staff Selected
                </p>
              </div>  } 
            </div>
          : null
        )
      : null }
      </div>    
      <AddEmployeeModal 
        open={this.state.addEmployeeForm} 
        onClose={this.closeAddEmployeeModal} 
        addEmployee={this.addEmployee}
        availableStaff={this.state.availableStaff}
        displayStaffAvailable={this.displayStaffAvailable}
        selectStaff={this.selectStaff}
        timeChange={this.timeChange}
        handleAdd={this.handleAdd}
        addPlaceholder={this.state.addPlaceholder}
        dropAddClass={this.state.dropAddClass}
      />

      <DeleteEmployeeModal 
        open={this.state.deleteEmployeeForm} 
        onClose={this.closeDeleteEmployeeModal} 
        deleteEmployee={this.deleteEmployee}
        selectStaff={this.selectDeleteStaff}
        availableStaff={this.state.availableStaff}
        displayStaffAvailable={this.displayStaffAvailable}
        deleteStaff={this.state.deleteStaff}
        handleDelete={this.handleDelete}
        deletePlaceholder={this.state.deletePlaceholder}

      />

      </Fragment>
      ) 
  }
  

}