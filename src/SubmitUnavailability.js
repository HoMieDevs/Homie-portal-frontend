
import React, { Component, Fragment } from "react";
import axios from "axios";
import "./css/Register.css";
axios.defaults.withCredentials = true;

var moment = require("moment");

class SubmitUnavailability extends Component {
  state = {
    UserUnavailability: []
  };

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://localhost:5000/auth/unavailibility/${userId}`)
      .then(resp => {
        console.log(resp.data.UserUnavailability);
        const sorted = resp.data.UserUnavailability.sort((a, b) => {
          return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
          // return new Date(a.date) > new Date(b.date);
        });
        console.log(sorted);
        this.setState({ UserUnavailability: sorted });
      });
  }

  componentDidUpdate() {
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://localhost:5000/auth/unavailibility/${userId}`)
      .then(resp => {
        console.log(resp.data.UserUnavailability);
        const sorted = resp.data.UserUnavailability.sort((a, b) => {
          return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
          // return new Date(a.date) > new Date(b.date);
        });
        console.log(sorted);
        this.setState({ UserUnavailability: sorted });
      });
  }

  render() {
    return (
      <div className="main">
        {this.state.UserUnavailability.map((unavailability, index) => {
          return (
            <div>
              <li>{unavailability.date}</li>
              <li>{unavailability.comment}</li>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SubmitUnavailability;
