import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Welcome from "./screens/Welcome";

export default class WebApp extends Component {
  render() {
    const { business } = this.props;
    console.log(business);
    return <Welcome business={business} />;
  }
}

{
  /*
      <Switch>
        <Route
          path='/App/Welcome'
          render={props => <Welcome {...props} business={business} />}
        />
      </Switch>
      */
}
