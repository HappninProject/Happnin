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
                <div>
                    <div style= {{float:"left",}}>
                        <h1 className="header">Event Name</h1>
                        <h1 className="subHeader">Host: </h1>
                        <h1 className="subHeader">Location: </h1>
                        <h1 className="subHeader">Description: </h1>
                        <div id = "descriptionContainer">some text will go here</div>
                    </div>

                    <div style={{float:"right", marginTop : "10px"}}>
                            <Map 
                                center={[this.state.lat, this.state.lng]} 
                                zoom={this.state.zoom} 
                                style={{ width: '50vh', height: '45vh',}}
                                >
                                <TileLayer
                                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                    url="https://{s}-tiles.locationiq.com/v2/obk-en/r/{z}/{x}/{y}.png?key=b0b149aa2f9d3a"
                                />
                            </Map>
                    </div>
                </div>
                <div id = "updatesContainer">
                    <table>
                        <h1 className="header"> Host updates: </h1>
                        <tr>
                            <th>date/time</th>
                            <th>message</th>
                        </tr>
                        <tr> 
                            <td>5/13/20 4:20 pm</td> 
                            <td >"event cancelled due to corna"</td>
                        </tr>
                    </table>
                </div>

                <div id = "updatesContainer">
                    <table>
                        <h1 className="header"> user comments: </h1>
                        <tr>
                            <th>username</th>
                            <th>date/time</th>
                            <th>message</th>
                        </tr>
                        <tr> 
                            <td>xXyoMamaxX</td>
                            <td>5/13/20 4:25 pm</td> 
                            <td >"dang i was looking forward to this"</td>
                        </tr>
                    </table>
                </div>
                
            </div>


            );
    }
}