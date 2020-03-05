import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HappninEvent } from "./Event/HappninEvent";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { events: [], loading: true };
  }

  componentDidMount() {
    this.populateEventData();
  }

  static renderEventsTable(events) {
    return (
      <div>
        {events.map(eventinfo => (
          <HappninEvent key={eventinfo.id} {...eventinfo} />
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
      Home.renderEventsTable(this.state.events)
    );
    return (
      <div className="container-fluid">
        <div class="header">WELCOME TO HAPPNIN'</div>

        <table class="event-table">
          <td>
              <div class="eventTable">
                <th class="eventsHeader">UPCOMING EVENTS:</th>
                <tr>
                  <td class="event"> test </td>
                </tr>
              </div>
          </td>
          <td>
              <div class="eventTable">
                <th class="eventsHeader">FRIENDS EVENTS:</th>
                <tr>
                  <td class="event"> test </td>
                </tr>
              </div>
          </td>
          <td>
            <div class="eventTable">
              <th class="eventsHeader">POPULAR EVENTS:</th>
              <tr>
                <td class="event"> test </td>
              </tr>
            </div>
          </td>
        </table>
        <div class="submit">
          <h1 id="tabelLabel">Events</h1>
          <p>Got these events from our server DAWG</p>

          {contents}
        </div>
      </div>
    );
  }

  async populateEventData() {
    const response = await fetch('api/Event');
    console.log(response);
    const data = await response.json();
    console.log("Got Data", data);
    this.setState({ events: data, loading: false });
  }
}
