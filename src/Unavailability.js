import React, { Component } from 'react'
import axios from 'axios';
import Header from './Header';
// import Footer from './Footer';
import './css/Register.css'
axios.defaults.withCredentials = true;

export default class Register extends Component {
  state = {
    unavailability: [{
        date:Date
    }],
  }
    handleInputChange = (e) => {
        const { value, id } = e.currentTarget;
        this.setState({ [id]: value})
        console.log({ [id]: value})
    }
    submitForm = (e) => {
        e.preventDefault()
        // console.log(this.state)
        const date ={ date: this.state.date}
        const unavailability = this.state.unavailability.push(date)
        // console.log(this.state.unavailability)
        // console.log(this.state)
        const url = "http://localhost:5000/auth/unavailability/5c4a9b4dc8989d0ff203c621"
        const data = {date}
        // console.log(data)
        axios.put(url, data)
            .then(console.log(data))
            .then(resp => {
                console.log(resp.data)
                this.setState({ message: `${unavailability} has been added`, error: null})
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
            <div className="register">
                <Header />
                <h3 className="registerH3">Add Staff</h3>
                <form className="registerForm">
                    <div className="registerField">
                        <label htmlFor="date">date:</label>
                        <input 
                            type="string" 
                            id="date" 
                            placeholder="date" 
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "date"} 
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <button className="registerStaffBtn" onClick={this.submitForm}>+ Submit</button>
                </form>
                { error && <p>{ error }</p> }
                { message && <p>{ message }</p>}
            </div>

    )
  }
}

// import React, { Component } from 'react'
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';
// import './css/Register.css'
// axios.defaults.withCredentials = true;

// export default class Register extends Component {
//     state = { }
//     handleInputChange = (e) => {
//         const { value, id } = e.currentTarget;
//         this.setState({ [id]: value})
//     }
//     submitForm = (e) => {
//         e.preventDefault()
//         // console.log(this.state)
//         const {  unavailability } = this.state
//         const url = "http://localhost:5000/auth/unavailability/5c4a9b4dc8989d0ff203c621"
//         const data = { unavailability }
//         axios.post(url, data)
//             .then(resp => {
//                 console.log(resp)
//                 this.setState({ message: `${unavailability} has been added`, error: null})
//             })
//             .catch(err => {
//                 console.log(err.response)
//                 if (err.response === 403) {
//                     this.setState({ error: 'Registration Unsuccessful', message: null})
//                 }
//             })
//     }
//     render() {
//         const { error, message } = this.state
//         return (
//             <div className="register">
//                 <Header />
//                 <h3 className="registerH3">Add Staff</h3>
//                 <form className="registerForm">
//                     <div className="registerField">
//                         <label htmlFor="unavailability">Unavailability:</label>
//                         <input 
//                             type="string" 
//                             id="unavailability" 
//                             placeholder="First Name" 
//                             onFocus={(e) => e.target.placeholder = ""} 
//                             onBlur={(e) => e.target.placeholder = "Unavailability"} 
//                             onChange={this.handleInputChange}
//                         />
//                     </div>
 
//                     <button className="registerStaffBtn" onClick={this.submitForm}>+ Submit</button>
//                 </form>
//                 { error && <p>{ error }</p> }
//                 { message && <p>{ message }</p>}
//                 <Footer />
//             </div>

//     )
//   }
// }