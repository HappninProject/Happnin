﻿import React, { Component } from 'react';
import { HappninEvent } from './HappninEvent';

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

<<<<<<< HEAD
            <div>
                 {events.map(eventinfo => <HappninEvent key={eventinfo.id}{...eventinfo}/>)}
            </div>
=======
            //<div>
            //     {events.map(eventinfo => <HappninEvent key={eventinfo.id}{...eventinfo}/>)}
            //</div>
         
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Host</th>
                        <th>Category</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Cost</th>
                        <th>Age Restriction</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(e =>
                        <tr key={e.name}>
                            <td>{e.name}</td>
                            <td>{e.description}</td>
                            <td>{e.hostId}</td>
                            <td>{e.categoryId}</td>
                            <td>{e.eventTime}</td>
                            <td>{e.endTime}</td>
                            <td>{e.cost}</td>
                            <td>{e.ageRestriction}</td>
                        </tr>
                    )}
                </tbody>
            </table>
>>>>>>> afef9e134782a8be308af59d4988c5cd92bb7884
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
