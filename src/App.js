import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
//import LandingPage from "./LandingPage";
//import DashboardSite from "./DashboardSite";
//import AdminSite from "./AdminSite"
import WebApp from "./WebApp";
import Loading from "./screens/Loading";

class App extends Component {
  state = {
    business: null
  };
  handleSetBusiness = business => {
    this.setState({ business });
  };
  render() {
    return (
      <Router>
        {this.state.business ? (
          <Route
            exact
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
            <Redirect to='/App/Test' />
          </Switch>
        )}
      </Router>
    );
  }
}

export default App;
