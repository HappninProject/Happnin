import React, { Component } from "react";
import { Products } from "./Products";
import { FetchProductData } from "./FetchProductData";

// This is the parent class for FetchProductData and BrowseEvents
//It's used to pass data between the two

export class BrowseProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSearch: "",
      wordSearch: "",
      categorySearch: "",
      ageSearch: "",
      costSearch: "",
      dateSearch: "",
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

  handleZipSearchChange = (zip) => {
    this.setState({zipSearch: zip})
  }

  render() {
    return (
      <div>
        <Products
          onNameSearchChange={this.handleNameSearch}
          onCostSearchChange={this.handleCostSearchChange}
          onZipSearchChange = {this.handleZipSearchChange}
        />
        <FetchProductData
          name={this.state.nameSearch}
          word={this.state.wordSearch}
          category={this.state.categorySearch}
          age={this.state.ageSearch}
          cost={this.state.costSearch}
          date = {this.state.dateSearch}
          zip = {this.state.zipSearch}
        />
      </div>
    );
  }
}
