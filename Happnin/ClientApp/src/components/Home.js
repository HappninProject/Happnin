import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HappninEvent } from "./Event/HappninEvent";
import authService from './api-authorization/AuthorizeService';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { 
                    events: [], 
                    isAuthenticated: false, 
                    userId: '',
                    isAttending: [],
                    loading: true 
                  };
    this.testSomething = this.testSomething.bind(this);
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
    this.populateEventData();
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser()
    ]);
    this.setState({
      isAuthenticated,
      userId: user && user.sub
    });
    this.populateAttendingData();
    console.log("Here comes test something");
    this.testSomething();
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

  testSomething = () => {
    console.log("DOES THIS DO ANYTHING!!!!!!!!!!!!!!!!!")
    this.populateAttendingData();
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

  static renderEventsTable(events, userId, attendedEvent, handler) {
    return (
      <div>
        {Home.setGoing(events, attendedEvent)}
        {events.map((eventinfo) => (
          <HappninEvent key={eventinfo.id} {...eventinfo} 
          attendingId={Home.attendingEvent(eventinfo.id, attendedEvent)}
          attending={eventinfo.going}
          userId={userId}
          handler={handler}/>
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
      Home.renderEventsTable(this.state.events, this.state.userId, this.state.isAttending, this.testSomething)
    );
    return (
      <div className="container-fluid card">
        <h1 className="header">Welcome to Happnin</h1>
        <div className="submit">
          <h1 id="tabelLabel" className="header">
            Events
          </h1>
          <p>Got these events from our server DAWG</p>
          {contents}
        </div>
      </div>
    );
  }

  async populateEventData() {
    const response = await fetch("api/Event");
    console.log(response);
    const data = await response.json();
    this.setState({ events: data, loading: false });
  }
}
