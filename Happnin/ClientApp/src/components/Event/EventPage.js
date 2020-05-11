import React, { Component } from "react";
import image from "../../images/event-image.jpg";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lat: 0, 
          lng: 0, 
          zoom: 13,
          loading: true, 
        };
    }
    async componentDidMount() {

    }
    render() {
        return (
            
            <div className="card container-fluid">
                <div id="event-image-container">
                        <img
                            id="event-image"
                            alt="event image"
                            src={image}
                        />
                    </div>
                    <h1 className="header">Event Name</h1>
                <div id = "map-container">
                    <Map 
                        center={[this.state.lat, this.state.lng]} 
                        zoom={this.state.zoom} 
                        style={{ width: '75vh', height: '75vh', float:"right"}}
                        >
                        <TileLayer
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://{s}-tiles.locationiq.com/v2/obk-en/r/{z}/{x}/{y}.png?key=b0b149aa2f9d3a"
                        />
                    </Map>
                </div>
            </div>

            );
    }
}