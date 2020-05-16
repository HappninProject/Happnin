import React, { Component } from "react";
import image from "../../images/event-image.jpg";
import { Map, TileLayer,} from 'react-leaflet'
import attendies from "../../images/users.svg";
import share from "../../images/Share.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

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

    
    handleAttendingChange = (event) => {
        let AttendingValue = event.target.value;
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
                    <Dropdown>
                        <headder className="header">Event Name</headder>
                        <label className="subHeader">
                            &nbsp;&nbsp;attending status:&nbsp;
                        </label>
                        <select 
                            className="rounded"
                            name="Attending"
                            onChange={this.handleAttendingChange}
                            style = {{width: "20%"}}
                        >
                                <option value="Attending">Attending</option>
                                <option value="Interested">Interested</option>
                                <option value="Can't Attend">Can't Attend </option>
                        </select>
                        <img id="attendies" className="" alt="attendies" src={attendies} style= {{width:"2%", margin: "10px"}} />
                        <Link to="/Attendies">num of Attendies will go here</Link>
                        
                            <Dropdown.Toggle
                            variant="link"
                            size="sm"
                            background-color="b1ed82"
                            style = {{float: "right"}}
                            >
                            <img
                                id="share"
                                alt="share"
                                src={share}
                                style= {{width:"20px",margin: "10px"}}

                                
                            />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                                {" "}
                                invite friends
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                                {" "}
                                copy link to event
                            </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                </div>
                <div>
                    <div style= {{float:"left",}}>
                        <h1 className="subHeader">Date: </h1>
                        <h1 className="subHeader">Host: </h1>
                        <h1 className="subHeader">Location: </h1>
                        <h1 className="subHeader">Category: </h1>
                        <h1 className="subHeader">Cost: </h1>
                        <h1 className="subHeader">age restriction: </h1>
                        <h1 className="subHeader">Description: </h1>
                        <div id = "descriptionContainer">some text will go here</div>
                    </div>

                    <div style={{float:"right", marginTop : "10px"}}>
                            <Map 
                                center={[this.state.lat, this.state.lng]} 
                                zoom={this.state.zoom} 
                                style={{ width: '52vh', height: '50vh',}}
                                >
                                <TileLayer
                                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                    url="https://{s}-tiles.locationiq.com/v2/obk-en/r/{z}/{x}/{y}.png?key=b0b149aa2f9d3a"
                                />
                            </Map>
                    </div>
                </div>
                <div id = "updatesContainer">
                    <table style = {{width: "100%"}}>
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
                    <table style = {{width: "100%"}}>
                        <h1 className="header"> user comments: </h1>
                        <tr>
                            <th>username</th>
                            <th>date/time</th>
                            <th>message</th>
                        </tr>
                        <tr > 
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