import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserAccount.css";
import { Button } from "reactstrap";
import { NavLink, Link } from "react-router-dom";

//need to figure out how to access user information from database and use those props in page

export class UserAccount extends Component {
  constructor(props) {
    super(props);
    //TODO: eventually remove the hardcoded values
    //These values are temporarily hard-coded to test editing them on the EditAccount page
    this.state = {
      user: {
        userName: "fakeUser1",
        firstName: "Jane",
        lastName: "Doe",
        city: "Spokane",
        birthday: "02/23/1995",
        email: "fakeemail@gmail.com",
        phone: "(509) 555-5555",
        eventsOfInterest: ["Music", "Comedy", "Cultural"]
      }
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm border rounded white-div">
            <div className="row text-center">
              <img
                src="https://cdn4.iconfinder.com/data/icons/social-media-and-networking/480/02_social_medis_profile_female_placeholder_image_profile_female-512.png"
                className="img-fluid mt-0"
                alt="profile image"
              ></img>
              <h3 className="header mx-auto">Jane Doe </h3>
            </div>
          </div>
          <div className="col-lg float-right border rounded white-div">
            <h1 className="header">ABOUT</h1>
            <p className="subHeader">Username: {this.state.user.userName}</p>
            <div>
              <p className="subHeader">
                First name: {this.state.user.firstName}
              </p>
            </div>
            <div>
              <p className="subHeader">Last name: {this.state.user.lastName}</p>
            </div>
            <div>
              <p className="subHeader">City: {this.state.user.city}</p>
            </div>
            <div>
              <p className="subHeader">Birthday: {this.state.user.birthday}</p>
            </div>
            <div>
              <p className="subHeader">Email: {this.state.user.email}</p>
            </div>
            <div>
              <p className="subHeader">Phone: {this.state.user.phone}</p>
            </div>
            <div>
              <p className="subHeader">
                Types of events I'm interested in:
                {this.state.user.eventsOfInterest.map(event => (
                  <li>{event}</li>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div></div>
        </div>
        <div className="float-right mt-2">
          <Link to="/edit-account">
            <button id="btnEditAccount" className="border rounded">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
