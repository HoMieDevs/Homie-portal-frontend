import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import homieLogo from "./images/homieLogo.svg";
import "./css/Login.css";
axios.defaults.withCredentials = true;

export default class Login extends Component {
  state = {};

  submitForm = e => {
    // console.log("logging in");
    e.preventDefault();
    const email = e.target.form[0].value;
    const password = e.target.form[1].value;
    const user = {
      email,
      password
    };
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    axios
      .post(url, user)
      .then(resp => {
        console.log(resp);
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("userId", resp.data.userId);
        this.setState({ message: "successfully logged in", error: null });
        resp.data.admin
          ? localStorage.setItem("isAdmin", true)
          : console.log("Welcome HoMie");
        // axios.get('http://locahost:5000/auth/me')
        // .then(resp => console.log(resp.data))
      })
      .catch(err => {
        console.log(err.response);
        if (err.response === 403) {
          this.setState({ error: "bad credentials", message: null });
        }
      });
  };

  render() {
    const { error, message } = this.state;
    const isAuth = localStorage.getItem("isAuthenticated");
    const { from } = this.props.location.state || {
      from: { pathname: "/home" }
    };
    return !isAuth ? (
      <div className="loginContainer">
        <img className="homieLogoLogin" src={homieLogo} alt="homie logo" />
        <h1 className="loginH1">
          HoMie <span className="crewBlue">CrEw</span>
        </h1>
        <form className="loginForm">
          <label className="loginLabel loginEmailLb" htmlFor="email">
            Email Address:
          </label>
          <input
            className="loginInput loginEmailIn"
            type="email"
            id="email"
            placeholder="Email Address"
            onFocus={e => (e.target.placeholder = "")}
            onBlur={e => (e.target.placeholder = "Email Address")}
            onChange={this.handleInputChange}
          />
          <label className="loginLabel loginPassLb" htmlFor="password">
            Password:{" "}
          </label>
          <input
            className="loginInput loginPassIn"
            type="password"
            id="password"
            placeholder="Password"
            onFocus={e => (e.target.placeholder = "")}
            onBlur={e => (e.target.placeholder = "Password")}
            onChange={this.handleInputChange}
          />
          <button className="loginBtn" onClick={this.submitForm}>
            LOGIN
          </button>
          <a className="forgotPass" href="forgotpass">
            Forgot Password?
          </a>
        </form>

        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
      </div>
    ) : (
      <Redirect to={from} />
    );
  }
}
// ___ _   _ ___   _  _  ___  __  __ ___ ___ ___ _
// / __| | | | _ \ | || |/ _ \|  \/  |_ _| __/ __| |
// \__ \ |_| |  _/ | __ | (_) | |\/| || || _|\__ \_|
// |___/\___/|_|   |_||_|\___/|_|  |_|___|___|___(_)
