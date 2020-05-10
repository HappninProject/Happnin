import React, {Button, Component } from "react";
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import "../../styles/HappninEvent.css";
import logo from "../../images/happninHLogoThumb.png";
import { Row, Col } from "react-bootstrap";
import moment from "moment";

export class HostEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // have to add these to use in FetchEventData
      eventName : this.props.eventName,
      eventDescription: this.props.description,
      category: this.props.categoryId,
      startTime: this.props.eventTime
    };
    console.log("in the constructor");
    console.log(this.props);
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
                </p>
                <Accordion>
                  <Card>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          Edit
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body> This is where I will put the stuff to edit</Card.Body>
                      </Accordion.Collapse>
                    </Card> 
                </Accordion>  
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
