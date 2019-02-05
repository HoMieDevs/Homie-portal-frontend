import React, { Component, Fragment } from "react";
import axios from "axios";
import "./css/Register.css";
axios.defaults.withCredentials = true;

class SubmitUnavailability extends Component {
  state = {
    UserUnavailability: [],
    User: null
  };

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://localhost:5000/auth/unavailibility/${userId}`)
      .then(resp => this.setState(resp.data));
  }

  componentDidUpdate() {
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://localhost:5000/auth/unavailibility/${userId}`)
      .then(resp => this.setState(resp.data));
  }

  deleteTimeOff = (unid) => {
    const userId = localStorage.getItem("userId");
    axios.delete(`http://localhost:5000/auth/unavailability/${userId}/${unid}`)
    .then(console.log('Deleted'))
    .catch(err => console.log(err))
  }
  
  render() {
    return (
      <div className="main">
        {this.state.UserUnavailability.map((unavailability, index) => {
          return (
            <div>
              <li>{unavailability.date}</li>
              <li>{unavailability.comment}</li>
              <input onClick={() => this.deleteTimeOff(unavailability._id)} className="delete-button" type="delete" value="Delete" />
            </div>
          );
        })}
      </div>
    );
  }
}

export default SubmitUnavailability;
