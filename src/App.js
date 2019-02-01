import React, { Component } from 'react';
import Login from './Login'
import Register from './Register'
import Unavailability from './Unavailability'
import Home from './Home'
import Roster from './Roster'
import RosterAdd from './RosterAdd'
import { BrowserRouter, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faUserTimes, faSignOutAlt, faCalendarAlt, faCalendarTimes,  faClock, faSync, faChevronUp, faUserPlus, faChevronCircleRight, faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons'
import RosterAdmin from './RosterAdmin';
import ReactSelect from './ReactSelect';
import TimeOff from './TimeOff';
import MyInfo from './MyInfo';
import ReportHours from './ReportHours';

library.add(faUser, faUserTimes, faSignOutAlt, faCalendarAlt, faCalendarTimes, faClock, faSync, faChevronUp, faUserPlus, faChevronCircleRight, faChevronCircleLeft );

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/unavailability" component={Unavailability} />
          {/* <Route exact path="/roster" component={RosterAdmin} /> */}
          <Route path="/select" component={ReactSelect} />
          <Route path="/timeoff" component={TimeOff} />
          <Route path="/myinfo" component={MyInfo} />
          <Route path="/report" component={ReportHours} />
          <Route path="/roster/:id" component={Roster} />
          <Route path="/roster" component={RosterAdd} />
          </div>
        </BrowserRouter>
        </div>
    );
  }
}

export default App;
