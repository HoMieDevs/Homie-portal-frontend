import React, { Component } from 'react';
import Login from './Login'
import Register from './Register'
import Header from './Header'
import { BrowserRouter, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faSignOutAlt);


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/addstaff" component={Register} />
          <Route path="/header" component={Header} />
          </div>
        </BrowserRouter>
        </div>
    );
  }
}

export default App;
