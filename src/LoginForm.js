import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import homieLogo from './homieLogo.svg';

class Form extends Component {
  state = {};
  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  }

  submitForm = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const url = "http://localhost:5000/auth/login";
    const data = {
      email,
      password
    }

    axios.post(url, data)
      .then(resp => {
        const { token } = resp.data;
        localStorage.setItem('token', token);
        console.log(resp)
        // RE-ROUTE TO HOMEPAGE
        this.setState({ message: 'Successfully signed in.', error: undefined });
      })
      .catch(error => {
        const { status } = error.response;
        if (status === 403) {
          this.setState({ error: 'Incorrect credentials.', message: undefined });
        }
      });
  }

  // handleProtectedRequest = (e) => {
    
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const url = "http://localhost:5000/protected/resources";
  //     const options = {
  //       headers: {
  //         token
  //       }
  //     }
  //     axios.get(url, options)
  //       .then(resp => {
  //         this.setState({ message: resp.data, error: undefined });
  //       })
  //       .catch(err => {
  //           console.log("IN REACT ERR")
  //           this.setState({ error: err.response, message: undefined });
  //       })
  //   } else {
  //     this.setState({ error: 'Not authenticated. Please log in', message: undefined })
  //   }
  // }

  render() {
    const { error, message } = this.state;
    return (
      <>
        <img className="homieLogoLogin" src={homieLogo} alt="homie logo"/>
        <form>
          <label className="loginLabel" htmlFor="email">Email: </label>
          <input className="loginInput" type="text" id="email" placeholder="Email" onChange={this.handleInputChange} />
          <label className="loginLabel" htmlFor="password">Password: </label>
          <input className="loginInput" type="password" id="password" placeholder="Password" onChange={this.handleInputChange} />
          <button className="loginBtn" onClick={this.submitForm}>LOGIN</button>
          <a className="forgotPass" href="www.google.com">Forgot Password?</a>
        </form>
        { error && <p>{ error }</p> }
        { message && <p>{ message }</p> }
        {/* <button onClick={this.handleProtectedRequest}>Request protected</button> */}

      </>
    );
  }
}

export default Form;