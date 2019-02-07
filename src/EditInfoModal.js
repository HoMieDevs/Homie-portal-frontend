import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

class EditInfoModal extends Component {
  componentWillMount = () => {
    Modal.setAppElement('body')
  }

  render () {
    return(
       <Modal
        isOpen={this.props.editInfoForm}
        contentLabel="AddEmployeeForm"
        className="modal"
      >
        <form onSubmit={this.props.handleCreate}>
          <div className="modal-container">
            <input
              className="firstname"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name..."
              required
            />
            <input
              className="lastname"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name..."
              required
            />
            <input
              className="email"
              type="email"
              name="email"
              id="email"
              placeholder="Email..."
              required
            />
            <input
              className="st"
              type="number"
              step="0.5"
              name="standardRate"
              id="standardRate"
              min={1900 / 100} // cent to doller
              placeholder="Paymemt Rate..."
              required
            />
            <div className="staff-add">
              <div className="staff-add-drop" type="button" onClick={this.props.toggleStaffDrop}>{this.props.displayStaffAvailable ? 'Close' : 'Location'} &#x25BC; </div>
              <div className={this.props.displayStaffAvailable ? 'staff_add_drop_active' : 'staff_add_drop_hidden'}>
                { this.props.staffList.map((employee, index) => {
                  return (
                    <label key={index} className="checkbox" htmlFor={employee}>
                      <input
                        type="checkbox"
                        name="employee"
                        value={employee.id}
                      />{employee.firstName}
                    </label>
                  )
                })}
              </div>
            </div>
            <input
              className="submit"
              type="submit"
              value="CreateNew"
            />
            <button className="cancel" onClick={this.props.closeAddEmployeeModal}>Cancel</button>
          </div>
        </form>
      </Modal>
    )
  }
}

export default EditInfoModal