import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import searchIcon from "../../images/searchIcon.png";


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
        this.props.onDateSearchChange(date);
    };

    handleTimeChange = (event) => {
      let timeSearchValue = event.target.value;
      //passing time to parent's props
      this.props.onTimeSearchChange(timeSearchValue);
    };

    render() {
        return (
            <div className="container-fluid card cardSearch">
                <div className="row">
                    <h1 className="header findEventsHeader">Find Events</h1>
                    <img id="logo" className="d-inline-block searchIcon" alt="Logo" src={searchIcon} />
                        <input
                        type="text"
                        className="form-control filterInput"
                        onChange={this.handleWordSearchChange}
                        />
                </div>

            <div style = {{float:"left"}} className="searchBody">
                <div className="row rowSearch">
                    <div className="form-group">
                        <label className="subHeader">
                            Date:{this.state.eventSearch}
                        </label>
                        <DatePicker
                            className="form-control filterInput filterInputSmall inputAgeText inputMargin"
                            popperPlacement="top-end"
                            selected={this.state.startDate}
                            onChange={this.handleDateChange}
                        />
                    </div>
                    <div className="form-group form-check-inline">
                        <label className="subHeader">
                            Age:
                        </label>
                        <select
                            className="form-control filterInput filterInputSmall inputAgeText inputMargin"
                            onChange={this.handleAgeChange}
                        >
                            <option value="AllAges">All Ages</option>
                            <option value="18">18+</option>
                            <option value="21">21+</option>
                        </select>
                    </div>

                    <div className="form-group form-check-inline">
                        <label className="subHeader">
                            Price:
                        </label>
                        <select
                            className="form-control filterInput filterInputMedium inputAgeText"
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
                <div className="row rowSearch">

                    <div className="form-group form-check-inline">
                        <label className="subHeader">
                            Postal Code:
                        </label>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            className="form-control filterInput filterInputSmall"
                            value={this.state.eventZipSearch}
                            onChange={this.handleZipChange}
                        />
                    </div>

                
                    <label className="subHeader">
                        Category:
                    </label>
                    <select
                        className="form-control filterInput filterInputMedium inputAgeText"
                        onChange={this.handleCategoryChange}
                    >
                        <option value="All">All Categories</option>
                        <option value="Music">Music</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Culture">Culture</option>
                        <option value="Festival">Festival</option>
                        <option value="Other">Other</option>
                    </select>
                    <label className="subHeader">
                        Time of Day:
                    </label>
                    <select
                        className="form-control filterInput filterInputMedium inputAgeText"
                        onChange={this.handleCategoryChange}
                    >
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Night">Night</option>
                    </select>
                </div>
            </div>
        </div>
        );
    }
}
