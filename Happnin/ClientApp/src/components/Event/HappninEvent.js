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


        let startTime = "";
        let endTime = "";

        if (e.categoryId != 5) {
            startTime = new Date(Date.parse(e.eventTime)).toDateString();
            endTime = new Date(Date.parse(e.endTime)).toDateString();
        }

        let image = this.ImageToUse();

        return (
            <div class="card cardHappninEvent">
                <Row around="xs">
                    <Col xs={4}>
                        <Card.Img
                            className="eventImage"
                            variant="left"
                            src={image}
                            rounded="true"
                            style={{ padding: 0, width: '12rem', height: '12rem' }}
                        />
                    </Col>
                    <Col xs={8} horizontal="right" style={{width: "100%"}} >
                        <div className="happninevent">
                            <div>
                                <div className="row">
                                    <h2 class="card-title">
                                        <Link 
                                            to={`/EventPage/${e.id}`}>{e.name}
                                        </Link>
                                    </h2>
                                    <div className="category">
                                        {Category(e.categoryId)}
                                    </div>
                                </div>
                                <div className="descriptionContainer">
                                        <p className="description">{e.description}</p>
                                    </div>

                                    <p id="inline-text">
                                        {this.state.attending === true
                                        ? "This is HAPPNIN!"
                                        : ""}
                                    </p>
                                    <div style={{marginBottom: ".5rem"}}>
                                        $ <b>{e.cost}</b> &ensp; Age Restriction:{" "}
                                        <b>{e.ageRestriction}</b><br/>
                                    </div>
                                <div className="row">
                                    <div style={{width: "60%"}}>
                                        {startTime} - {endTime} <br />
                                    </div>
                                    
   
                                    <div className="btnContainer">
                                        <button
                                            style={{float: "right"}}
                                            id="buyTicketsButton"
                                            className="btn btn-primary float-right pull-right btnGo"
                                            onClick={this.attending}
                                        >
                                            {this.state.attending === true ? "Going!" : "Go!"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
