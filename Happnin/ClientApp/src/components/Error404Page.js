//most code from reactjs.org/docs/error-boundaries.html
import React, { Component } from "react";
import { Link, Redirect, navigate } from "@reach/router";

class Error404Page extends Component {
  state = { hasError: false, redirect: false };

  //a React method
  //if there's an error
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  //another React method
  componentDidCatch(error, info) {
    console.error("Error boundary caught an error", error, info);
  }

  //this will run every time it gets new state or new props
  componentDidUpdate() {
    if (this.state.hasError) {
      // redirects after 5 seconds
      setTimeout(() => navigate("/"), 5000);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this page. <Link to="/">Click here</Link>{" "}
          to go back to the home page or wait 5 seconds
        </h1>
      );
    }
    //return all components inside
    return this.props.children;
  }
}

export default Error404Page;
