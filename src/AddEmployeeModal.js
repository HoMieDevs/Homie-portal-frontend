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
          <h2 className="modal-header">Add Staff</h2>
          <br/>
            <h3>Staff Member:</h3>
          <br/>
        <DropdownStaff availableStaff={this.props.availableStaff} selectStaff={this.props.selectStaff} addPlaceholder={this.props.addPlaceholder} dropAddClass={this.props.dropAddClass}/>
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

