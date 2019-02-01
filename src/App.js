import React, { Component } from 'react';
import Login from './Login'
import Register from './Register'
import Unavailability from './Unavailability'
import Home from './Home'
import Roster from './Roster'
import RosterAdd from './RosterAdd'
import { BrowserRouter, Route,  Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faHome, faUserTimes, faSignOutAlt, faCalendarAlt, faCalendarTimes,  faClock, faSync, faChevronUp, faUserPlus, faChevronCircleRight, faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons'
import RosterAll from './RosterAll';
import ReactSelect from './ReactSelect';
import TimeOff from './TimeOff';
import MyInfo from './MyInfo';
import ReportHours from './ReportHours';

library.add(faUser, faHome, faUserTimes, faSignOutAlt, faCalendarAlt, faCalendarTimes, faClock, faSync, faChevronUp, faUserPlus, faChevronCircleRight, faChevronCircleLeft );

const PrivateRoute =  ({ component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("isAuthenticated")
    ? <Component {...props} />
    : <Redirect to={{
      pathname: '/',
      state: { from: props.location }
    }} />
  )} />
)

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="App">
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/register" component={Register} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/unavailability" component={Unavailability} />
          {/* <PrivateRoute exact path="/roster" component={RosterAdmin} /> */}
          <PrivateRoute path="/select" component={ReactSelect} />
          <PrivateRoute path="/timeoff" component={TimeOff} />
          <PrivateRoute path="/myinfo" component={MyInfo} />
          <PrivateRoute path="/report" component={ReportHours} />
          <PrivateRoute path="/roster/:id" component={Roster} />
          <PrivateRoute path="/roster" component={RosterAll} />
          </div>
        </BrowserRouter>
        </div>
    );
  }
}

export default App;
