import React, { Component } from "react";
import { Map } from "../Map";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../../images/happninHLogoThumb.png";
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
          AttendingValue: null,
          imageId: -1,
          image: {}
        };
    }

    async componentDidMount() {
        await this.FetchEventData();
        await this.FetchLocationAndHost();
        await this.FetchAttendingCount();
        await this.getPicture();
    }

    async FetchAttendingCount() {
        const eventId = this.state.id;
        const response = await fetch(`api/Attendee/Count/${eventId}`);
        const count = await response.json();
        this.setState({ attendingCount: count });
        console.log("attendeeCount response: " + count);
    }
    ImageToUse = () => {
        const imageId = this.state.event.eventImageId;
        console.log("imageId")
        console.log(imageId)
        if (imageId === null) {
            return logo;
        }
        else {
            return `data:image/jpeg;base64,${this.state.event.image}`;
        }
    }

    async getPicture() {
        const imageId = this.props.eventImageId;
        let response = await fetch(`api/Upload/${imageId}`)
        console.log('response:')
        console.log(response);
        let image = await response.json();
        this.setState({ image: image });
    }

    handleAttendingChange = (event) => {
        this.setState({
            AttendingValue: event.target.value,
          });
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
        let image = this.ImageToUse();
        console.log("image")
        console.log(image)
        return (
            
            <div className="card container-fluid">
                <div>
                    <img
                        className="eventImage"
                        variant="left"
                        src={image}
                        rounded="true"
                        style={{ padding: 5, width: '300px', height: '300px', float: "left" }}
                        />
              
                    <div style={{ textAlign: "center" }}>
                            <h1 >{e.name}</h1>
                            <h1 className="subHeader">{startTime} - {endTime} </h1>
                            <h1 className="subHeader">{location.address + ", " + location.city + ", " + location.state + ", " + location.zipCode} </h1>
                    
                    </div>



                    <div style={{ float: "right", marginTop : " 70px" }}> 
                       <h1 className="subHeader">Cost: {e.cost}</h1>
                       <h1 className="subHeader">age restriction: {e.ageRestriction} </h1>
                    </div>
                </div>
                <h1 className="subHeader" style={{ marginTop : "20px" }}>Description: </h1>

       
                <div id="attendingContainer">
                    <Dropdown style={{ marginTop : "10px" }}>
                        <label className="subHeader">
                            &nbsp;&nbsp;attending status:&nbsp;
                        </label>
                        <select
                            className="rounded"
                            name="Attending"
                            onChange={this.handleAttendingChange}
                            style={{ width: "20%" }}
                        >
                            <option value="Attending">Attending</option>
                            <option value="Can't Attend">Can't Attend </option>
                        </select>
                    </Dropdown>
                    <div class="subHeader" style={{ marginLeft: " 13px" }}>{"people attending : " + this.state.attendingCount}</div>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <div class="subHeader">{"hosted by " + host}</div>
                </div>
                <div id="mapContainer">
                    <Map jsonEvent={this.state.data} />
                </div>
                
            </div>
            );
    }
}