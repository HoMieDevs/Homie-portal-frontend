import React, { Component } from 'react'
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import './css/Register.css'
axios.defaults.withCredentials = true;

export default class Roster extends Component {
    state = {
        rosters: [],
        staff: []
     }

    componentDidMount = () => {
        const rosterUrl = "http://localhost:5000/auth/roster"
        axios.get(rosterUrl)
            .then(resp => {
                this.setState({ rosters: resp.data })
            })

        const staffUrl = "http://localhost:5000/crew/users"
        axios.get(staffUrl)
            .then(resp => {
                this.setState({ staff: resp.data })
            })
    }

    render() {
        const id = this.props.match.params.id
        const oneRoster = this.state.rosters.find(r => r._id === id);
        const allStaff = this.state.staff

        return (oneRoster) ? (
            <div className="Roster">
                <Header />
                        <div className="thisRoster">
                            <h2>{oneRoster.date}</h2>
                            <h3>{oneRoster.location}</h3>
                            <p>
                                {
                                    allStaff.map(s => {
                                        oneRoster.staff.map(p => {
                                            if(s._id === p.person) {
                                                console.log(s)
                                                console.log(p)
                                                // const first = s.firstName
                                                // const last = s.lastName
                                                // const start = p.startTime
                                                // const end = p.endTime
                                            }
                                        })
                                    })
                                }
                            </p>


                            {/* <p>
                                {
                                    oneRoster.staff.map((s, i) => 
                                        <div key={i} className="shift">
                                            {
                                                allStaff.map(p => {                                      
                                                    (p._id === s.person) ? console.log("match") : console.log("no match")
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </p> */}
                            
                        </div>
                <Footer />
            </div>
        ) : <h2>No roster, try again!</h2>

    }

}