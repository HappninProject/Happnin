import React, { Component } from "react";
import { HappninEvent } from '../Event/HappninEvent';
import searchIcon from "../../images/searchIcon.png";

export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, 
      lat: 0, 
      lng: 0, 
      zoom: 13,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      this.setState({lng : lng, lat:lat});
    });
  }
  handleNameSearchChange = (event) => {
    let nameSearchValue = event.target.value;
    //passing this to parent's props
    this.props.onNameSearchChange(nameSearchValue);
  };

  
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  static renderEventsTable(events, userId, attendedEvent, handler) {
    return (
      <div>
        {events.map((eventinfo) => (
          <HappninEvent key={eventinfo.id} {...eventinfo} 
          attending={eventinfo.going}
          userId={userId}
          handler={handler}/>
        ))}
      </div>
    );
  }

  renderLoading(){
    return(
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  
  render() {
    return (
      <div className="container-fluid card cardSearch">
          <div className="row" style={{marginBottom: "1rem"}}>
            <h1 className="header">Search for Products</h1>
            <img id="logo" className="d-inline-block searchIcon" alt="Logo" src={searchIcon} />
            <input
              type="text"
              name="eventNameSearch"
              className="form-control filterInput"
              onChange={this.handleNameSearchChange}
            ></input>
          </div>
        <div style={{float: "left"}}>
          <div className="row" style={{marginBottom: "1rem"}}>
            <label className="subHeader">
                Postal Code:   
            </label>
            <input
              type="text"
              pattern="[0-9]*"
              name="eventZipSearch"
              className="form-control filterInput filterInputSmall"
              value={this.state.eventZipSearch}
              onChange={this.handleInputChange}
            ></input>
            <label className="subHeader" style={{marginLeft: "1rem"}}>
                Cost:
            </label>
            <select
              className="form-control filterInput inputAgeText"
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
       </div>
    );
  }
  
  async populateProductData() {
    const response = await fetch("api/Event/Products/");
    console.log(response);
    const data = await response.json();
    this.setState({ products: data, loading: false });
  }
}