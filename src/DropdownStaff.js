import React from 'react';
import './css/DropdownStaff.css';

class Dropdown extends React.Component {
  constructor(){
   super();
  
   this.state = {
         displayMenu: false,
       };
  
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  
  };
  
  showDropdownMenu(event) {
      event.preventDefault();
      this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
      });
    }
  
    hideDropdownMenu() {
      this.setState({ displayMenu: false }, () => {
        document.removeEventListener('click', this.hideDropdownMenu);
      });
  
    }
  
    render() {
      return (
          <div  className={this.props.dropAddClass} >
           <div className="button" onClick={this.showDropdownMenu}>{this.props.addPlaceholder}</div>
            { this.state.displayMenu ? 
              this.props.availableStaff ? 
                this.props.availableStaff.allStaff ?
                  this.props.availableStaff.allStaff.length > 0?
                  <ul> 
                  {this.props.availableStaff.allStaff.map((staff, index) =>
                    staff.unavail && staff.unavail.length > 0 ?
                      staff.unavail.map((unav, index) =>
                        unav.allDay ? 
                        <li className="unavailable" key={index} id={staff.id} disabled>{staff.firstName} {staff.lastName} <span className="unavailable-red"> Unavailable: All Day</span> </li>
                        : <li onClick={this.props.selectStaff} key={index} id={staff.id} className="available">{staff.firstName} {staff.lastName} <span className="unavailable-red"> Unavailable: {unav.startTime} - {unav.endTime}</span> </li>
                      )
                    : <li className="available" onClick={this.props.selectStaff} key={index} id={staff.id}>{staff.firstName} {staff.lastName}</li> 
                  )}</ul>
                  : console.log("all staff not greater than 0")
                : console.log("no availableStaff.allStaff")
              : console.log("no availableStaff?")       
            : null }
  
         </div>
  
      );
    }
  }
  
  export default Dropdown;