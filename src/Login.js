import React, { Component } from 'react'
import axios from 'axios'
import homieLogo from './homieLogo.svg';
import './css/Login.css';
axios.defaults.withCredentials = true;

export default class Login extends Component {
  state = { }
  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value})
  }
  submitForm = (e) => {
    e.preventDefault()
    // console.log(this.state)
    const { email, password } = this.state
    const url = "http://localhost:5000/auth/login"
    const data = { email, password }
    axios.post(url, data)
    .then(resp => {
      this.setState({ message: 'successfully logged in', error: null})
      axios.get('http://locahost:5000/auth/me')
      .then(resp => console.log(resp.data))
    })
    .catch(err => {
      console.log(err.response)
      if (err.response === 403) {
        this.setState({ error: 'bad credentials', message: null})
      }
    })
  }
  
  render() {
    const { error, message } = this.state
    return (
      <div className="loginContainer">
        <img className="homieLogoLogin" src={homieLogo} alt="homie logo"/>
        <h1>HoMie <span className="crewBlue">CrEw</span></h1>
        <form>

          <label className="loginLabel" htmlFor="email">Email Address:</label>
          <br/>
          <input className="loginInput" type="email" id="email" placeholder="Email Address" onFocus={(e) => e.target.placeholder = ""} 
  onBlur={(e) => e.target.placeholder = "Email Address"} onChange={this.handleInputChange}/><br/>
          <label className="loginLabel" htmlFor="password">Password: </label>
          <br/>
          <input className="loginInput" type="password" id="password" placeholder="Password" onFocus={(e) => e.target.placeholder = ""} 
  onBlur={(e) => e.target.placeholder = "Password"} onChange={this.handleInputChange}/><br/>

          <button className="loginBtn" onClick={this.submitForm}>LOGIN</button>
          <a className="forgotPass" href="www.google.com">Forgot Password?</a>
        </form>

        { error && <p>{ error }</p> }
        { message && <p>{ message }</p>}
      </div>
    )
  }
}
// ___ _   _ ___   _  _  ___  __  __ ___ ___ ___ _ 
// / __| | | | _ \ | || |/ _ \|  \/  |_ _| __/ __| |
// \__ \ |_| |  _/ | __ | (_) | |\/| || || _|\__ \_|
// |___/\___/|_|   |_||_|\___/|_|  |_|___|___|___(_)