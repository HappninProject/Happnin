import React, { Component } from 'react';
// import { HappninEvent } from './HappninEvent';

export class FetchEventData extends Component {
    static displayName = FetchEventData.name;

    constructor(props) {
        super(props);
        this.state = { events: [], loading: true };
    }

    componentDidMount() {
        this.populateEventData();
    }

    static renderEventsTable(events) {
        return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>LocationId</th>
                        <th>CategoryId</th>
                        <th>HostId</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Cost</th>
                        <th>Age Restriction</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(u =>
                        <tr key={u.name}>
                            <td>{u.name}</td>
                            <td>{u.description}</td>
                            <td>{u.locationId}</td>
                            <td>{u.categoryId}</td>
                            <td>{u.hostId}</td>
                            <td>{u.eventTime}</td>
                            <td>{u.endTime}</td>
                            <td>{u.cost}</td>
                            <td>{u.ageRestriction}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchEventData.renderEventsTable(this.state.events);
          
        return (
            <div>
                <h1 id="tabelLabel" >Events</h1>
                <p>Got these events from our server DAWG</p>
                
                {contents}
            
            </div>

        );
    }

    async populateEventData() {
        const response = await fetch('event');
        console.log(response);
        const data = await response.json();
        console.log('Got Data', data);
        this.setState({ events: data, loading: false });
    }
}
