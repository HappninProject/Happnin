import React, { Component } from "react";
import attendies from "../../images/users.svg";
import logo from "../../images/happninHLogoThumb.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Category } from '../../shared/Category';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id: parseInt(this.props.match.params.eventId),  
          event: {},
          host: {},
          location: {},
          locationId: {},
          lat: 0, 
          lng: 0, 
          marker: {},
          zoom: 13,
          attendingCount: 0,
          loading: true, 
          AttendingValue: null,
          image: []
        };
    }

    async componentDidMount() {
        await this.FetchEventData();
        await this.FetchLocationAndHost();
        await this.FetchAttendingCount();
        await this.getPicture();

        var locId = this.state.event.locationId;
        this.setState({locationId: locId});

        await this.getLocation();
        const lat = this.state.location.lat;
        const lng = this.state.location.lng;

        this.setState({lat: lat});
        this.setState({lng: lng});

        var latLng = {};
          
        latLng["title"] = this.state.event.name;
        latLng["description"] = this.state.event.description;
        latLng["locationId"] = this.state.locationId;

        this.setState({ marker: latLng });
    }

    async FetchAttendingCount() {
        const eventId = this.state.id;
        const response = await fetch(`api/Attendee/Count/${eventId}`);
        const count = await response.json();
        this.setState({ attendingCount: count });
        
    }
    
    ImageToUse = () => {
        const imageId = this.state.event.eventImageId;
        console.log("imageId")
        console.log(imageId)
        if (imageId === null) {
            return logo;
        }
        else {
            return `data:image/jpeg;base64,${this.state.image.image}`;
        }
    }

    async getLocation() {
        const locId = this.state.locationId;
        let response = await fetch(`/api/Location/${locId}`);
  
        let location = await response.json();
        
        this.setState({location: location});
    }

    async getPicture() {
        const imageId = this.state.event.eventImageId;
        let response = await fetch(`api/Upload/${imageId}`)
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
       
        const data = await response.json();
       
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


        var key = process.env.REACT_APP_OPENMAP_KEY;
        var urlString = "https://{s}-tiles.locationiq.com/v2/obk-en/r/{z}/{x}/{y}.png?key=" + key;
        const position = [this.state.lat, this.state.lng];
        let image = this.ImageToUse();
        console.log("image")
        console.log(image)

        return (
            
            <div className="card container-fluid" style={{paddingLeft: "3rem", paddingRight: "1rem", paddingTop: "2rem"}}>
                <div className="row">
                    <img
                        className="eventImage"
                        variant="left"
                        src={image}
                        rounded="true"
                        style={{ padding: 5, width: '300px', height: '300px', float: "center", marginLeft: "1rem" }}
                        />
            
                    <div className="eventPageTitle" style={{ textAlign: "left" }}>
                        <div>
                            <h1 style={{paddingBottom: "2rem"}}>{e.name}</h1>
                        </div>
                            
                            <h1 className="subHeader">{startTime} - {endTime} </h1>
                            <h1 className="subHeader">{location.address + ", " + location.city + ", " + location.state + ", " + location.zipCode} </h1>
                            <h1 className="subHeader">Cost: {e.cost}</h1>
                            <h1 className="subHeader">age restriction: {e.ageRestriction} </h1>

                    </div>
                </div>
                    <h1 className="subHeader" style={{ marginTop : "20px" }}>{e.description} </h1>

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
                

                <div style={{ height: "100vh", width: "100%" }}>
                    <Map
                        className="mapHappnin"
                        center={[this.state.lat, this.state.lng]}
                        zoom={this.state.zoom}
                        style={{ width: '100%', height: '100vh' }
                    }
                    >
                        <TileLayer
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url={urlString}
                        />
                        <Marker position={position} > 
                            <Popup>
                                <b>{this.state.marker.title}</b><br/> {this.state.marker.description}
                            </Popup>
                        </Marker> 
                    </Map>
                </div>
            </div>
        );
    }
}