import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  state = {};
  handleInputChange = (e) => {
    const { value, id } = e.currentTarget;
    this.setState({ [id]: value });
  }

  submitForm = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const url = "http://localhost:5000/";
    const data = {
      email,
      password
    }

    axios.post(url, data)
      .then(resp => {
        const { token } = resp.data;
        localStorage.setItem('token', token);
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
        <form>
          <label htmlFor="email">Email: </label>
          <input type="text" id="email" onChange={this.handleInputChange} />
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" onChange={this.handleInputChange} />
          <button onClick={this.submitForm}>Login</button>
        </form>
        { error && <p>{ error }</p> }
        { message && <p>{ message }</p> }
        {/* <button onClick={this.handleProtectedRequest}>Request protected</button> */}
      </>
    );
  }
}

export default Form;