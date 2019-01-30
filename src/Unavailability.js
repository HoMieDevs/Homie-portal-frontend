import React, { Component } from 'react'
import axios from 'axios';
import Header from './Header';
// import Footer from './Footer';
import './css/Register.css'
axios.defaults.withCredentials = true;

export default class Register extends Component {
  state = {
    unavailability: [{
        date: Date,
        allDay: Boolean,
        startTime: String,
        endTime: String,
        comment: String,
        approved: Boolean
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
        // const date ={ date: this.state.date}
        // const unavailability = this.state.unavailability.push(date)
        // console.log(this.state.unavailability)
        // console.log(this.state)
        const { unavailability: [{date, allDay, startTime, endTime, comment, approved}]} = this.state

        const url = "http://localhost:5000/auth/unavailability/5c4a9b4dc8989d0ff203c621"
        const data = { unavailability: [{date, allDay, startTime, endTime, comment, approved}] }
        // console.log(data)
        axios.put(url, data)
            .then(resp => {
                console.log('hello kam is a noob.she has gained weight and trying to lose')
                console.log(resp.data)
                this.setState({ message: `${date} has been added`, error: null})
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
                            type="date" 
                            id="date" 
                            placeholder="date" 
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "date"} 
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="registerField">
                        <label htmlFor="allDay">allDay:</label>
                        <input 
                            type="boolean" 
                            id="allDay" 
                            placeholder="allDay" 
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "allDay"} 
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="registerField">
                        <label htmlFor="startTime">startTime:</label>
                        <input 
                            type="string" 
                            id="startTime" 
                            placeholder="startTime" 
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "startTime"} 
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="registerField">
                        <label htmlFor="endTime">endTime:</label>
                        <input 
                            type="string" 
                            id="endTime" 
                            placeholder="endTime" 
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "endTIme"} 
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="registerField">
                        <label htmlFor="comment">Comment:</label>
                        <input 
                            type="string" 
                            id="comment" 
                            placeholder="comment" 
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "comment"} 
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="registerField">
                        <label htmlFor="approved">approved:</label>
                        <input 
                            type="boolean" 
                            id="approved" 
                            placeholder="approved" 
                            onFocus={(e) => e.target.placeholder = ""} 
                            onBlur={(e) => e.target.placeholder = "approved"} 
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