import React, { Component } from "react";
import { HappninEvent } from "./HappninEvent";
import { Map, TileLayer } from 'react-leaflet'
import Error404Page from "../Error404Page";
import authService  from '../api-authorization/AuthorizeService' 


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
      filteredEvents: [],
      isAuthenticated: false,
      userId: '',
      isAttending: []
    };
  }

  async componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateAuth());
    await this.populateAuth();
    await this.populateEventData();
    await this.populateAttendingData();
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

  static setGoing(events, attendedEvent){
    console.log(events);
    const attendedIds = attendedEvent.map(a => a.eventId);
    console.log(attendedIds);
    events.forEach(e => {
      if(attendedIds.includes(e.id)){
        e.going = true;
      }
      else {
        e.going = false;
      }
    })
  }

  async populateAuth(){
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser()
    ]);
    this.setState({
      isAuthenticated,
      userId: user && user.sub
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

  testSomething = () => {
    console.log("DOES THIS DO ANYTHING!!!!!!!!!!!!!!!!!")
    this.populateAttendingData();
  }
  
  static renderEventsTable(events, userId, attendedEvent, handler) {
    if (events && events.length) {
      return (
        <div>
          {FetchEventData.setGoing(events, attendedEvent)}
          {events.map((eventinfo) => (
            <HappninEvent key={eventinfo.id} {...eventinfo} 
            attendingId={FetchEventData.attendingEvent(eventinfo.id, attendedEvent)}
            attending={eventinfo.going}
            userId={userId}
            handler={handler}
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

  //displays event if event name contains entered input
  filterName = (filteredEvents) => {
    if(this.props.name !== ""){
      let name = this.props.name.toUpperCase();
      filteredEvents = filteredEvents.filter((event) =>{
        //checking if the event name contains a word
        return event.name.toUpperCase().includes(name);
      })
    }
    return filteredEvents;
  }

  //displays event if word or phrase matches
  filterWord = (filteredEvents) => {
    if(this.props.word !== ""){
      let word = this.props.word.toUpperCase();
      filteredEvents = filteredEvents.filter((event) =>{
        //checking if the event name contains a word
        return event.name.toUpperCase().includes(word) || event.description.toUpperCase().includes(word);
      })
    }
    return filteredEvents;
  }

  //displays event if it fits the category the user has entered
  filterCategory = (filteredEvents) => {
    if(this.props.category !== "All" && this.props.category !== "" ){
      //converting between category name and category ID
      let categoryID;
      if(this.props.category === "Music"){
        categoryID = 0;
      }
      else if(this.props.category === "Festival"){
        categoryID = 1;
      }
      else if(this.props.category === "Comedy"){
        categoryID = 2;
      }
      else if(this.props.category === "Culture"){
        categoryID = 3;
      }
      else if(this.props.category === "Product"){
        categoryID = 5;
      }
      //filtering based on the category ID
      filteredEvents = filteredEvents.filter((event) =>{
        //checking if category IDs match
        return event.categoryId === categoryID;
      })
    }
    return filteredEvents;
  }

  //displays event if it meets age restriction search
  filterAge = (filteredEvents) => {
    if(this.props.age !== "" && this.props.age !== "AllAges"){
      // this will either be 18+ or 21+
      let ageRestriction = this.props.age;
      
      //filtering based on age
      filteredEvents = filteredEvents.filter((event) =>{
        //checking if category IDs match
        return event.ageRestriction === ageRestriction;
      })

    }
    return filteredEvents;
  }

  //displays event if it meets cost search choice
  filterCost = (filteredEvents) => {
    if(this.props.cost !== "" && this.props.cost !== "AnyPrice"){
      let cost = this.props.cost;
      
      //the minimum and maximum prices for filtering
      let min;
      let max;

      //setting min and max variables
      if(cost === 0){
        min = 0;
        max = 0;
      }
      else if(cost === 25){
        min = .5;
        max = 25;
      }
      else if(cost === 50){
        min = 25.5;
        max = 50;
      }
      else if(cost === 100){
        min = 50.5;
        max = 100;
      }
      else{
        min = 100.5
        max = 1000000;
      }

      //filtering based on cost
      filteredEvents = filteredEvents.filter((event) =>{
        console.log("This is the price: " + this.props.cost);
        return event.cost >= min && event.cost <= max;
      })

    }
    return filteredEvents;
  }

  renderFilteredEvents(events, userId, attendedEvent, handler){

    if (events && events.length) {
      let filteredEvents = this.state.events;

      //filtering by name of event
      filteredEvents = this.filterName(filteredEvents);

      //filtering by a word or phrase
      filteredEvents = this.filterWord(filteredEvents);

      //filtering by category
      filteredEvents = this.filterCategory(filteredEvents);

      //filtering by age
      filteredEvents = this.filterAge(filteredEvents);

      //filtering by cost
      filteredEvents = this.filterCost(filteredEvents);

      return (
        <div>
            {FetchEventData.setGoing(events, attendedEvent)}
            {filteredEvents.map((eventinfo) => (
            <HappninEvent key={eventinfo.id} {...eventinfo}
            attendingId={FetchEventData.attendingEvent(eventinfo.id, attendedEvent)}
            attending={eventinfo.going}
            userId={userId}
            handler={handler} 
            />
          ))}
        </div>
      );
    }
    else{
      return <div>No events found right now!</div>
    }
  }

  async populateAttendingData(){
    const user = this.state.userId;
    console.log('what is going on?')
    console.log(user)
    console.log(this.state)
    console.log('here in the attending data get')
    console.log(`api/Attendee/AttendeeInfo/${this.state.userId}`)
    const response = await fetch(`api/Attendee/AttendeeInfo/${this.state.userId}`);
    let attend = await response.json();
    this.setState({isAttending: attend});
  }

   static attendingEvent(eventId, attendedEvent){
    console.log("in atteding events");
    console.log(eventId)
    console.log(attendedEvent); 
    let attendId = -1; 
    attendedEvent.forEach(e => 
        {
          console.log(e.eventId);
          console.log(e.eventId === eventId);
          if(e.eventId === eventId){
            console.log("they matched")
            console.log(e.id)
            attendId = e.id;
          } 
        })
      return attendId; // return negative one if event isn't being attended
  }

  render() {
    const events = this.state.events;
    //logging the data 
    console.log("This is the data: " + events);

    //getting the unfiltered data (will eventually be completely replace by filter, kept for testing)
    let eventsData = events ?
    FetchEventData.renderEventsTable(events, this.state.userId, this.state.isAttending, this.testSomething) :
    this.renderLoading();

    //getting the filtered data
    let filteredEventsData = events ?
    this.renderFilteredEvents(events, this.state.userId, this.state.isAttending, this.testSomething) :
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
