import React, { Component } from 'react'
import axios from 'axios'

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
            <>
            <h1>HoMie CrEw</h1>
                <h2>Sign In</h2>
                <form>
     
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={this.handleInputChange}/><br/>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" onChange={this.handleInputChange}/><br/>
    
                    <button onClick={this.submitForm}>Login</button>
                </form>

                { error && <p>{ error }</p> }
                { message && <p>{ message }</p>}
            </>

    )
  }
}