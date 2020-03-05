import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export class PendingEmailValidation extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h4>
          Your account has been created! Make sure to check your email inbox to
          confirm your email address.
        </h4>
        <Link to="/">Back to Homepage</Link>
      </div>
    );
  }
}
