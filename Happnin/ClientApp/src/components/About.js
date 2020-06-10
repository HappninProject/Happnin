import React, { Component } from "react";

export class About extends Component {
  render() {
    return (
      <div className="container-fluid card">
        <div className="header"> About Us</div>
        <div className="subheader">
          Happnin' is a senior project created by Jessica Holcomb, Salem Fenn, Caleb Walsh and Kyle Smith 
          for Eastern Washington University class of 2020
          This website is created as a way for people to create and share events that are happening near them.
            {" "}
        </div>
      </div>
    );
  }
}
