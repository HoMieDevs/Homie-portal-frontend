import React, { Component } from "react";
import axios from "axios";
import "./css/Register.css";
axios.defaults.withCredentials = true;

export default class EditMyInfo extends Component {
  state = {};

  handleInputChange = e => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  };

  componentDidMount = () => {
    // const myUrl = `http://localhost:5000/auth/me`
    // const myUrl = `${process.env.REACT_APP_DEV_API_URL}/auth/me`
    // console.log(myUrl)
    const myUrl = `${process.env.REACT_APP_API_URL}/auth/me`;
    axios.get(myUrl).then(resp => {
      const { _id } = resp.data;
      this.setState({ _id });
    });
  };

  submitForm = e => {
    e.preventDefault();
    // console.log(this.state)
    const { firstName, lastName, mobile } = this.state;
    const id = this.state._id
    // const url = `http://localhost:5000/auth/user/${id}`;
    console.log(url)
    const url = `${process.env.REACT_APP_API_URL}/auth/user/${id}`;
    const data = { firstName, lastName, mobile };
    axios
      .put(url, data)
      .then(resp => {
        console.log(resp);
        this.setState({ message: `${firstName} has been updated`, error: null });
      })
      .catch(err => {
        if (err.response === 403) {
          this.setState({ error: "Update Unsuccessful", message: null });
        }
      });
  };

  render() {
    const { error, message } = this.state;
    return (
      <div className="register">
        <h3 className="registerH3">Edit My Info</h3>
        <form className="registerForm">
          <div className="registerField">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "First Name")}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="registerField">
            <label htmlFor="lastName"> Last Name:</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Last Name")}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="registerField">
            <label htmlFor="mobile">Mobile: </label>
            <input
              type="string"
              id="mobile"
              onChange={this.handleInputChange}
              placeholder="Mobile"
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Mobile")}
            />
          </div>
          <button className="editStaffBtn" onClick={this.submitForm}>+ Edit</button>
        </form>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
      </div>
    );
  }
}
