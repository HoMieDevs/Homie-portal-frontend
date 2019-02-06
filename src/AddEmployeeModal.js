import React, { Component, Fragment } from 'react'
import { render } from "react-dom";
import Modal from "react-responsive-modal";
import './css/AddStaffModal.css'
import AllStaff from './AllStaff';
import DropdownStaff from './DropdownStaff';
import Moment from 'react-moment';
import 'moment-timezone';
import TimePicker from 'react-time-picker';

class AddEmployeeModal extends Component {

  render () {
    return(


        <Modal open={this.props.open} onClose={this.props.onClose} center>
          <form action=""></form>
          <h2>Add Staff</h2>
          <br/>
            <h3>Staff Member:</h3>
          <br/>
        <DropdownStaff availableStaff={this.props.availableStaff} />

        {/* <label>
            <select value={this.props.value} onChange={this.props.selectStaff} >
              <option value=''>Select A Staff Member</option>
            {this.props.availableStaff ? 
              this.props.availableStaff.allStaff ?
                this.props.availableStaff.allStaff.length > 0? 
                this.props.availableStaff.allStaff.map((staff, index) =>
                  staff.unavail && staff.unavail.length > 0 ?
                    staff.unavail.map((unav, index) =>
                      unav.allDay ? 
                      <option key={index} value={staff.id} disabled>{staff.firstName} {staff.lastName} | Unavailable: All Day </option>
                      : <option key={index} value={staff.id}>{staff.firstName} {staff.lastName} | Unavailable: {unav.startTime} - {unav.endTime} </option>
                    )
                  : <option key={index} value={staff.id}>{staff.firstName} {staff.lastName}</option> 
                )
                : console.log("all staff not greater than 0")
              : console.log("no availableStaff.allStaff")
            : console.log("no availableStaff?")} 
            </select>
          </label> */}


          <br/>
          <br/>
          <label className="start-time gr">
            <h3>Start Time:</h3>
            <input type="time" className="time" id="startTime" placeholder="time" onChange={this.props.timeChange}/>
          </label>
          <label className="start-time gr">
            <h3>End Time:</h3>
            <input type="time" className="time" id="endTime" placeholder="time" onChange={this.props.timeChange}/>
          </label>

        <button className="add-staff-btn" onClick={this.props.handleAdd}>+ Shift</button>
              
        </Modal>

    )
  }
}

export default AddEmployeeModal

