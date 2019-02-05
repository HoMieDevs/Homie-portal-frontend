import React, { Component, Fragment } from 'react'
import { render } from "react-dom";
import Modal from "react-responsive-modal";
import AllStaff from './AllStaff';

class AddEmployeeModal extends Component {

  render () {
    // console.log(this.props)
    return(


        <Modal open={this.props.open} onClose={this.props.onClose} center>
          <h2>Add Staff</h2>
            {this.props.availableStaff ? 
              this.props.availableStaff.staffSelect ? 
                this.props.availableStaff.staffSelect.map(staff => 
                staff ? 
                console.log(staff)
                : 
                  console.log("no staff"))
              :
                console.log("no allStaff")
            : 
              console.log("no availableStaff")}
        </Modal>

    )
  }
}

export default AddEmployeeModal

