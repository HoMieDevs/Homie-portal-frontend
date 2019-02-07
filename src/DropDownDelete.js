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
           <div className="button" onClick={this.showDropdownMenu}>DELETE STAFF</div>
            { this.state.displayMenu ? 
              this.props.deleteStaff ? 
                this.props.deleteStaff ?
                  this.props.deleteStaff.length > 0?
                  <ul> 
                  {this.props.deleteStaff.map((staff, index) =>
                    staff.staffMember && staff.startTime && staff.endTime ?
                        <li onClick={this.props.selectStaff} key={index} id={staff.staffMember}>{staff.startTime} {staff.endTime} </li>
                        : null 
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