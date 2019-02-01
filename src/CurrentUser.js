import React, { Component, Fragment } from "react";
import axios from "axios";
import "./css/Register.css";
axios.defaults.withCredentials = true;

class CurrentUser extends Component {
  state = {
    currentUser: {}
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/auth/me")
      .then(resp => this.setState(resp.data));
  }

  render() {
    return (
      <div className="main">
        <li>Hi</li>
      </div>
    );
  }
}

export default CurrentUser;
