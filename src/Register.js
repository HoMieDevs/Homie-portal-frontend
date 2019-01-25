import React, { Component } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true;

export default class Register extends Component {
    state = { }
    handleInputChange = (e) => {
        const { value, id } = e.currentTarget;
        this.setState({ [id]: value})
    }
    submitForm = (e) => {
        e.preventDefault()
        // console.log(this.state)
        const {  firstName, lastName, mobile, email, password } = this.state
        const url = "http://localhost:5000/auth/register"
        const data = { firstName, lastName, mobile, email, password }
        axios.post(url, data)
            .then(resp => {
                console.log(resp)
                this.setState({ message: `${firstName} has been added`, error: null})
            })
            .catch(err => {
                console.log(err.response)
                if (err.response === 403) {
                    this.setState({ error: 'Registration Unsuccessful', message: null})
                }
            })
    }
    render() {
        const { error, message } = this.state
        return (
            <>
                <h2>Add New Staff Member</h2>
                <form>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" onChange={this.handleInputChange}/><br/>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" onChange={this.handleInputChange}/><br/>
                    <label htmlFor="email">email</label>
                    <input type="email" id="email" onChange={this.handleInputChange}/><br/>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" onChange={this.handleInputChange}/><br/>
                    <label htmlFor="mobile">Mobile</label>
                    <input type="string" id="mobile" onChange={this.handleInputChange}/><br/>
                    <button onClick={this.submitForm}>Add Staff</button>
                </form>

                { error && <p>{ error }</p> }
                { message && <p>{ message }</p>}
            </>

    )
  }
}
