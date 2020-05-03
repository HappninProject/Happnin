import React, { Component } from "react";
import { HappninEvent } from "./HappninEvent";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

const AnyReactComponent = ({ text }) => <div>{text}</div>;
export class FetchEventData extends Component {
  static displayName = FetchEventData.name;

  constructor(props) {
    super(props);
    this.state = {events: [], loading: true,lat: 0,lng: 0,zoom: 13};
  }

  componentDidMount() {
    this.populateEventData();
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      let lat = position.coords.latitude
      let lng = position.coords.longitude
      this.setState({lng : lng, lat:lat});
    });
  }

  static renderEventsTable(events) {
    return (
      <div>
        {events.map((eventinfo) => (
          <HappninEvent key={eventinfo.id} {...eventinfo} />
        ))}
      </div>
    );
  }


  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchEventData.renderEventsTable(this.state.events)
    );

    

    return (

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
        <h1 id="tableLabel" className="header">
          Events
        </h1>
        <p>Got these events from our server DAWG</p>

        {contents}
      </div>
    );
  }

  async populateEventData() {
    const response = await fetch("api/Event");
    console.log(response);
    const data = await response.json();
    console.log("Got Data", data);
    this.setState({ events: data, loading: false });
  }


  
}
