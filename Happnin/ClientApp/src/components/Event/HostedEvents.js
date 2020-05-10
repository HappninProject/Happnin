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
   let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      HostedEvents.renderEventsTable(this.state.Events, this.state.userId)
    );
    return (
      <div className="container-fluid card">
        <h1 className="header">Welcome to Happnin</h1>

        <table className="event-table">
          <td>
            <div className="eventTable">
              <th className="eventsHeader">Upcoming Events:</th>
              <tr>
                <td className="event"> test </td>
              </tr>
            </div>
          </td>
          <td>
            <div className="eventTable">
              <th className="eventsHeader">Friends' Events:</th>
              <tr>
                <td className="event"> test </td>
              </tr>
            </div>
          </td>
          <td>
            <div className="eventTable">
              <th className="eventsHeader">Popular Events:</th>
              <tr>
                <td className="event"> test </td>
              </tr>
            </div>
          </td>
        </table>
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

  async GetHostedEvents(){
    const userId = this.state.user;
    console.log("user id" + userId)
    const response = await fetch(`api/Event/HostedEvent/${userId}`);
    const data = await response.json();
    this.setState({ Events: data, loading: false });
  }

}