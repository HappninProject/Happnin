import React, { Component } from "react";
import { BrowseEvents } from "./BrowseEvents";
import { FetchEventData } from "./FetchEventData";

// This is the parent class for FetchEventData and BrowseEvents
//It's used to pass data between the two

export class FetchBrowseEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSearch: "",
      wordSearch: "",
      categorySearch: "",
      ageSearch: "",
      costSearch: "",
      dateSearch: "",
      timeSearch: "",
      zipSearch: ""
    };
  }

  handleNameSearch = (name) => {
    this.setState({ nameSearch: name });
  };

  handleWordFilterChange = (word) => {
    this.setState({ wordSearch: word });
  };

  handleCategorySearchChange = (category) => {
    this.setState({ categorySearch: category });
  };

  handleAgeSearchChange = (age) => {
    this.setState({ ageSearch: age });
  };

  handleCostSearchChange = (cost) => {
    this.setState({ costSearch: cost });
  };

  handleDateSearchChange = (date) => {
    this.setState({dateSearch: date});
  }

  handleTimeSearchChange = (time) => {
    this.setState({timeSearch: time});
  }

  handleZipSearchChange = (zip) => {
    this.setState({zipSearch: zip})
  }

  render() {
    return (
      <div>
        <BrowseEvents
          onNameSearchChange={this.handleNameSearch}
          onWordSearchChange={this.handleWordFilterChange}
          onCategorySearchChange={this.handleCategorySearchChange}
          onAgeSearchChange={this.handleAgeSearchChange}
          onCostSearchChange={this.handleCostSearchChange}
          onDateSearchChange = {this.handleDateSearchChange}
          onZipSearchChange = {this.handleZipSearchChange}
          onTimeSearchChange = {this.handleTimeSearchChange}
        />
        <FetchEventData
          name={this.state.nameSearch}
          word={this.state.wordSearch}
          category={this.state.categorySearch}
          age={this.state.ageSearch}
          cost={this.state.costSearch}
          date = {this.state.dateSearch}
          time = {this.state.timeSearch}
          zip = {this.state.zipSearch}
        />
      </div>
    );
  }
}
