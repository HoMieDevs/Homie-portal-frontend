import React, { Component, Fragment } from 'react'
import { render } from "react-dom";
import Modal from "react-responsive-modal";
import AllStaff from './AllStaff';
import Moment from 'react-moment';
import 'moment-timezone';
import TimePicker from 'react-time-picker';

class AddEmployeeModal extends Component {

  render () {
    // console.log(this.props)
    return(


        <Modal open={this.props.open} onClose={this.props.onClose} center>
          <form action=""></form>
        <label>
            Staff Member:
          <br/>
            <select value={this.props.value} onChange={this.props.selectStaff}>
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
          </label>

        

          <br/>
          <br/>
          <br/>
          <label>Start Time:</label>
          <br/>
          <TimePicker
          hourHandLength={45}
          hourHandOppositeLength={15}
          hourHandWidth={6}
          hourMarksLength={16}
          hourMarksWidth={6}
          isOpen={null}
          locale={"en-US"}
          maxDetail={"minute"}
          minuteHandLength={67}
          minuteHandOppositeLength={15}
          minuteHandWidth={4}
          minuteMarksWidth={2}
          onChange={this.props.startChange}
          value={this.props.start}
        />
          <br/>
          <label>End Time:</label>
          <br/>
          <TimePicker
          hourHandLength={45}
          hourHandOppositeLength={15}
          hourHandWidth={6}
          hourMarksLength={16}
          hourMarksWidth={6}
          isOpen={null}
          locale={"en-US"}
          maxDetail={"minute"}
          minuteHandLength={67}
          minuteHandOppositeLength={15}
          minuteHandWidth={4}
          minuteMarksWidth={2}
          onChange={this.props.endChange}
          value={this.props.emd}
        />
        <button className="rosterStaffBtn" onClick={this.props.handleAdd}>+ Shift</button>
              
        </Modal>

    )
  }
}

export default AddEmployeeModal

