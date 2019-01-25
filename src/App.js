import React, { Component } from 'react';
import './App.css';
import Login from './Login'
import Register from './Register'
import Protected from './Protected'
import { BrowserRouter, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/addstaff" component={Register} />
          <Route path="/test-protected" component={Protected} />
          </div>
        </BrowserRouter>
        </div>
    );
  }
}

export default App;
