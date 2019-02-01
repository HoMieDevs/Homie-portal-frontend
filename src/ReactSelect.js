import React, { Component, Fragment } from 'react'
import Select from 'react-select';
import axios from 'axios';
import Navigation from './Navigation';
import './css/RosterAdmin.css'
axios.defaults.withCredentials = true;

const options = [
  { value: 'storeRoster', label: 'Store Roster' },
  { value: 'officeRoster', label: 'Office Roster' },
];

export default class ReactSelct extends Component {
  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  
  render() {
    const { selectedOption } = this.state;
    return (
      <Fragment>
        <Navigation/>
        <div className="selectBox">
          <Select
            className="rosterSelect"
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
            placeholder ="Store Roster"
          />
        </div>
      </Fragment>
    )
  }
}
