import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FetchEventData } from "./FetchEventData";

export class browseEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventNameSearch: "",
      eventZipSearch: "",
      eventCategory: ""
    };
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div className="container-fluid">
        <h3>Events</h3>
        <div className="text-center">
          <label className="subHeader">
            Search by event name:&nbsp;{this.state.eventNameSearch}
          </label>
          <input
            type="text"
            className="rounded"
            value={this.state.eventNameSearch}
            onChange={this.handleInputChange}
          ></input>

          <label className="subHeader">
            &nbsp;&nbsp;Search by zip code:&nbsp;{this.state.eventZipSearch}
          </label>
          <input
            type="text"
            className="rounded"
            value={this.state.eventZipSearch}
            onChange={this.handleInputChange}
          ></input>

          <label className="subHeader">
            &nbsp;&nbsp;Events by category:&nbsp;{this.state.eventSearch}
          </label>
          <select
            className="rounded"
            value={this.state.category}
            onChange={this.handleInputChange}
          >
            <option value="Music">Music</option>
            <option value="Comedy">Comedy</option>
            <option value="Culture">Culture</option>
            <option value="Festival">Festival</option>
          </select>
        </div>
        <div>
          <FetchEventData></FetchEventData>
        </div>
      </div>
    );
  }
}
