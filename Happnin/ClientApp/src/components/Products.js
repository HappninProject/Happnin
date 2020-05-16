import React, { Component } from "react";
import { Map, TileLayer, } from 'react-leaflet'
import { HappninEvent } from './Event/HappninEvent';

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
            <label className="subHeader">product name (nintendo switch, toilet paper, ect.):&nbsp;</label>
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
        </div>
          <div>
            <div style={{ height: "100vh", width: "100%" }}>
            <Map 
                center={[this.state.lat, this.state.lng]} 
                zoom={this.state.zoom} 
                style={{ width: '100%', height: '100vh'}}
                >
                  <TileLayer
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}-tiles.locationiq.com/v2/obk-en/r/{z}/{x}/{y}.png?key=b0b149aa2f9d3a"
                />
                </Map>
            </div>
          </div>
          <div>

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