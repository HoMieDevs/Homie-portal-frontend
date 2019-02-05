import React, { Component, Fragment } from 'react'
import { render } from "react-dom";
import Modal from "react-responsive-modal";
import AllStaff from './AllStaff';

class AddEmployeeModal extends Component {

  render () {
    // console.log(this.props)
    return(


        <Modal open={this.props.open} onClose={this.props.onClose} center>
        <label>
            Staff Member:
          <br/>
            <select value={this.props.value} onChange={this.props.selectStaff}>
              <option value=''>Select A Staff Member</option>
            {this.props.availableStaff ? 
            this.props.availableStaff.allStaff.map(s => s ? 
              <Fragment>
               {s.unavail ? 
                s.unavail.map(u =>
                u.allDay ? <option value={s.id} disabled>{s.firstName} {s.lastName} | Unavailable: All Day </option>  : <option value={s.id}>{s.firstName} {s.lastName} | Unavailable: {u.startTime} - {u.endTime} </option>)
              : <option value={s.id}>{s.firstName} {s.lastName}</option> 
              }
              </Fragment>
              : console.log("no availableStaff.s")) 
            : console.log("no availableStaff?")} 
            </select>
          </label>





{/* 
          <h2>Add Staff</h2>
            {this.props.availableStaff ? 
              this.props.availableStaff.staffSelect ? 
                this.props.availableStaff.allStaff.map(staff => 
                staff ? 
                console.log(staff)
                : 
                  console.log("no staff"))
              :
                console.log("no allStaff")
            : 
              console.log("no availableStaff")} */}
        </Modal>

    )
  }
}

export default AddEmployeeModal

