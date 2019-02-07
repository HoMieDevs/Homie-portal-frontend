import React, { Component } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import "./css/Register.css";
axios.defaults.withCredentials = true;

export default class Register extends Component {
  state = {};

  handleInputChange = e => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  };

  submitForm = e => {
    e.preventDefault();
    // console.log(this.state)
    const { firstName, lastName, mobile, email, password } = this.state;
    // const url = `${process.env.REACT_APP_DEV_API_URL}/auth/register`;
    const url = `${process.env.REACT_APP_API_URL}/auth/register`;
    const data = { firstName, lastName, mobile, email, password };
    axios
      .post(url, data)
      .then(console.log(data))
      .then(resp => {
        console.log(resp);
        this.setState({ message: `${firstName} has been added`, error: null });
      })
      .catch(err => {
        console.log(err.response);
        if (err.response === 403) {
          this.setState({ error: "Registration Unsuccessful", message: null });
        }
      });
  };

  render() {
    const { error, message } = this.state;
    return (
      <div className="register">
        <Navigation />
        <h3 className="registerH3">Add Staff</h3>
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
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Email Address")}
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
          <div className="registerField">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Password")}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="registerField">
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              id="password"
              placeholder="Confirm Password"
              onFocus={e => (e.target.placeholder = "")}
              onBlur={e => (e.target.placeholder = "Confirm Password")}
              onChange={this.handleInputChange}
            />
          </div>
          <button className="registerStaffBtn" onClick={this.submitForm}>
            + Submit
          </button>
        </form>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
      </div>
    );
  }
}
