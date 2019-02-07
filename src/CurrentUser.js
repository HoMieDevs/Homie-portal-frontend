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
      // .get(`${process.env.REACT_APP_DEV_API_URL}/auth/me`)
      .get(`${process.env.REACT_APP_API_URL}/auth/me`)
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
