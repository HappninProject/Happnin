import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HappninEvent } from "./Event/HappninEvent";
import authService from './api-authorization/AuthorizeService';
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import fireworks from "../images/fireworks.jpeg";
import crowd from "../images/crowd.jpg";
import microphone from "../images/microphone.jpg";
import nightLife from '../images/samvidh-ramanathan-9PaGKXIPUHQ-unsplash.jpg';
import { Link } from "react-router-dom";
import { ApplicationPaths } from "./api-authorization/ApiAuthorizationConstants";

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
    this.testSomething = this.testSomething.bind(this);
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
    this.populateEventData();
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
    this.populateAttendingData();

    this.testSomething();
  }

  async populateAttendingData(){
    const response = await fetch(`api/Attendee/AttendeeInfo/${this.state.userId}`);
    let attend = await response.json();
    this.setState({isAttending: attend});
  }

  testSomething = () => {
    
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

  static renderEventsTable(events, userId, attendedEvent, handler) {
    return (
      <div>
        {Home.setGoing(events, attendedEvent)}
        {events.map((eventinfo) => (
          <HappninEvent key={eventinfo.id} {...eventinfo} 
          attendingId={Home.attendingEvent(eventinfo.id, attendedEvent)}
          attending={eventinfo.going}
          userId={userId}
          handler={handler}/>
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
      Home.renderEventsTable(this.state.events, this.state.userId, this.state.isAttending, this.testSomething)
    );


    const registerPath = `${ApplicationPaths.Register}`;
    const loginPath = `${ApplicationPaths.Login}`;
    return (
      <div className="container-fluid ">
        <h1 id ='headerDL' className="headerWelcome">Welcome to Happnin</h1>
        <hr className="happninUnderline"/>
        <h2 className="headerSubWelcome">The site to find events and products near you</h2>
        <h2 className="headerCreateAccount"><b>Create an account</b> to share events and products available</h2>

        <Link to={registerPath}>
            <button className="btn btn-primary btnHomeSignUp" type="button">
                Sign up
            </button>
        </Link>
        <Link className="alreadyHaveAccount" to={loginPath}>
                Already have an account?
        </Link>

        <hr className="happninUnderline"/>
        <pre className="homeDetails">   Concerts           |           Restaurants         |           Events          |           Products            |           More...</pre>
        <div>
          <Carousel
            className="carousel"
            infinite
            autoPlay={20000}
            animationSpeed={10000}
          >
            <img
              className="item w-100"
              src={nightLife}
              alt="A busy urban street at night"
            />
            <img
              className="item w-100"
              src={crowd}
              alt="A concert with people raising their hands up"
            />
            <img
              className="item w-100"
              src={microphone}
              alt="A comedy club with a microphone in focus"
            />
            <img className="item w-100" src={fireworks} alt="Fireworks" />
          </Carousel>
        </div>

      </div>
    );
  }

  async populateEventData() {
    const response = await fetch("api/Event");
    console.log(response);
    const data = await response.json();
    this.setState({ events: data, loading: false });
  }
}
