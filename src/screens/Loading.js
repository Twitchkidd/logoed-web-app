import React from "react";
import { Redirect } from "react-router-dom";

const Loading = ({ match, setBusiness }) => {
  if (match.params.Business) {
    setBusiness(match.params.Business);
  }
  return <Redirect to='/App' />;
};

export default Loading;
