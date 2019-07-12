import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  position: relative;
  top: 0;
  height: 100vh;
`;

/*
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  bottom: 0;
  width: 260px;
  left: 0;
  z-index: 1030;
  border-right: 1px solid #ddd;
`;
*/
export default class DashboardSite extends Component {
  sendRequest = business => {
    axios({
      method: "post",
      url: "http://localhost:8000/api/register",
      data: {
        business: business
      }
    });
  };
  boopMe = () => {
    console.log("boop!");
  };
  render() {
    const businesses = ["Burgerology", "Jonathans", "Leilu"];
    return (
      <Wrapper>
        <div onClick={() => this.boopMe()}>Dashboard site!</div>
        <ul>
          {businesses.map((business, i) => {
            return (
              <li onClick={() => this.sendRequest(business)} key={i}>
                {business}
              </li>
            );
          })}
        </ul>
      </Wrapper>
    );
  }
}
