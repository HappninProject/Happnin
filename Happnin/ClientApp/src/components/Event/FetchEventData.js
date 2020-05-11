import React, { Component } from "react";
import { HappninEvent } from "./HappninEvent";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Error404Page from "../Error404Page";


const AnyReactComponent = ({ text }) => <div>{text}</div>;
export class FetchEventData extends Component {
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
      filteredEvents: []
    };
  }

    componentDidMount() {
    this.populateEventData();
    this.setState({
      filteredEvents: this.state.events 
    })
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      this.setState({lng : lng, lat:lat});
    });
  }

  async populateEventData() {
    const response = await fetch("api/Event");
    console.log("Event response" + response);
    const data = await response.json();
    console.log("Got Data", data);
    this.setState({ events: data, loading: false});
    //have to set the state of filtered events after the events variable has already been populated
    this.setState({
      filteredEvents: this.state.events
    });
  }

  //setting the state
  parseData(res){
    return res.data;
  }

  onLoad = (data) => {
    this.setState({
      events: this.parseData(data)
    })
    console.log("The data: " + data);
  }

  filterEvents = (filter) => {
    let filteredEvents = this.state.events;

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
  
// got rid of static
  static renderEventsTable(events) {
    if (events && events.length) {
      return (
        <div>
          {events.map((eventinfo) => (
            <HappninEvent key={eventinfo.id} {...eventinfo} 
            />
          ))}
        </div>
      );
    }
    else{
      return <div>No events found right now!</div>
    }
  }

  renderLoading(){
    return(
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  renderFilteredEvents(events){

    if (events && events.length) {
      //convert to JSON
      let filteredEvents = this.state.events;
      //get the state of the variable
      console.log("State of filtered events variable: " + JSON.stringify(this.state.filteredEvents));
      console.log("Filtered events in renderFilteredEvents: " + filteredEvents);
      console.log("Getting the first event: " + JSON.stringify(filteredEvents[0]));
      console.log("Getting the first event's name: " + filteredEvents[0].name);

      //displays event if event name contains entered input
      if(this.props.name !== ""){
        let name = this.props.name.toUpperCase();
        filteredEvents = filteredEvents.filter((event) =>{
          //checking if the event name contains a word
          console.log("Name of event: " + event.name);
          return event.name.toUpperCase().includes(name);
        })
      }

      //displays event if it contains a word in name or description
      if(this.props.word !== ""){
        let word = this.props.word.toUpperCase();
        filteredEvents = filteredEvents.filter((event) =>{
          //checking if the event name contains a word
          return event.name.toUpperCase().includes(word) || event.description.toUpperCase().includes(word);
        })
      }

      //displays event if it fits the category the user has entered
      if(this.props.category !== "All" && this.props.category !== "" ){
        //converting between category name and category ID
        let categoryID;
        if(this.props.category === "Music"){
          console.log("Category is Music");
          categoryID = 1;
        }
        else if(this.props.category === "Comedy"){
          console.log("Category is Comedy");
          categoryID = 2;
        }
        else if(this.props.category === "Culture"){
          console.log("Category is Culture");
          categoryID = 3;
        }
        else if(this.props.category === "Festival"){
          console.log("Category is Festival");
          categoryID = 4;
        }
        //filtering based on the category ID
        filteredEvents = filteredEvents.filter((event) =>{
          //checking if category IDs match
          console.log("Name of category: " + event.categoryId);
          return event.categoryId === categoryID;
        })
      }

      return (
        <div>
            {filteredEvents.map((eventinfo) => (
            <HappninEvent key={eventinfo.id} {...eventinfo} 
            />
          ))}
        </div>
      );
    }
    else{
      return <div>No events found right now!</div>
    }
  }


  render() {
    const events = this.state.events;
    //logging the data 
    console.log("This is the data: " + events);

    //getting the unfiltered data (will eventually be completely replace by filter, kept for testing)
    let eventsData = events ?
    FetchEventData.renderEventsTable(events) :
    this.renderLoading();

    //getting the filtered data
    let filteredEventsData = events ?
    this.renderFilteredEvents(events) :
    this.renderLoading();
    
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
        {eventsData}
        <div>
        {/* This is where the filtered data goes */}
        <h1 className="header">Filtered Events</h1>
        {filteredEventsData}
        </div>
      </div>
    );
  }
}

export default function FetchEventDataWithError404(props) {
  return (
    <Error404Page>
      <FetchEventData {...props} />
    </Error404Page>
  );
}
