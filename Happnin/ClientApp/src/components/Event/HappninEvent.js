import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../../styles/HappninEvent.css";
import logo from "../../images/happninHLogoThumb.png";
import { Row, Col } from "react-bootstrap";
import { Category } from '../../shared/Category'
import { Link } from "react-router-dom";

export class HappninEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attending: false,
      attendingId: -1,
      gotDerived: false,
      // have to add these to use in FetchEventData
      eventName : this.props.eventName,
      eventDescription: this.props.description,
      category: this.props.categoryId,
      startTime: this.props.eventTime,
      image: {}
    };
   
    this.attending = this.attending.bind(this);
  }

  //! get props from here
  static getDerivedStateFromProps(props, state) {


    return {
      attending: props.attending,
      attendingId: props.attendingId,
      gotDerived: true,
    };
  }

  async componentDidMount(){
      await this.getPicture();
  }

  async attending() {
    console.log("in attending");
    console.log(this.state);
    if (this.state.attending === false) {
      const attendInfo = {
        eventId: this.props.id,
        userId: this.props.userId,
      };
      await fetch("api/Attendee", {
        method: "POST",
        body: JSON.stringify(attendInfo),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
    } else {
      const attendId = this.props.attendingId;
      const response = await fetch(`api/Attendee/${attendId}`, {
        method: "DELETE",
      });
      console.log(response);
    }
    this.props.handler();
  }

  ImageToUse = () => {
    const image = this.state.image;
    if( image.image === undefined){
      return logo;
    }
    else {
      return `data:image/jpeg;base64,${image.image}`;
    }
  }

  async getPicture(){
    const imageId = this.props.eventImageId;
    let response = await fetch(`api/Upload/${imageId}`)
    let image = await response.json();
    this.setState({image: image});
  }

  render() {
    const e = this.props;
    //changed this to show day and time of day
    let startDay = new Date(Date.parse(e.eventTime)).toDateString();
    //added this to show the start time of event
    let eventDay = new Date(e.eventTime);
    let startHrs = eventDay.getHours();
    let startMins = eventDay.getMinutes();
    //converting to 12 hr format
    let amPm = startHrs >= 12 ? 'PM' : 'AM';
    startHrs = (startHrs % 12) || 12;
    let eventStartTime = startHrs + ":" + startMins + " " + amPm;



    let endDay = new Date(Date.parse(e.endTime)).toDateString();
    //added this to show the end time of event
    let eventDayEnd = new Date(e.endTime);
    let endHrs = eventDayEnd.getHours();
    let endMins = eventDayEnd.getMinutes();
    //converting to 12 hr format
    let amPmEnd = endHrs >= 12 ? 'PM' : 'AM';
    endHrs = (endHrs % 12) || 12;
    let eventEndTime = endHrs + ":" + endMins + " " + amPm;
    let image = this.ImageToUse();

    return (
      <div class="card cardHappninEvent">
        <Row around="xs">
          <Col xs={2}>
            <Card.Img
              className="eventImage"
              variant="left"
              src={image}
              rounded="true"
              style={{ padding: 0, width: '188px', height: '188px' }}
            />
          </Col>
          <Col xs={10} horizontal="right">
            <div className="card-body happninevent">
              <div className="eventInfo">
                <h2 class="card-title">
                  <Link 
                    to={`/EventPage/${e.id}`}>{e.name}</Link>
                </h2>
                <div className="card-text">
                  <p className="description">{e.description}</p>
                  Cost: $ <b>{e.cost}</b> &ensp; Age Restriction:{" "}
                  <b>{e.ageRestriction == 500 ? "All Ages": e.ageRestriction + "+"}</b> <br /> <br />
                  Category: <b>{Category(e.categoryId)}</b> <br />
                  {startDay} at {eventStartTime} - {endDay} at {eventEndTime}<br />
>>>>>>> 0b455d267678ac6ba453889fbf75cfd2ab870949
                </div>
                <div className="category">
                    {Category(e.categoryId)}
                </div>


                <p id="inline-text">
                  {this.state.attending === true
                    ? "This is HAPPNIN!"
                    : ""}
                </p>
                <button
                  id="buyTicketsButton"
                  className="btn btn-primary"
                  onClick={this.attending}
                >
                  {this.state.attending === true ? "Going!" : "Go!"}
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
