import React, { Component, Fragment } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import "./css/MyInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
axios.defaults.withCredentials = true;

export default class MyInfo extends Component {
  state = {
    firstName: "loading",
    LastName: "loading",
    email: "loading",
    mobile: "loading"
  };

  componentDidMount = () => {
    const myUrl = `${process.env.REACT_APP_DEV_API_URL}/auth/me`
    // const myUrl = `${process.env.REACT_APP_API_URL}/auth/me`;
    axios.get(myUrl).then(resp => {
      const { firstName, lastName, email, mobile } = resp.data;
      this.setState({ firstName, lastName, email, mobile });
    });
  };

  render() {
    const { firstName, lastName, email, mobile } = this.state;
    console.log(mobile);
    return (
      <Fragment>
        <Navigation />
        <h2>My Info</h2>
        <FontAwesomeIcon className="avatarIcon" icon="user" size="2x" />
        <br />
        <button className="myInfoButton">Edit Avatar</button>
        <div className="myInfoText">
          <p>First Name:</p>
          <p>{firstName}</p>
          <p>Last Name:</p>
          <p>{lastName}</p>
          <p>Email Address:</p>
          <p>{email}</p>
          <p>Mobile:</p>
          <p>{mobile === undefined ? "-" : mobile}</p>
        </div>
        <button className="myInfoButton">Edit</button>
      </Fragment>
    );
  }
}
