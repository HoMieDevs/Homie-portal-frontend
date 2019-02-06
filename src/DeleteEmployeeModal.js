import React, { Component, Fragment } from 'react'
import { render } from "react-dom";
import Modal from "react-responsive-modal";
import './css/AddStaffModal.css'
import AllStaff from './AllStaff';
import DropDownDelete from './DropDownDelete';
import Moment from 'react-moment';
import 'moment-timezone';
import TimePicker from 'react-time-picker';

class DeleteEmployeeModal extends Component {

  render () {
    return(


        <Modal open={this.props.open} onClose={this.props.onClose} center>
          <form action=""></form>
          <h2>Delete Staff</h2>
          <br/>
            <h3>Staff Member:</h3>
          <br/>
        <DropDownDelete availableStaff={this.props.availableStaff} selectStaff={this.props.selectStaff} addPlaceholder={this.props.addPlaceholder} />
          <br/>

        <button className="delete-staff-btn" onClick={this.props.handleDelete}>- Delete</button>
              
        </Modal>

    )
  }
}

export default DeleteEmployeeModal

