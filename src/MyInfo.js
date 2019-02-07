import React, { Component, Fragment } from "react";
import axios from "axios";
import Navigation from "./Navigation";
// import EditMyInfo from "./EditMyInfo";
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
    const myUrl = `http://localhost:5000/auth/me`
    // const myUrl = `${process.env.REACT_APP_DEV_API_URL}/auth/me`
    // const myUrl = `${process.env.REACT_APP_API_URL}/auth/me`;
    axios.get(myUrl).then(resp => {
      const { _id, firstName, lastName, email, mobile } = resp.data;
      this.setState({ _id, firstName, lastName, email, mobile });
    });
  };

  editInfo = (id) => {
    const url = `http://localhost:5000/auth/user/${id}`
    // const url = `${process.env.REACT_APP_API_URL}/user/${id}`

    const data = true
    axios.delete(url, data)
      .then(resp => {
        this.setState({ message: 'information ', error: null})
      })
      .catch(err => {
        if (err.response === 403) {
          this.setState({ error: 'information not updated', message: null})
        }
      })
  }

  render() {
    const { _id, firstName, lastName, email, mobile } = this.state;
    console.log(mobile);
    return (
      <Fragment>
        <Navigation />
        <h2>My Info</h2>
        <FontAwesomeIcon className="homeAvatarIcon" icon="user" size="2x" />
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
