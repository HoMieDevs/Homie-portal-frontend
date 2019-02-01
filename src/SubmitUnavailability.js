import React, { Component, Fragment } from "react";
import axios from "axios";
import "./css/Register.css";
axios.defaults.withCredentials = true;

class SubmitUnavailability extends Component {
  state = {
    UserUnavailability: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/auth/unavailibility/5c490ad5d0df64349e49d792")
      .then(resp => this.setState(resp.data));
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:5000/auth/unavailibility/5c490ad5d0df64349e49d792")
      .then(resp => this.setState(resp.data));
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
