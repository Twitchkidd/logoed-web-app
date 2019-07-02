import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "react-spinkit";

class Loading extends Component {
  state = {
    loading: true
  };
  checkMockServer = business => {
    const businesses = ["Burgerology", "Jonathans", "Leilu"];
    if (businesses.includes(business)) {
      return business;
    } else {
      return "Error! Can't find business in Logoed database!";
    }
  };
  render() {
    const { match, setBusiness } = this.props;
    if (match.params.Business) {
      let checkReturn = this.checkMockServer(match.params.Business);
      if (checkReturn === match.params.Business) {
        setBusiness(match.params.Business);
        return <Redirect to='/App' />;
      } else {
        return <p>Error! Can't find business in Logoed database!</p>;
      }
    } else {
      return <Redirect to='/App' />;
    }
  }
}

export default Loading;
