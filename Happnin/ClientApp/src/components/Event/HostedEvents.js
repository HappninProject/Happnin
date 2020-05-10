import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< refs/remotes/HappninProject/master
import { HostEvent } from "./HostEvent";
=======
import { HappninEvent } from "./HappninEvent";
>>>>>>> have to get the events to render
import authService from '../api-authorization/AuthorizeService';

export class HostedEvents extends Component {
    static displayName = HostedEvents.name;

    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false,
            user: '',
            Events: [],
<<<<<<< refs/remotes/HappninProject/master
            Locations: [], 
=======
>>>>>>> have to get the events to render
            loading: true
        }
    }

<<<<<<< refs/remotes/HappninProject/master
    //TODO need to pull all the event information, like the location and such

  async componentDidMount(event) {
    this._subscription = authService.subscribe(() => this.populateState());
    await this.populateState(); 
    await this.GetHostedEvents();
    await this.GetLocations(); 
  };

  static renderEventsTable(events, location, userId) {
    return (
      <div>
        {events.map((eventinfo) => (
          <HostEvent key={eventinfo.id} {...eventinfo} 
          location = {this.GetRightLocation(eventinfo.locationId, location)} 
=======
  async componentDidMount(event) {
    this._subscription = authService.subscribe(() => this.populateState());
    await this.populateState(); 
    this.GetHostedEvents(); 
  };

  static renderEventsTable(events, userId) {
    return (
      <div>
        {events.map((eventinfo) => (
          <HappninEvent key={eventinfo.id} {...eventinfo} 
          attending={eventinfo.going}
>>>>>>> have to get the events to render
          userId={userId}
          />
        ))}
      </div>
    );
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser()
    ]);
    console.log(user);
    this.setState({
      isAuthenticated,
      user: user && user.sub
    });
  }

  render() {
<<<<<<< refs/remotes/HappninProject/master
   let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      HostedEvents.renderEventsTable(this.state.Events, this.state.Locations,this.state.user)
    );
    return (
      <div className="container-fluid card">
        <div className="submit">
          <h1 id="tabelLabel" className="header">
            Hosted Events
          </h1>
          {contents}
        </div>
      </div>
    );
=======
    if(this.loading){
        return (
            <div><h1>Here in my hosted events</h1></div>         
        ) 
    }
    return HostedEvents.renderEventsTable(this.state.event, this.state.userId);
>>>>>>> have to get the events to render
 }

  async GetHostedEvents(){
    const userId = this.state.user;
    console.log("user id" + userId)
    const response = await fetch(`api/Event/HostedEvent/${userId}`);
    const data = await response.json();
<<<<<<< refs/remotes/HappninProject/master
    console.log("Data");
    console.log(data);
=======
>>>>>>> have to get the events to render
    this.setState({ Events: data, loading: false });
  }

  async GetLocations(){
    const eventIds = this.state.Events.map(e => e.locationId);
    let locations = [];
    for (let i = 0; i < eventIds.length; i++){
      let res = await fetch(`api/Location/${eventIds[i]}`); 
      let data = await res.json();
      locations.push(data);
    }

    this.setState({Locations: locations})
  }

  static GetRightLocation(locationId, locations){
    for( var i of locations ){
      if ( i.id === locationId){
        return i;
      }
    }
  }
}