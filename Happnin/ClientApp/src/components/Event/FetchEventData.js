import React, { Component } from "react";
import { HappninEvent } from "./HappninEvent";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Error404Page from "../Error404Page";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class FetchEventData extends Component {
  static displayName = FetchEventData.name;

  constructor(props) {
    super(props);
    this.state = {
      //The unfiltered events
      events: [], 
      loading: true, 
      lat: 0, 
      lng: 0, 
      zoom: 13,
      //the filtered events
      filteredEvents: [],
      //these are used to filter
      eventNames: [],
      eventDescriptions: [],
      eventTimes: [],
      eventCategories: []
    };
  }
//!Uncomment later
  // componentWillMount() {
  //   this.setState({
  //     events,
  //     filteredEvents: events
  //   })
  // }

  async componentDidMount() {
    //adding the data from the events
    const response = await fetch("api/Event");
    console.log("Event response" + response);
    const data = await response.json();
    console.log("Got Data", data);
    this.setState({ events: data});

    //setting the filtered state to normal event state as default, will filter later
    this.setState({
      filteredEvents: this.state.events
    });
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      this.setState({lng : lng, lat:lat});
    });

    //this is the array of events on the database
    const eventArray = this.state.events;
    //so we want to extract the contents of each property in the events object array and set the state of each
    //variable that is used to filter in filterEvents()

    //getting the names
    let names = eventArray.map(event => event.name);
    console.log("Event names: " + names);
    this.setState({
      eventNames: names
    });

    //getting the descriptions
    let descriptions = eventArray.map(event => event.description);
    console.log("Event descriptions: " + descriptions);
    this.setState({
      eventDescriptions: descriptions
    });

    //getting the start times
    let startTimes = eventArray.map(event => event.eventTime);
    console.log("Event start times: " + startTimes);
    this.setState({
      eventTimes: startTimes
    });

    //getting the category
    let categories = eventArray.map(event => event.categoryId);
    console.log("Event categorys (IDs): " + categories);
    this.setState({
      eventCategories: categories
    });

    //Now loading is done
    this.setState({loading: false});
  }

  filterEvents = (filter) => {
    let filteredEvents = this.state.events;
    console.log("Filtered events: " + filteredEvents)

    filteredEvents = filteredEvents.filter((event) => {
      //!testing, making title lowercase for now
      filteredEvents = filteredEvents.filter((event) => {
        let eventName = event.eventName.toLowerCase();
        return eventName.indexOf(
          filter.toLowerCase()) !== -1
      })
      this.setState({
        filteredEvents
      })
    })
  }

  static renderEventsTable(events) {
    return (
      <div>
        {events.map((eventinfo) => (
          <HappninEvent key={eventinfo.id} {...eventinfo} 
          />
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
        <div>
        {/* This is where the filtered data goes */}
        <h1>Filtered Data Here</h1>
        {/* //!uncomment eventually */}
        {/* <BrowseEvents events={this.state.filteredEvents} onChange={this.filterEvents} /> */}
        </div>
      </div>
    );
  }

  //!Not being used
  // async populateEventData() {
  //   const response = await fetch("api/Event");
  //   console.log("Event response" + response);
  //   const data = await response.json();
  //   console.log("Got Data", data);
  //   this.setState({ events: data, loading: false});
  //   //have to set the state of filtered events after the events variable has already been populated
  //       this.setState({
  //     filteredEvents: this.state.events
  //   });
  //   console.log("Filtered events: " + this.state.filteredEvents);
  //           //!Testing
  //           console.log("State of filtered events variable: " + JSON.stringify(this.state.filteredEvents));
  //           console.log("Getting the first event: " + JSON.stringify(this.state.filteredEvents[0]));
  //           console.log("Getting the first event's name: " + JSON.stringify(this.state.filteredEvents[0].name));
  // }
}

export default function FetchEventDataWithError404(props) {
  return (
    <Error404Page>
      <FetchEventData {...props} />
    </Error404Page>
  );
}
