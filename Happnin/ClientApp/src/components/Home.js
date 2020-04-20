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
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
    this.populateEventData();
    this.populateAttendingData();
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
  }

  async populateAttendingData(){
     const response = await fetch(`api/Attendee/${this.state.userId}`);
    console.log(response);
  }

  static renderEventsTable(events, userId) {
    return (
      <div>
        {events.map((eventinfo) => (
          <HappninEvent key={eventinfo.id} {...eventinfo} userId={userId}/>
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
      Home.renderEventsTable(this.state.events, this.state.userId)
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

  async populateEventData() {
    const response = await fetch("api/Event");
    console.log(response);
    //temp
    const time = await fetch("api/Event/eventTime");
    console.log(time);
    const data = await response.json();
    this.setState({ events: data, loading: false });
  }
}
