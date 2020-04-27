import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FetchEventData } from "./FetchEventData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class BrowseEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventNameSearch: "",
      eventWordSearch: "",
      eventZipSearch: "",
      eventCategory: "",
      startDate: new Date(),
    };
  }
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleDateChange = (provider, date) => {
    this.setState({ [provider]: date });
  };

  render() {
    return (
      <div className="container-fluid card">
        <h1 className="header">Events</h1>
        <div className="text-center">
          <div id="filterName">
            <label className="subHeader">Search by event name:&nbsp;</label>
            <input
              type="text"
              name="eventNameSearch"
              className="rounded"
              value={this.state.eventNameSearch}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div id="filterWord">
            <label className="subHeader">Search by word or phrase:&nbsp;</label>
            <input
              type="text"
              name="eventWordSearch"
              className="rounded"
              value={this.state.eventWordSearch}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div id="filterZip">
            <label className="subHeader">
              &nbsp;&nbsp;Search by zip code:&nbsp;
            </label>
            <input
              type="text"
              pattern="[0-9]*"
              name="eventZipSearch"
              className="rounded"
              value={this.state.eventZipSearch}
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div id="filterCategory">
            <label className="subHeader">
              &nbsp;&nbsp;Events by category:&nbsp;
            </label>
            <select
              className="rounded"
              name="eventCategory"
              value={this.state.category}
              onChange={this.handleInputChange}
            >
              <option value="Music">Music</option>
              <option value="Comedy">Comedy</option>
              <option value="Culture">Culture</option>
              <option value="Festival">Festival</option>
            </select>
          </div>

          <div id="filterDate">
            <label className="subHeader">
              &nbsp;&nbsp;Events by date:&nbsp;{this.state.eventSearch}
            </label>
            <DatePicker
              popperPlacement="top-end"
              selected={this.state.startDate}
              onChange={this.handleDateChange.bind(this, "startDate")}
            />
          </div>
        </div>
        <br />
        <div>
          <FetchEventData></FetchEventData>
        </div>
      </div>
    );
  }
}
