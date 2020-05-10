import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HappninEvent } from "./HappninEvent";
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
    if(this.loading){
        return (
            <div><h1>Here in my hosted events</h1></div>         
        ) 
    }
    return HostedEvents.renderEventsTable(this.state.event, this.state.userId);
 }

  async GetHostedEvents(){
    const userId = this.state.user;
    console.log("user id" + userId)
    const response = await fetch(`api/Event/HostedEvent/${userId}`);
    const data = await response.json();
    this.setState({ Events: data, loading: false });
  }

}