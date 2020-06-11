import React, { Component } from "react";
import { HappninEvent } from "./HappninEvent";
import authService from '../api-authorization/AuthorizeService';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

export class AttendedEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            isAuthenticated: false,
            Attending: [],
            Events: []
        };
    }

    async componentDidMount(){
        this._subscription = authService.subscribe(() => this.populateState());
        await this.populateState();
        await this.FetchAttendingEvents();
        await this.FetchEvents();
    }

    refreshAttendingData = () => {
        console.log("what the heck")
        this.FetchAttendingEvents();
        this.forceUpdate();
    }
     
    async populateState() {
        const [isAuthenticated, user] = await Promise.all([
            authService.isAuthenticated(),
            authService.getUser()
            ]);
        this.setState({
        isAuthenticated,
        user: user && user.sub
        });
   }
   
   static renderEventsTable(events,userId, attendedEvent, handler) {
    if (events && events.length) {
      return (
        <div>
          {AttendedEvents.setGoing(events, attendedEvent)}
          {events.map((eventinfo) => (
            <HappninEvent key={eventinfo.id} {...eventinfo} 
            attendingId={AttendedEvents.attendingEvent(eventinfo.id, attendedEvent)}
            attending={eventinfo.going}
            userId={userId}
            handler={handler}/>
          ))}
        </div>
      );
    } else {
      return <div>No events found right now!</div>;
    }
  }

    static setGoing(events, attendedEvent){
   
        const attendedIds = attendedEvent.map(a => a.eventId);
   
        events.forEach(e => {
        if(attendedIds.includes(e.id)){
            e.going = true;
        }
        else {
            e.going = false;
      }
    })
  }

    static attendingEvent(eventId, attendedEvent){

    let attendId = -1; 
    attendedEvent.forEach(e => 
        {
          if(e.eventId === eventId){

            attendId = e.id;
          } 
        })
      return attendId; // return negative one if event isn't being attended
  }


    async FetchAttendingEvents(){
        const user = this.state.user;
        let response = await fetch(`api/Attendee/AttendeeInfo/${user}`);
        let attending =  await response.json();
        this.setState({Attending: attending})
    }

    async FetchEvents(){
        const attending = this.state.Attending;
        let events = [];
        for(let i = 0; i < attending.length; i++){
            let response = await fetch(`api/Event/${attending[i].eventId}`)
            events.push(await response.json());
        }

        this.setState({Events: events});
    }

    render(){
        const events = this.state.Events;
        const userId = this.state.user;
        const attending = this.state.Attending;
        return (
        <div>
            <h1>Attended Events</h1>
                {events.map((eventinfo) => (
                    <HappninEvent key={eventinfo.id} {...eventinfo}
                    attendingId={AttendedEvents.attendingEvent(eventinfo.id, attending)}
                    attending={true}
                    userId={userId}
                    handler={this.refreshAttendingData}/>
                ))}
        </div>)
    }
}