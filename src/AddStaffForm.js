import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  state = {};
  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  }

  submitRegistration = (e) => {
    e.preventDefault();
    const { firstName, lastName, mobile, email, password } = this.state;
    const url = "http://localhost:5000/addstaff";
    const data = {
      firstName,
      lastName,
      mobile,
      email,
      password
    }

    axios.post(url, data)
      .then(res => {
        if (!firstName) {
          return alert('first name required')
        }
        if (!lastName) {
          alert('last name required')
        }
        if (!email) {
          alert('email required')
        }
        if (!password) {
          alert('password required')
        }
        const { token } = res.data
        localStorage.setItem('token', token)
        this.setState({ message: 'User has been created.', error: undefined })
      })

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
        <form>
          <label htmlFor="firstName">First Name: </label>
          <input type="text" id="firstName" onChange={this.handleInputChange} />
          <label htmlFor="lastName">Last Name: </label>
          <input type="text" id="lastName" onChange={this.handleInputChange} />
          <label htmlFor="mobile">Mobile: </label>
          <input type="text" id="mobile" onChange={this.handleInputChange} />
          <label htmlFor="email">Email: </label>
          <input type="text" id="email" onChange={this.handleInputChange} />
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" onChange={this.handleInputChange} />
          <button onClick={this.submitRegistration}>Add Staff</button>
        </form>
        { error && <p>{ error }</p> }
        { message && <p>{ message }</p> }
        {/* <button onClick={this.handleProtectedRequest}>Request protected</button> */}
      </>
    );
  }
}

export default Form;