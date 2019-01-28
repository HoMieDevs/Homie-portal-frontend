import React, { Component } from 'react';
import Login from './Login'
import Register from './Register'
import Home from './Home'
import { BrowserRouter, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSignOutAlt, faCalendarAlt, faCalendarTimes,  faClock, faSync, faChevronUp, faUserPlus} from '@fortawesome/free-solid-svg-icons'
import RosterAdmin from './RosterAdmin';

library.add(faUser, faSignOutAlt, faCalendarAlt, faCalendarTimes, faClock, faSync, faChevronUp, faUserPlus );


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/addstaff" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/roster/admin" component={RosterAdmin} />
          </div>
        </BrowserRouter>
        </div>
    );
  }
}

export default App;
