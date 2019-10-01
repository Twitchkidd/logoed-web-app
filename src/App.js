import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import AdminSite from "./AdminSite";
import WebApp from "./WebApp";
import Loading from "./WebApp/screens/Loading";
import Global from "./Global";

class App extends Component {
  state = {
    business: null
  };
  handleSetBusiness = business => {
    this.setState({ business });
  };
  handleSignUp = data => {
    this.sendOff(data)
      .then("yay")
      .catch("nay");
  };
  render() {
    return (
      <Router>
        <Global />
        {this.state.business ? (
          <Route
            path='/App'
            render={props => (
              <WebApp {...props} business={this.state.business} />
            )}
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
            <Route path='/Dashboard' component={Dashboard} />
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
