import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Spinner from "react-spinkit";
import { lightOrange } from "../../utilities";

class Loading extends Component {
  state = {
    loading: true,
    error: ""
  };
  checkMockServer = business => {
    const businesses = ["Burgerology", "Jonathans", "Leilu"];
    if (businesses.includes(business)) {
      return business;
    } else {
      return "Error! Can't find business in Logoed database!";
    }
  };
  handleRealOrDemo = () => {
    const { match, setBusiness, demo } = this.props;
    let result = null;
    setTimeout(() => {
      if (demo) {
        result = "demo";
      } else {
        let checkReturn = this.checkMockServer(match.params.Business);
        if (checkReturn === match.params.Business) {
          result = match.params.Business;
        } else {
          this.setState({ error: "Business not in Logoed database!" });
        }
      }
      this.setState({ loading: false });
      console.log(result);
      if (result) {
        setBusiness(result);
      }
    }, 2000);
  };
  componentDidMount() {
    this.handleRealOrDemo();
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <Spinner name='ball-zig-zag-deflect' color={lightOrange} />
        ) : (
          this.state.error && (
            <p>
              {this.state.error} Here's our <Link to='/'>homepage</Link> with
              more info!
            </p>
          )
        )}
      </div>
    );
  }
}

export default Loading;
