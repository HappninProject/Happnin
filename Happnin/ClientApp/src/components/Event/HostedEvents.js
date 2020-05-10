import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HostEvent } from "./HostEvent";
import authService from '../api-authorization/AuthorizeService';

export class HostedEvents extends Component {
    static displayName = HostedEvents.name;

    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false,
            user: '',
            Events: [],
            loading: true
        }

    }

    //TODO need to pull all the event information, like the location and such

  async componentDidMount(event) {
    this._subscription = authService.subscribe(() => this.populateState());
    await this.populateState(); 
    this.GetHostedEvents(); 
  };

  static renderEventsTable(events, userId) {
    return (
      <div>
        {events.map((eventinfo) => (
          <HostEvent key={eventinfo.id} {...eventinfo} 
          
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
   let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      HostedEvents.renderEventsTable(this.state.Events, this.state.userId)
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
 }

  async GetHostedEvents(){
    const userId = this.state.user;
    console.log("user id" + userId)
    const response = await fetch(`api/Event/HostedEvent/${userId}`);
    const data = await response.json();
    console.log("Data");
    console.log(data);
    this.setState({ Events: data, loading: false });
  }

}