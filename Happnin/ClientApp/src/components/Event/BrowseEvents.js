import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { FetchEventData } from "./FetchEventData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
//Getting the event

export class BrowseEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      defaultValue: ""
    };
  }

  //had to create different handlers to pass specific info to props in parent class
  
  handleNameSearchChange = (event) => {
    let nameSearchValue = event.target.value;
    //passing name to parent's props
    this.props.onNameSearchChange(nameSearchValue);
  };

  handleWordSearchChange = (event) => {
    let wordSearchValue = event.target.value;
    //passing word to parent's props
    this.props.onWordSearchChange(wordSearchValue);
  }

  handleCategoryChange = (event) => {
    let categorySearchValue = event.target.value;
    //passing category to parent's props
    this.props.onCategorySearchChange(categorySearchValue);
  }

  handleAgeChange = (event) => {
    let ageSearchValue = event.target.value;
    //passing age to parent's props
    this.props.onAgeSearchChange(ageSearchValue);

  }

  handleCostChange = (event) => {
    let costSearchValue = event.target.value;
    //passing cost to parent's props
    this.props.onCostSearchChange(costSearchValue);
  }

  handleZipChange = (event) => {
    let zipSearchValue = event.target.value;
    //passing zip to parent's props
    this.props.onZipSearchChange(zipSearchValue);
  }

  handleDateChange = (date) => {
    //passing date to parent's props
    console.log("Filter date entered*: " + date);
    this.setState({startDate: date});
    this.props.onDateSearchChange(date);
  };

  handleTimeChange = (event) => {
    let timeSearchValue = event.target.value;
    //!remove log statement later
    console.log("Time of day filter (in BrowseEvents)*: " + timeSearchValue);
    //passing time to parent's props
    this.props.onTimeSearchChange(timeSearchValue);
  }

  render() {
    //! temp
    console.log("Filter date entered* state of startDate" + this.state.startDate);
    return (
      <div className="container-fluid card">
        <h1 className="header">Search for Events</h1>
        <div className="text-center">
          <div id="filterName">
            <label className="subHeader">Event name:&nbsp;</label>
            <input
              type="text"
              name="eventNameSearch"
              className="rounded"
              onChange={this.handleNameSearchChange}
            ></input>
          </div>

          <div id="filterWord">
            <label className="subHeader">Word or Phrase:&nbsp;</label>
            <input
              type="text"
              name="eventWordSearch"
              className="rounded"
              onChange={this.handleWordSearchChange}
            ></input>
          </div>

          <div id="filterZip">
            <label className="subHeader">
              &nbsp;&nbsp;Zip Code:&nbsp;
            </label>
            <input
              type="text"
              pattern="[0-9]*"
              name="eventZipSearch"
              className="rounded"
              value={this.state.eventZipSearch}
              onChange={this.handleZipChange}
            ></input>
          </div>

          <div id="filterDate">
            <label className="subHeader">
              &nbsp;&nbsp;Date:&nbsp;{this.state.eventSearch}
            </label>
            <DatePicker
              popperPlacement="top-end"
              selected={this.state.startDate}
              onChange={this.handleDateChange}
            />
          </div>

          <div id="filterTime">
            <label className="subHeader">
              &nbsp;&nbsp;Time of Day (Start Time):&nbsp;
            </label>
            <select
              className="rounded"
              name="eventTime"
              onChange={this.handleTimeChange}
            >
              <option value="Any">Any Time</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Night">Night</option>
            </select>
          </div>

          <div id="filterCategory">
            <label className="subHeader">
              &nbsp;&nbsp;Category:&nbsp;
            </label>
            <select
              className="rounded"
              name="eventCategory"
              onChange={this.handleCategoryChange}
            >
              <option value="All">All Categories</option>
              <option value="Music">Music</option>
              <option value="Comedy">Comedy</option>
              <option value="Culture">Culture</option>
              <option value="Festival">Festival</option>
            </select>
          </div>

          {/* age restriction */}
          <div id="filterAge">
            <label className="subHeader">
              &nbsp;&nbsp;Age Restriction:&nbsp;
            </label>
            <select
              className="rounded"
              name="eventAge"
              onChange={this.handleAgeChange}
            >
              <option value="AllAges">All Ages</option>
              <option value="18">18+</option>
              <option value="21">21+</option>
            </select>
          </div>
          <div id="filterCost">
            <label className="subHeader">
              &nbsp;&nbsp;Cost to Attend:&nbsp;
            </label>
            <select
              className="rounded"
              name="eventCost"
              onChange={this.handleCostChange}
            >
              <option value="AnyPrice">Any Price</option>
              <option value="0">Free</option>
              <option value="25">Between .50 and $25</option>
              <option value="50">Between $25.50 and $50</option>
              <option value="100">Between $50.50 and $100</option>
              <option value="More">More than $100</option>
            </select>
          </div>
        </div>
        <br />
        {/* //!temporarily commented out */}
        {/* <div>
          <EventDataWithError404/>
        </div> */}
        <div>
          <li><Link to="/EventPage">test page</Link></li>
        </div>
      </div>
    );
  }
}
