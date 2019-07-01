import React, { Component } from "react";

export default class WebApp extends Component {
  render() {
    return <div>Welcome to Logoed! Currently at {this.props.business}!</div>;
  }
}
