import React, { Component } from "react";
import { HappninEvent } from '../Event/HappninEvent';

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
      <div className="container-fluid card">
        <h1 className="header">Search for Products</h1>
        <div className="text-center">
          <div id="filterName">
            <label className="subHeader">Product:&nbsp;</label>
            <input
              type="text"
              name="eventNameSearch"
              className="rounded"
              onChange={this.handleNameSearchChange}
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
         <div id="filterCost">
            <label className="subHeader">
              &nbsp;&nbsp;Cost:&nbsp;
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