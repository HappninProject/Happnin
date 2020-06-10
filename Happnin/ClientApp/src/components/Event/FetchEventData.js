import React, { Component } from "react";
import { HappninEvent } from "./HappninEvent";
import authService from '../api-authorization/AuthorizeService';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
export class FetchEventData extends Component {
    static displayName = FetchEventData.name;

    constructor(props) {
        super(props);
        this.state = {
            //The unfiltered events
            events: [],
            loading: true,
            filteredEvents: [],
            locations: [],
            isAuthenticated: false, 
            userId: '',
            lat: 47.4874,
            lng: -117.5758,
            zoom: 15,
            isAttending: [],
            markers: [],
            locationIds: [],
            eventsWithLocations: []
        };
    }

    async componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        await this.populateEventData();
        await this.populateState();
        await this.populateAttendingData();
        this.setState({
            filteredEvents: this.state.events,
        });

        const eventArray = this.state.filteredEvents;

        eventArray.forEach(element => {
            this.state.locationIds.push(element.locationId);
        });

        const locIds = this.state.locationIds;

        let tempMarkers = [];

        if (this.state.locations != null ) {
            this.state.locations.forEach(loc => {
                
                    if (locIds.includes(loc.id)) {
                        var latLng = {};
            
                        var found = this.state.events.find(function(element) { 
                            
                            return element.locationId === loc.id; 
                        }); 
                        latLng["title"] = found.name;
                        latLng["description"] = found.description;
                        latLng["lat"] = loc.lat;
                        latLng["lng"] = loc.lng;
                        latLng["locationId"] = loc.id;
                        tempMarkers.push(latLng);
                    }
                });
        }

        this.setState({
            markers: tempMarkers,
            loading: false
        }); 
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

  async populateEventData() {
    const response = await fetch("api/Event/EventsOnly/");
    const data = await response.json();
    
    this.setState({ events: data, loading: false });
    //have to set the state of filtered events after the events variable has already been populated
    this.setState({
      filteredEvents: this.state.events,
    });

    //!testing
    //got the location data here, now have to match with the location IDs
    const locationResponse = await fetch("/api/Location/");
  
    const locations = await locationResponse.json();
    
    this.setState({locations: locations});
  }
  
    refreshAttendingData = () => {
        this.populateAttendingData();
    }

  static attendingEvent(eventId, attendedEvent){

    let attendId = -1; 
    attendedEvent.forEach(e => 
        {
          if(e.eventId === eventId){

            attendId = e.id;
          } 
        })
      return attendId; // return negative one if event isn't being attended
  }

  static setGoing(events, attendedEvent){
    console.log(events);
    const attendedIds = attendedEvent.map(a => a.eventId);
    console.log(attendedIds);
    events.forEach(e => {
      if(attendedIds.includes(e.id)){
        e.going = true;
      }
      else {
        e.going = false;
      }
    })
  }

  async populateAttendingData(){
    const user = this.state.userId;

    const response = await fetch(`api/Attendee/AttendeeInfo/${this.state.userId}`);
    let attend = await response.json();
    this.setState({isAttending: attend});
  }

  static renderEventsTable(events,userId, attendedEvent, handler) {
    if (events && events.length) {
      return (
        <div>
          {FetchEventData.setGoing(events, attendedEvent)}
          {events.map((eventinfo) => (
            <HappninEvent key={eventinfo.id} {...eventinfo} 
            attendingId={FetchEventData.attendingEvent(eventinfo.id, attendedEvent)}
            attending={eventinfo.going}
            userId={userId}
            handler={handler}/>
          ))}
        </div>
      );
    } else {
      return <div>No events found right now!</div>;
    }
  }

  static renderEvents(events, userId, attendedEvent, handler) {
    return (
      <div>
        {FetchEventData.setGoing(events, attendedEvent)}
        {events.map((eventinfo) => (
          <HappninEvent key={eventinfo.id} {...eventinfo}
           attendingId={FetchEventData.attendingEvent(eventinfo.id, attendedEvent)}
           attending={eventinfo.going}
           userId={userId}
           handler={handler}
          />
        ))}
      </div>
    );
  }

