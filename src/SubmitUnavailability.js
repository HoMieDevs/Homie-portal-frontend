import React, { Component } from "react";
import axios from "axios";
import "./css/Register.css";
axios.defaults.withCredentials = true;

class SubmitUnavailability extends Component {
  state = {
    UserUnavailability: []
  };

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    axios
      // .get(`http://localhost:5000/auth/unavailibility/${userId}`)
      .get(`${process.env.REACT_APP_API_URL}/auth/unavailibility/${userId}`)
      .then(resp => {
        console.log(resp.data.UserUnavailability);
        const sorted = resp.data.UserUnavailability.sort((a, b) => {
          return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
          // return new Date(a.date) > new Date(b.date);
        });
        console.log(sorted);
        this.setState({ UserUnavailability: sorted });
      });
  }

  componentDidUpdate() {
    const userId = localStorage.getItem("userId");
    axios
      // .get(`http://localhost:5000/auth/unavailibility/${userId}`)
      .get(`${process.env.REACT_APP_API_URL}/auth/unavailibility/${userId}`)
      .then(resp => {
        // console.log(resp.data.UserUnavailability);
        const sorted = resp.data.UserUnavailability.sort((a, b) => {
          return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
          // return new Date(a.date) > new Date(b.date);
        });
        // console.log(sorted);
        this.setState({ UserUnavailability: sorted });
      });
  }

  deleteTimeOff = unid => {
    const userId = localStorage.getItem("userId");
    axios
      // .delete(`http://localhost:5000/auth/unavailability/${userId}/${unid}`)
      .delete(
        `${process.env.REACT_APP_API_URL}/auth/unavailability/${userId}/${unid}`
      )
      .then(console.log("Deleted"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="main">
        {this.state.UserUnavailability.map((unavailability, index) => {
          return (
            <div>
              <li>{unavailability.date}</li>
              <li>{unavailability.comment}</li>
              <input
                onClick={() => this.deleteTimeOff(unavailability._id)}
                className="delete-button"
                type="delete"
                value="Delete"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default SubmitUnavailability;
