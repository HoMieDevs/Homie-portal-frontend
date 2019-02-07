import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Roster from "./Roster";
import RosterAddStaff from "./RosterAddStaff";
import RosterAdd from "./RosterAdd";
import RosterAdmin from "./RosterAdmin";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faHome,
  faUserTimes,
  faSignOutAlt,
  faCalendarAlt,
  faCalendarTimes,
  faClock,
  faSync,
  faChevronUp,
  faUserPlus,
  faChevronCircleRight,
  faChevronCircleLeft, 
  faCheckCircle, 
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import RosterAll from "./RosterAll";
import RosterAllTest from "./RosterAllTest";
import ReactSelect from "./ReactSelect";
import TimeOff from "./TimeOff";
import SelectStaff from "./SelectStaff";
import MyInfo from "./MyInfo";
import ReportHours from "./ReportHours";
import AllStaff from "./AllStaff";
import Approvals from "./Approvals";

library.add(
  faUser,
  faHome,
  faUserTimes,
  faSignOutAlt,
  faCalendarAlt,
  faCalendarTimes,
  faClock,
  faSync,
  faChevronUp,
  faUserPlus,
  faChevronCircleRight,
  faChevronCircleLeft,
  faCheckCircle, 
  faTimesCircle
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("isAuthenticated") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="App">
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/register" component={Register} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/timeoff" component={TimeOff} />
            <PrivateRoute exact path="/rosteradmin" component={RosterAdmin} />
            <PrivateRoute exact path="/roster" component={RosterAll} />
            <PrivateRoute exact path="/testroster" component={RosterAllTest} />
            <PrivateRoute path="/select" component={ReactSelect} />
            <PrivateRoute path="/myinfo" component={MyInfo} />
            <PrivateRoute path="/report" component={ReportHours} />
            <PrivateRoute path="/roster/:id" component={Roster} />
            <PrivateRoute
              path="/rosteraddstaff/:id"
              component={RosterAddStaff}
            />
            <PrivateRoute exact path="/rosteradd" component={RosterAdd} />
            <PrivateRoute path="/allstaff" component={AllStaff} />
            <PrivateRoute path="/staffselect" component={SelectStaff} />
            <PrivateRoute exact path="/approvals" component={Approvals} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
