import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

export default class Welcome extends Component {
  render() {
    return (
      <Switch>
        <Route path='/App/Welcome' component={null} />
      </Switch>
    );
  }
}
