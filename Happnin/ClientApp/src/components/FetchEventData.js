import React, { Component } from 'react';

export class FetchEventData extends Component {
    static displayName = FetchEventData.name;

    constructor(props) {
        super(props);
        this.state = { Events: [], loading: true };
    }

    componentDidMount() {
        this.populateEventData();
    }

    static renderEventsTable(Events) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Host</th>
                        <th>Event Time</th>
                        <th>Cost</th>
                        <th>Age Restriction</th>
                    </tr>
                </thead>
                <tbody>
                    {Events.map(Event =>
                        <tr key={Event.name}>
                            <td>{Event.date}</td>
                            <td>{Event.Host}</td>
                            <td>{Event.EventTime}</td>
                            <td>{Event.Cost}</td>
                            <td>{Event.AgeRestriction}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchEventData.renderEventsTable(this.state.Events);

        return (
            <div>
                <h1 id="tabelLabel" >Events</h1>
                <p>Got these events from our server DAWG</p>
                {contents}
            </div>
        );
    }

    async populateEventData() {
        console.log('before fetch');
        const response = await fetch('https://localhost:5001/api/Events', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log('after fetch');
        const data = await response.json();
        console.log('Got Data', data)
        this.setState({ Events: data, loading: false });
    }
}
