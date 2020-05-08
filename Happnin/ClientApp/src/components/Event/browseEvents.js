import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { FetchEventData } from "./FetchEventData";
import FetchEventDataWithError404 from "./FetchEventData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
//Getting the event
import {HappninEvent} from "./HappninEvent";

export class BrowseEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
    };
  }

  //had to create different handlers to pass specific info to props in parent class
  
  handleNameSearchChange = (event) => {
    let nameSearchValue = event.target.value;
    //passing this to parent's props
    this.props.onNameSearchChange(nameSearchValue);
  };

  handleWordSearchChange = (event) => {
    let wordSearchValue = event.target.value;
    //passing this to parent's props
    this.props.onWordSearchChange(wordSearchValue);
  }

  handleCategoryChange = (event) => {
    let categorySearchValue = event.target.value;
    this.props.onCategorySearchChange(categorySearchValue);
  }

  handleAgeChange = (event) => {
    let ageSearchValue = event.target.value;
    this.props.onAgeSearchChange(ageSearchValue);

  }

  handleCostChange = (event) => {
    let costSearchValue = event.target.value;
    this.props.onCostSearchChange(costSearchValue);
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
            <label className="subHeader">Word or phrase:&nbsp;</label>
            <input
              type="text"
              name="eventWordSearch"
              className="rounded"
              onChange={this.handleWordSearchChange}
            ></input>
          </div>

          <div id="filterZip">
            <label className="subHeader">
              &nbsp;&nbsp;Zip code:&nbsp;
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

          <div id="filterCategory">
            <label className="subHeader">
              &nbsp;&nbsp;Events by category:&nbsp;
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
              &nbsp;&nbsp;Events by age restriction:&nbsp;
            </label>
            <select
              className="rounded"
              name="eventAge"
              // value={this.state.category}
              onChange={this.handleAgeChange}
            >
              <option value="AllAges">All Ages</option>
              <option value="18">18+</option>
              <option value="21">21+</option>
            </select>
          </div>

          {/* cost of event */}
          <div id="filterCost">
            <label className="subHeader">
              &nbsp;&nbsp;Events by cost to attend:&nbsp;
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
          <FetchEventDataWithError404/>
<<<<<<< refs/remotes/HappninProject/master
        </div> */}
=======
        </div>

        <div>
                <li><Link to="/EventPage">test page</Link></li>
        </div>

>>>>>>> added an event page and did some refactoring
      </div>
    );
  }
}
