import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GradientWrapper } from "../components";
import Spinner from "react-spinkit";
import { maroon } from "../../utilities";

class Loading extends Component {
  state = {
    loading: true,
    error: ""
  };
  componentDidMount() {
    this.handleRealOrDemo();
  }
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
      if (result) {
        setBusiness(result);
      }
    }, 360);
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
    return (
      <div>
        {this.state.loading ? (
          <GradientWrapper>
            <Spinner name='ball-zig-zag-deflect' color={maroon} />
          </GradientWrapper>
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
