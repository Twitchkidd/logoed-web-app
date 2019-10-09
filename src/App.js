import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LandingPage from "./LandingPage";
// import Dashboard from "./Dashboard";
import AdminSite from "./AdminSite";
import WebApp from "./WebApp";
import Loading from "./WebApp/screens/Loading";
import Global from "./Global";

// Consider keeping auth within the various routes.
// Auth0 redirects to urls on auth/out/error, so
// App.js should have handler functions, but not
// keep track of auth itself.

class App extends Component {
  state = {
    authed: false,
    authType: null,
    business: null,
    initialDashboardBusiness: null
  };
  handleSetBusiness = business => {
    this.setState({ business });
  };
  handleSetInitialDashboardBusiness = initialDashboardBusiness => {
    this.setState({ initialDashboardBusiness });
    // This is stupid, I need to link to auth ...
  };
  handleSignUp = data => {
    // this.sendOff(data)
    //   .then("yay")
    //   .catch("nay");
    console.log("Beep!");
  };
  componentDidMount() {
    console.log("Boop!");
  }
  // If business is true, you only get one route,
  // what happens if you navigate to / then?
  // This is dumb and should be refactored.
  // For STARTERS, put the conditional inside the switch!
  // PUSHBACK, well if it's AUTHED, then BUSINESS!
  // {{throwsChair}}
  render() {
    const { business } = this.state;
    return (
      <Router>
        <Global />
        {business ? (
          <Route
            path='/App'
            render={props => <WebApp {...props} business={business} />}
          />
        ) : (
          <Switch>
            <Route
              path='/App/:Business'
              render={props => (
                <Loading {...props} setBusiness={this.handleSetBusiness} />
              )}
            />
            <Route
              path='/App'
              exact
              render={props => (
                <Loading
                  {...props}
                  setBusiness={this.handleSetBusiness}
                  demo={true}
                />
              )}
            />
            {/*
            <Route
              path='/Dashboard/:DashboardBusiness'
              render={props => (
                <Dashboard
                  {...props}
                  setInitialDashboardBusiness={
                    this.handleSetInitialDashboardBusiness
                  }
                  initialDashboardBusiness={initialDashboardBusiness}
                />
              )}
            />
            <Route path='/Dashboard' exact component={Dashboard} />
            */}
            <Route path='/Admin' component={AdminSite} />
            <Route
              exact
              path='/'
              render={props => (
                <LandingPage {...props} signUp={this.handleSignUp} />
              )}
            />
            <Redirect to='/' />
          </Switch>
        )}
      </Router>
    );
  }
}

export default App;
