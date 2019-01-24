import React, { Component } from 'react';
import './App.css';
import LoginForm from './LoginForm'
import AddStaffForm from './AddStaffForm'


class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm />
        {/* <AddStaffForm /> */}
      </div>
    );
  }
}

export default App;
