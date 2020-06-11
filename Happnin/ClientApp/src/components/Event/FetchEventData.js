import React, { Component } from "react";
import { HappninEvent } from "./HappninEvent";
//import { Map, TileLayer } from 'react-leaflet'
import Error404Page from "../Error404Page";

import { Map } from "../Map";

export class FetchEventData extends Component {
  static displayName = FetchEventData.name;

  constructor(props) {
    super(props);
    this.state = {
      //The unfiltered events
      events: [],
      loading: true,
      /* lat: 0, 
      lng: 0, 
      zoom: 13, */
      filteredEvents: [],
      locationData: []
    };
  }

  componentDidMount() {
    this.populateEventData();
    this.setState({
      filteredEvents: this.state.events,
    });

    /*  navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      this.setState({lng : lng, lat:lat});
    }); */
  }

  async populateEventData() {
    const response = await fetch("api/Event");
    //  console.log("Event response" + response);
    const data = await response.json();
    //  console.log("Got Data", data);
    this.setState({ events: data, loading: false });
    //have to set the state of filtered events after the events variable has already been populated
    this.setState({
      filteredEvents: this.state.events,
    });

    //!testing
    //got the location data here, now have to match with the location IDs
    const locationResponse = await fetch("/api/Location/");
    console.log("Location response: " + JSON.stringify(locationResponse));
    const locationData = await locationResponse.json();
    console.log("Location data: " + JSON.stringify(locationData));

    //setting the state of location data to the locations received
    this.setState({locationData: locationData});
    //!testing
  }

  static renderEventsTable(events) {
    if (events && events.length) {
      return (
        <div>
          {events.map((eventinfo) => (
            <HappninEvent key={eventinfo.id} {...eventinfo} />
          ))}
        </div>
      );
    } else {
      return <div>No events found right now!</div>;
    }
  }