  renderLoading() {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  //displays event if event name contains entered input
  filterName = (filteredEvents) => {
    if (this.props.name !== "") {
      let name = this.props.name.toUpperCase();
      filteredEvents = filteredEvents.filter((event) => {
        
        return event.name.toUpperCase().includes(name);
      });
    }
    return filteredEvents;
  };

  //displays event if event in on the date entered
  filterDate = (filteredEvents) => {
    //!right now the date is always set to feb 26th (for some weird reason)
    //!also this does not currently filtering within the range of dates (startTime-endTime), only startTime
    //!also something needs to be changed where the current date is the default value, because currently it is empty at start
    //!and you have to click on the date to start filtering

    let dateEntered = this.props.date;
    if(dateEntered !== ""){
      //creating a date object from the string that was passed in
      let date = new Date(dateEntered);
      let month = date.getMonth();
      let day = date.getDate();
      let year = date.getFullYear();

      //now make sure that only the events are shown that are on the date entered
      //filtering based on date
      filteredEvents = filteredEvents.filter((event) => {
        let eventDate = new Date(event.eventTime);
        let eventMonth = eventDate.getMonth();
        let eventDay = eventDate.getDate();
        let eventYear = eventDate.getFullYear();
        return eventMonth === month && eventDay === day && eventYear === year;
      });

    }
    return filteredEvents;
  }

  //displays event if word or phrase matches
  filterWord = (filteredEvents) => {
    if (this.props.word !== "") {
      let word = this.props.word.toUpperCase();
      filteredEvents = filteredEvents.filter((event) => {
        //checking if the event name contains a word
        return (
          event.name.toUpperCase().includes(word) ||
          event.description.toUpperCase().includes(word)
        );
      });
    }
    return filteredEvents;
  };

  //displays event if zip matches what's entered
  filterZip = (filteredEvents) => {
    let zip = this.props.zip;
    //if the user has entered a zip code
    if(zip !== ""){
      //getting the locations stringified
      let locations = this.state.locations;

      //search through the events and if the zip code matches it's listed
      locations = locations.filter((location) => {
        return location.zipCode === zip;
      });

      //create an array with those IDs
      let Ids = locations.map(location => location.id);
      console.log("IDs here*: " + Ids);

      //then if the zip codes match show all the zip codes with those IDs
      filteredEvents = filteredEvents.filter((event) => {
        console.log("This is the zip*: " + zip);
        //checks if the location IDs match the zip code
        return Ids.includes(event.locationId);
      });
    }
    return filteredEvents;
  }

  //displays event if it fits the category the user has entered
  filterCategory = (filteredEvents) => {
    if (this.props.category !== "All" && this.props.category !== "") {
      //converting between category name and category ID
      let categoryID;
      if (this.props.category === "Music") {
        categoryID = 0;
      } else if (this.props.category === "Festival") {
        categoryID = 1;
      } else if (this.props.category === "Comedy") {
        categoryID = 2;
      } else if (this.props.category === "Culture") {
        categoryID = 3;
      } else if (this.props.category === "Product") {
        categoryID = 5;
      }
      //filtering based on the category ID
      filteredEvents = filteredEvents.filter((event) => {
        //checking if category IDs match
        return event.categoryId === categoryID;
      });
    }
    return filteredEvents;
  };

  //displays event if it meets age restriction search
  filterAge = (filteredEvents) => {
    if (this.props.age !== "" && this.props.age !== "AllAges") {
      // this will either be 18+ or 21+
      let ageRestriction = this.props.age;

      //filtering based on age
      filteredEvents = filteredEvents.filter((event) => {
        //checking if category IDs match
        return event.ageRestriction === ageRestriction;
      });
    }
    return filteredEvents;
  };

  //displays event if it meets cost search choice
  filterCost = (filteredEvents) => {
    if (this.props.cost !== "" && this.props.cost !== "AnyPrice") {
      let cost = this.props.cost;

      //the minimum and maximum prices for filtering
      let min;
      let max;

      //setting min and max variables
      if (cost === 0) {
        min = 0;
        max = 0;
      } else if (cost === 25) {
        min = 0.5;
        max = 25;
      } else if (cost === 50) {
        min = 25.5;
        max = 50;
      } else if (cost === 100) {
        min = 50.5;
        max = 100;
      } else {
        min = 100.5;
        max = 1000000;
      }

      //filtering based on cost
      filteredEvents = filteredEvents.filter((event) => {
        console.log("This is the price: " + this.props.cost);
        return event.cost >= min && event.cost <= max;
      });
    }
    return filteredEvents;
  };

  renderFilteredEvents(events) {
    if (events && events.length) {
      let filteredEvents = this.state.events;

      filteredEvents = this.filterName(filteredEvents);
      filteredEvents = this.filterZip(filteredEvents);
      filteredEvents = this.filterDate(filteredEvents);
      filteredEvents = this.filterWord(filteredEvents);
      filteredEvents = this.filterCategory(filteredEvents);
      filteredEvents = this.filterAge(filteredEvents);
      filteredEvents = this.filterCost(filteredEvents);

      // Logic for rendering markers on maps
      let locationIds = [];
      filteredEvents.forEach(element => {
          locationIds.push(element.locationId);
      });
  
      let tempMarkers = [];
  
      this.state.locations.forEach(loc => {
         // console.log("locIds in loop: " + locIds);
          if (locationIds.includes(loc.id)) {
              var latLng = {};
  
              var found = this.state.events.find(function(element) { 
                  return element.locationId === loc.id; 
                }); 
              latLng["title"] = found.name;
              latLng["description"] = found.description;
              latLng["lat"] = loc.lat;
              latLng["lng"] = loc.lng;
              latLng["locationId"] = loc.id;
              tempMarkers.push(latLng);
             // this.state.markers.push(latLng);
          }
      });

    var key = process.env.REACT_APP_OPENMAP_KEY;
    var urlString = "https://{s}-tiles.locationiq.com/v2/obk-en/r/{z}/{x}/{y}.png?key=" + key;
        return (
            <div>
                <div className="mapHappnin">
                    <Map
                        className="mapHappnin"
                        center={[this.state.lat, this.state.lng]}
                        zoom={this.state.zoom}
                        style={{ width: '100%', height: '100vh' }}
                    >
                        <TileLayer
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url={urlString}
                        />
                        {tempMarkers.map((marker, index) => (
                            <Marker key={index} position={marker} > 
                                <Popup>
                                    {marker.title} <br /> {marker.description}
                                </Popup>
                            </Marker>
                        ))}
                    </Map>
                </div>

                {filteredEvents.map((eventinfo) => (
                    <HappninEvent key={eventinfo.id} {...eventinfo} />
                ))}
            </div>
        );
    } else {
      return <div>No events found right now!</div>;
    }
  }

  render() {
    const events = this.state.events;

    //getting the unfiltered data (will eventually be completely replace by filter, kept for testing)
    let eventsData = events
      ? FetchEventData.renderEventsTable(events, this.state.userId, this.state.isAttending, this.refreshAttendingData)
      : this.renderLoading();

    //getting the filtered data
    let filteredEventsData = events
      ? this.renderFilteredEvents(events, this.state.userId, this.state.isAttending, this.refreshAttendingData)
      : this.renderLoading();

    return (
        <div>
            <div>
                {filteredEventsData}
            </div>  
        </div>
    );
  }
}
