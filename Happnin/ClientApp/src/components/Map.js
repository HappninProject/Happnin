import React, { Component } from "react";
import "../styles/Marker.css";
import GoogleMapReact from "google-map-react";
//import { LocationContext } from './LocationContext';
// A comment for test

const Marker = props => {
    return <>
        <div className="pin"></div>
        <div className="pulse"></div>
    </>
}


export class Map extends Component {

    constructor(props) {
        super(props);
        this.testVarible = "this is a test";
        this.state = {
            events: [],
            jsonEvent: [],
            addresses: [],
            loading: true,
            markers: [],
            locations: [],
            latLngs: [],
            geolocations: [],
            locationIds: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.populateLocationData = this.populateLocationData.bind(this);
        this.getLatLngs = this.getLatLngs.bind(this);
        this.renderMarkers = this.renderMarkers.bind(this);
    }

    static defaultProps = {
        center: {
            lat: 47.491255,
            lng: -117.582624
        },
        zoom: 13,
    };

  /*  renderMarkers(map, maps) {

        let marker = new maps.Marker({
            position: myLatLng,
            map,
            title: 'Default Marker'
        });
    } */

    renderMarkers() {
        
            this.state.markers.map((marker, index) => {
                return (
                    <Marker key={index}
                        lat={marker.lat}
                        lng={marker.lng}
                    />
                )
            })
        
    }

    renderInfoWindow(map, maps) {
        this.state.locationIds.forEach(locId => {
            var latLng = {};
            var test = this.state.locations.find(element => element.id === locId);
          //  console.log("test: " + test.id);

            latLng["lat"] = Number(test.lat);
            latLng["lng"] = Number(test.lng);

           // console.log("latLng: " + latLng);
           // console.log("MyLatLng: " + myLatLng);
            //let infoWindow = new maps.InfoWindow({
            //    position: latLng,
            //    map,
            //    title: 'Default Marker',
            //    content: "Here it is!"
            //});

            let marker = new maps.Marker({
                position: latLng,
                map,
                title: 'Default Marker'
            });
        })
    }

    getLatLngs() {
        const locIds = this.state.locationIds;
        let markersTemp = [];
        console.log("locIds: " + locIds);
        this.state.locations.forEach(loc => {
            if (locIds.includes(loc.Id)) {
                var latLng = {};
                latLng["lat"] = loc.lat;
                latLng["lng"] = loc.lng;
                markersTemp.push(latLng);
            }
        });
        console.log("markers temp: " + markersTemp);

        this.setState({
            markers: markersTemp
        });
    }

    async componentDidMount() {
        await this.populateLocationData();
        await this.populateEventData();

        const eventArray = this.state.events;
        console.log("eventArray: " + this.state.events);

        eventArray.forEach(element => {
            this.state.locationIds.push(element.locationId);
        });
        //  this.getLatLngs();
        const locIds = this.state.locationIds;

        this.state.locations.forEach(loc => {
            console.log("locIds in loop: " + locIds);
            if (locIds.includes(loc.id)) {
                var latLng = {};
                latLng["lat"] = loc.lat;
                latLng["lng"] = loc.lng;
                this.state.markers.push(latLng);
            }
        });
    }

    render() {

        return (
            <>
                <h2>{this.state.addresses} </h2>
                {this.state && this.state.latLngs &&
                    <div style={{ height: "100vh", width: "100%" }}>
                        <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
                            defaultCenter={this.props.center}
                            defaultZoom={14}
                            onGoogleApiLoaded={({ map, maps }) => this.renderInfoWindow(map, maps)}
                            yesIWantToUseGoogleMapApiInternals
                    >
                        {this.renderMarkers()}
                            { /*this.state.markers.map((marker, index) => {
                                return (
                                    <Marker key={index}
                                        lat={marker.lat}
                                        lng={marker.lng}
                                    />
                                )
                            }) */}
                        </GoogleMapReact>
                    </div>
                }
            </>
        );
    }

    async populateEventData() {
        const response = await fetch("api/Event");
        const data = await response.json();
        this.setState({ events: data, loading: false });
    }

    async populateLocationData() {
        const response = await fetch("api/Location");
        const data = await response.json();
        this.setState({ locations: data, loading: false });
    }
}