  static renderEvents(events) {
    return (
      <div>
        {events.map((eventinfo) => (
          <HappninEvent key={eventinfo.id} {...eventinfo} />
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
        //checking if the event name contains a word
        return event.name.toUpperCase().includes(name);
      });
    }
    return filteredEvents;
  };

  //displays event if event is on the date entered (including start and end range)
  filterDate = (filteredEvents) => {
    console.log("Date from FetchEventData: " + this.props.date);
    let dateEntered = this.props.date;
    if(dateEntered !== ""){
      //creating a date object from the string that was passed in
      let date = new Date(dateEntered);
      console.log("Filter date entered* (in FetchEventData): " + dateEntered);

      //now make sure that only the events are shown that are on the date entered
      //filtering based on date
      filteredEvents = filteredEvents.filter((event) => {
        let eventDate = new Date(event.eventTime);

        //getting the end time for event
        let eventEnd = new Date(event.endTime);
        return date >= eventDate && date <= eventEnd;
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
      let locations = this.state.locationData;

      //search through the events and if the zip code matches it's listed
      locations = locations.filter((location) => {
        return location.zipCode == zip;
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

  //displays event if it meets time search choice
  filterTime = (filteredEvents) => {
      let time = this.props.time;
      //these will be in military time to compare
      //maxTime is not inclusive
      let minTime;
      let maxTime;
      if(time !== ""){
        //if time is morning (5AM - 11:59AM)
        if(time == "Morning"){
          minTime = 5;
          maxTime = 12;
        }
        //if time is afternoon (12PM - 5:59PM)
        else if(time == "Afternoon"){
          minTime = 12;
          maxTime = 18;
        }
        //if time is night (6PM - 4:49AM)
        else if (time == "Night"){
          minTime = 18;
          maxTime = 5;
        }

        //filtering by time of day
        filteredEvents = filteredEvents.filter((event) => {
          //getting the start date also to see if night event goes into next day
          //hours will be set to 0 to test if they're the same date
          let eventDate = new Date(event.eventTime);
          let eventDateNoHrs = new Date(eventDate).setHours(0,0,0,0);
          console.log("* event start time with hours: " + eventDate);
          console.log("* event date no hours: " + eventDateNoHrs);
          //getting end date
          let endDate = new Date(event.endTime);
          let endDateNoHrs = new Date(endDate).setHours(0,0,0,0);
          console.log("* event end time: " + endDate);
          console.log("* event end time with no hours: " + endDateNoHrs);

          console.log("This is the time of the event*: " + event.eventTime);
          //get the hour of the event
          let eventHr = new Date(event.eventTime).getHours();
          console.log("Event hour*: " + eventHr);
          //edge case for night since the minTime is more than maxTime when it goes into AM
          if(time == "Night"){
            return eventHr >= minTime || ((eventHr >= 18 && eventHr <= 24 || eventHr >= 1 && eventHr < 5) 
            && Date.parse(eventDateNoHrs) < Date.parse(endDateNoHrs)) || ((eventHr >= 18 && eventHr <= 24 || eventHr >= 1 && eventHr < 5) 
            && Date.parse(eventDate) < Date.parse(endDate));
          }
          return eventHr >= minTime && eventHr < maxTime;
        });
      }

    return filteredEvents;
  }

  sortEvents = (filteredEvents) => {
    filteredEvents = filteredEvents.sort((event1, event2) => {
      return new Date(event1.eventTime) - new Date(event2.eventTime);
    })
    return filteredEvents;
  };

  //!need to fix it where it reloads when filters are changed back to default (ex. any time for start time)
  renderFilteredEvents(events) {
    if (events && events.length) {
      let filteredEvents = this.state.events;

      //filtering by name of event
      filteredEvents = this.filterName(filteredEvents);

      //filtering by zip
      filteredEvents = this.filterZip(filteredEvents);

      //filtering by date
      filteredEvents = this.filterDate(filteredEvents);

      //filtering by a word or phrase
      filteredEvents = this.filterWord(filteredEvents);

      //filtering by category
      filteredEvents = this.filterCategory(filteredEvents);

      //filtering by age
      filteredEvents = this.filterAge(filteredEvents);

      //filtering by cost
      filteredEvents = this.filterCost(filteredEvents);

      //filtering by time of day
      filteredEvents = this.filterTime(filteredEvents)

      //sorting the events by more recent to further in the future
      filteredEvents = this.sortEvents(filteredEvents);

    if (filteredEvents === undefined || filteredEvents.length == 0) {
        return(
          <div>
            No events found with those search filters!
          </div>
        )
    }


      return (
        <div>
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
    //logging the data
    console.log("This is the data *: " + JSON.stringify(events));

    //getting the unfiltered data (will eventually be completely replace by filter, kept for testing)
    let eventsData = events
      ? FetchEventData.renderEventsTable(events)
      : this.renderLoading();

    //getting the filtered data
    let filteredEventsData = events
      ? this.renderFilteredEvents(events)
      : this.renderLoading();

    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchEventData.renderEvents(this.state.events)
    );

    return (
      <div>
        <Map events={JSON.stringify(this.state.events)} />

        {/*<div style={{ height: "100vh", width: "100%" }}>
        //<Map 
        //         center={[this.state.lat, this.state.lng]} 
        //         zoom={this.state.zoom} 
        //         style={{ width: '100%', height: '100vh'}}
        //      >
        //        <TileLayer
        //            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        //            url="https://{s}-tiles.locationiq.com/v2/obk-en/r/{z}/{x}/{y}.png?key=b0b149aa2f9d3a"
        //        />
        //     </Map>
        //</div> */}

        {/*//!This will be deleted and replaced by filtered events eventually, kept and commented out for testing temporarily */}
        {/* <h1 id="tableLabel" className="header">
          Events
        </h1> */}
        {/* <p>Got these events from our server DAWG</p>
        {eventsData} */}

        <div>
          {/* This is where the filtered data goes  */}
          <h1 className="header">Events (filtered)</h1>
          {filteredEventsData}
        </div>
      </div>
    );
  }
}
