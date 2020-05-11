import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../../styles/HappninEvent.css";
import logo from "../../images/happninHLogoThumb.png";
import { Row, Col } from "react-bootstrap";
import moment from "moment";

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
      startTime: this.props.eventTime
    };
    console.log("in the constructor");
    console.log(this.props);
    this.attending = this.attending.bind(this);
  }

  //! get props from here
  static getDerivedStateFromProps(props, state) {
    console.log("we in getDerived");
    console.log(props);
    console.log(state);

    return {
      attending: props.attending,
      attendingId: props.attendingId,
      gotDerived: true,
    };
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

  componentDidUpdate(prevProps, prevState) {
    console.log("component did update");
    console.log(prevProps);
    console.log(prevState);
  }

  render() {
    const e = this.props;
    var startTime = moment(e.eventTime).format("LT").toString();
    var endTime = moment(e.endTime).format("LT").toString();

    return (
      <div class="card">
        <Row around="xs">
          <Col xs={2}>
            <Card.Img
              className="eventImage"
              variant="left"
              src={logo}
              rounded="true"
              style={{ padding: 5 }}
            />
          </Col>
          <Col xs={10} horizontal="right">
            <div class="card-body" className="happninevent">
              <div className="eventinfo">
                <h5 class="card-title">{e.name}</h5>
                <div class="card-text">
                  <p>{e.description}</p>
                  Cost: $ <b>{e.cost}</b> &ensp; Age Restriction:{" "}
                  <b>{e.ageRestriction}</b> <br /> <br />
                  Category: <b>{e.categoryId}</b> <br />
                  {startTime} - {endTime} <br />
                </div>
                <p id="inline-text">
                  {this.state.attending === true
                    ? "This is HAPPNIN!"
                    : "This is not HAPPNIN..."}
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
          {console.log("in the dealio")}
          {console.log(this.props)}
          {console.log(this.state)}
        </Row>
      </div>
    );
  }
}
