import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/UserAccount.css";
import { Link } from "react-router-dom";

//need to figure out how to access user information from database and use those props in page

export class UserAccount extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      id: this.props.match.params.userId,      
      user: {
        userName: "",
        firstName: "",
        lastName: "",
        zipCode: -1,
        email: "",
        image: []
      },
      attending: [],
      events: []
    };
  }

  async componentDidMount(){
    await this.FetchUserAccount(); 
    await this.FetchAttending();
    await this.FetchAttendingEvents();
  }

  async FetchUserAccount(){
    const userId = this.state.id;
    const response = await fetch(`api/User/${userId}`);
    const tempUser = await response.json();
    this.setState({ user: tempUser });
  }

  async FetchAttending(){
    const userId = this.state.id;
    const attending = await fetch(`api/Attendee/AttendeeInfo/${userId}`);
    const tempAttend = await attending.json();
    this.setState({ attending: tempAttend });
  }

  async FetchAttendingEvents(){
    const attending = this.state.attending;
    let events = [];
    for(let i = 0; i < attending.length; i++){
      let response = await fetch(`api/Event/${attending[i].eventId}`)
      let event = await response.json();
      events.push(event);
    }
    this.setState({events: events})

  }

  render() {
    const events = this.state.events;
    const image = this.state.user.image;
    const imageContent = `data:image/jpeg;base64,${image}`

    return (
      <div class="card">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm border rounded white-div">
              <div className="row text-center">
                <img
                  src={imageContent}
                  className="img-fluid mt-0"
                  alt="User Avatar"
                ></img>
                <h3 className="header mx-auto">
                  {this.state.user.firstName + " " + this.state.user.lastName}
                </h3>
              </div>
            </div>
            <div className="col-5 float-right border rounded white-div">
              <h1 className="header">ABOUT</h1>
              <p className="subHeader">Username: {this.state.user.userName}</p>
              <div>
                <p className="subHeader">
                  First name: {this.state.user.firstName}
                </p>
              </div>
              <div>
                <p className="subHeader">
                  Last name: {this.state.user.lastName}
                </p>
              </div>
              <div>
                <p className="subHeader">Zipcode: {this.state.user.zipCode}</p>
              </div>
              <div>
                <p className="subHeader">Email: {this.state.user.email}</p>
              </div>
            </div>
            <div className="col-4 float-right border rounded white-div">
              <h1 className="header">Upcoming Events</h1>
              {events.map((e) => (
                <div><Link to={`/EventPage/${e.id}`}>{e.name}</Link></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
