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
    console.log("State of name search: " + event.target.value);
    let nameSearchValue = event.target.value;
    //passing this to parent's props
    this.props.onNameSearchChange(nameSearchValue);
  };

  handleWordSearchChange = (event) => {
    console.log("State of word search: " + event.target.value);
    let wordSearchValue = event.target.value;
    //passing this to parent's props
    this.props.onWordSearchChange(wordSearchValue);
  }

  handleCategoryChange = (event) => {
    console.log("State of category search: " + event.target.value);
    let categorySearchValue = event.target.value;
    this.props.onCategorySearchChange(categorySearchValue);
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
              onChange={this.handleNameSearchChange}
            ></input>
          </div>

          <div id="filterWord">
            <label className="subHeader">Search by word or phrase:&nbsp;</label>
            <input
              type="text"
              name="eventWordSearch"
              className="rounded"
              onChange={this.handleWordSearchChange}
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
              // value={this.state.category}
              onChange={this.handleCategoryChange}
            >
              <option value="All">All Categories</option>
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

<<<<<<< refs/remotes/HappninProject/master
>>>>>>> added an event page and did some refactoring
=======
>>>>>>> added an event page and did some refactoring
      </div>
    );
  }
}
