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
<<<<<<< refs/remotes/HappninProject/master
<<<<<<< refs/remotes/HappninProject/master
           id: this.props.id,
           event : {
=======
        event : {
>>>>>>> why the hell wont this work
            name: this.props.name,
            description: this.props.description,
            locationId: this.props.locationId,
            categoryId: this.props.locationId,
<<<<<<< refs/remotes/HappninProject/master
            hostId: this.props.userId,
            eventTime: this.props.eventTime,
            endTime: this.props.endTime,
            cost: this.props.cost,
            ageRestriction: this.props.ageRestriction },
          location : {
            address: "",
            city: "",
            state: "",
            country: "",
            zipCode: "" },
          
          locationChanged: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target.type)
    console.log(value)
    console.log(name)
    this.setState({
      event: {
        ...this.state.event,
        [name]: name === 'cost' || name === 'categoryId' || name === 'ageRestriction' ? parseFloat(value) : value
      }
    });
    console.log(this.state);
  };

  handleInputLocationChange = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          location: {
            ...this.state.location,
            [name]: value
          },
          locationChanged: true
        });
        console.log(this.state);
      };

  async handleSubmit(event) {
    event.preventDefault();
    const happninEvent = this.state.event;
    const id = this.state.id;
    console.log(JSON.stringify(this.state.event));
    let res = await fetch(`api/Event/${id}`, {
      method: "PUT",
      body: JSON.stringify(happninEvent),
      headers: { "Content-Type": "application/json" }
    })
    const data = await res.json();
    console.log(data);
    }
=======
      // have to add these to use in FetchEventData
      eventName : this.props.eventName,
      eventDescription: this.props.description,
      category: this.props.categoryId,
      startTime: this.props.eventTime
=======
            hostId: this.props.hostId,
            eventTime: this.props.startTime,
            endTime: this.props.endTime,
            cost: this.props.cost,
            ageRestriction: this.props.ageRestriction
        }
>>>>>>> why the hell wont this work
    };
  }
>>>>>>> added an accordian to the HostEvent

  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target.type)
    console.log(value)
    console.log(name)
    this.setState({
      event: {
        ...this.state.event,
        [name]: name === 'cost' || name === 'categoryId' || name === 'ageRestriction' ? parseFloat(value) : value
      }
    });
    console.log(this.state);
  };

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
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Edit
                   </Accordion.Toggle>
                   <Accordion.Collapse eventKey="0">
                   <div class="form-group">
                    <label for="inputName">Name:</label>
                    <input
                      id="inputName"
                      class="form-control"
                      name="name"
                      type="text"
                      placeholder="Title"
                      value={this.state.event.name}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="description">Description:</label>
                      <textarea
                        id="description"
                        className="form-control"
                        cols="50"
                        rows="5"
                        description="description"
                        name="description"
                        minLength="1"
                        maxLength="200"
                        value={this.state.event.description}
                        onChange={this.handleInputChange}
                        required
                      ></textarea>
                  </div>
                    <div class="categorySelect">
                      <label for="categorySelect">Event category:</label>
                        <select
                          id="categorySelect"
                          value={this.state.event.categoryId}
                          class="form-control"
                          name="categoryId"
                          onChange={this.handleInputChange}
                        >
                          <option value="1">Music</option>
                          <option value="2">Comedy</option>
                          <option value="3">Culture</option>
                          <option value="4">Festival</option>
                      </select>
                    </div>

                        <div class="categorySelect">
                          <label for="categorySelect">Event category:</label>
                            <select
                              id="categorySelect"
                              value={this.state.event.categoryId}
                              class="form-control"
                              name="categoryId"
                              onChange={this.handleInputChange}
                            >
                              <option value="1">Music</option>
                              <option value="2">Comedy</option>
                              <option value="3">Culture</option>
                              <option value="4">Festival</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <label>Start Time:</label>
                              <input 
                              type="datetime-local"
                              name="eventTime"
                              value={this.state.eventTime}
                              onChange={this.handleInputChange}
                              className="form-control"/>
                          </div>

                  </Accordion.Collapse>
                </Accordion>  
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
