import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

//TODO: actually send an email, right now this submit goes nowhere

export class PassResetSent extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h4>An email has been sent to reset your password</h4>
        <Link to="/">Back to Homepage</Link>
      </div>
    );
  }
}
