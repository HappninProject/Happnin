import React,{Component} from 'react';
import { HappninEvent } from './HappninEvent';
import GoogleMapReact from 'google-map-react';

 const AnyReactComponent = ({ text }) => <div>{text}</div>;
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
            <div>
                 {events.map(eventinfo => <HappninEvent key={eventinfo.id}{...eventinfo}/>)}
            </div>
        );
    }
    
      static defaultProps = {
        center: {
            lat: 47.491255,
            lng:  -117.582624
          },
          zoom: 11
      };

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchEventData.renderEventsTable(this.state.events);
          
        return (
            <div>
                <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    //add api key to the map so we can place events and such
                    defaultCenter={this.props.center}
                     defaultZoom={this.props.zoom}
                >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                text="My Marker"
                />
        </GoogleMapReact>
      </div>
                <h1 id="tabelLabel" >Events</h1>
                <p>Got these events from our server DAWG</p>
                
                {contents}
            
            </div>

        );
    }

    async populateEventData() {
        const response = await fetch('api/Event');
        console.log(response);
        const data = await response.json();
        console.log('Got Data', data);
        this.setState({ events: data, loading: false });
    }
}
