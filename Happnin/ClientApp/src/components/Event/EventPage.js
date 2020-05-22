import React, { Component } from "react";
import image from "../../images/event-image.jpg";
import { Map, TileLayer,} from 'react-leaflet'
import attendies from "../../images/users.svg";
import share from "../../images/Share.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { Category } from '../../shared/Category';

export class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id: parseInt(this.props.match.params.eventId),  
          event: {},
          host: {},
          location: {},
          lat: 0, 
          lng: 0, 
          zoom: 13,
          attendingCount: 0,
          loading: true, 
        };
    }

    async componentDidMount() {
        await this.FetchEventData();
        await this.FetchLocationAndHost();
        await this.FetchAttendingCount();
    }

    async FetchAttendingCount() {
        const eventId = this.state.id;
        const response = await fetch(`api/Attendee/Count/${eventId}`);
        const count = await response.json();
        this.setState({ attendingCount: count });
        console.log("attendeeCount response: " + count);
    }

    handleAttendingChange = (event) => {
        let AttendingValue = event.target.value;
    }

    async FetchEventData(){
        const id = this.state.id;
        const response = await fetch(`api/Event/${id}`);
        console.log("Event response" + response);
        const data = await response.json();
        console.log("Got Data", data);
        this.setState({ event: data, loading: false});
    } 

    async FetchLocationAndHost(){
        const locationId = this.state.event.locationId;
        const hostId = this.state.event.hostId;
        const response = await fetch(`/api/Location/${locationId}`);
        const data = await response.json();
        this.setState({ location: data});
        const hostResponse = await fetch(`/api/User/${hostId}`);
        const hostData = await hostResponse.json();
        this.setState({host: hostData})

    }


    render() {
        let e = this.state.event;
        let location = this.state.location;
        let host = this.state.host.userName;
        var startTime = new Date(Date.parse(e.eventTime)).toDateString();
        var endTime = new Date(Date.parse(e.endTime)).toDateString();

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
                        <header className="header">{e.name}</header>
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
                        <img id="attendies" className="" alt="attendies" src={attendies} style={{ width: "2%", margin: "10px" }} />
                        <div>
                            People attending: {this.state.attendingCount}
                        </div>
                        { /*<Link to="/Attendies">{this.state.attendingCount}</Link>  */}
                        
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
                        <h1 className="subHeader">Date: {startTime} - {endTime} </h1>
                        <h1 className="subHeader">Host: {host}</h1>
                        <h1 className="subHeader">Location: {location.address + ", " + location.city + ", " + location.state + ", " + location.zipCode} </h1>
                        <h1 className="subHeader">Category: {Category(e.categoryId)} </h1>
                        <h1 className="subHeader">Cost: {e.cost}</h1>
                        <h1 className="subHeader">age restriction: {e.ageRestriction} </h1>
                        <h1 className="subHeader">Description: </h1>
                        <div id = "descriptionContainer">{e.description}</div>
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