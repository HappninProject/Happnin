import React, {Button, Component, Form } from "react";
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
           id: this.props.id,
           event : {
            name: this.props.name,
            description: this.props.description,
            locationId: this.props.locationId,
            categoryId: this.props.locationId,
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
                          <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <label>Address: </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={this.state.location.address}
                                    onChange={this.handleInputLocationChange}
                                    class="form-control">
                                </input>
                            </div>
                            <div class="form-group">
                                <label>City: </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={this.state.location.city}
                                    onChange={this.handleInputLocationChange}
                                    class="form-control">
                                </input>
                            </div>
                          <div class="form-group">
                              <label for="state">State</label>
                              <select 
                                  class="form-control" 
                                  id="state" 
                                  name="state"
                                  value={this.state.value}
                                  
                                  onChange={this.handleInputLocationChange}
                                  ><option value="---">---</option>
                                  <option value="Alabama">Alabama</option>
                                  <option value="Alaska">Alaska</option>
                                  <option value="Arizona">Arizona</option>
                                  <option value="Arkansas">Arkansas</option>
                                  <option value="California">California</option>
                                  <option value="Colorado">Colorado</option>
                                  <option value="Connecticut">Connecticut</option>
                                  <option value="Delaware">Delaware</option>
                                  <option value="District of Columbia">District of Columbia</option>
                                  <option value="Florida">Florida</option>
                                  <option value="Georgia">Georgia</option>
                                  <option value="Guam">Guam</option>
                                  <option value="Hawaii">Hawaii</option>
                                  <option value="Idaho">Idaho</option>
                                  <option value="Illinois">Illinois</option>
                                  <option value="Indiana">Indiana</option>
                                  <option value="Iowa">Iowa</option>
                                  <option value="Kansas">Kansas</option>
                                  <option value="Kentucky">Kentucky</option>
                                  <option value="Louisiana">Louisiana</option>
                                  <option value="Maine">Maine</option>
                                  <option value="Maryland">Maryland</option>
                                  <option value="Massachusetts">Massachusetts</option>
                                  <option value="Michigan">Michigan</option>
                                  <option value="Minnesota">Minnesota</option>
                                  <option value="Mississippi">Mississippi</option>
                                  <option value="Missouri">Missouri</option>
                                  <option value="Montana">Montana</option>
                                  <option value="Nebraska">Nebraska</option>
                                  <option value="Nevada">Nevada</option>
                                  <option value="New Hampshire">New Hampshire</option>
                                  <option value="New Jersey">New Jersey</option>
                                  <option value="New Mexico">New Mexico</option>
                                  <option value="New York">New York</option>
                                  <option value="North Carolina">North Carolina</option>
                                  <option value="North Dakota">North Dakota</option>
                                  <option value="Northern Marianas Islands">Northern Marianas Islands</option>
                                  <option value="Ohio">Ohio</option>
                                  <option value="Oklahoma">Oklahoma</option>
                                  <option value="Oregon">Oregon</option>
                                  <option value="Pennsylvania">Pennsylvania</option>
                                  <option value="Puerto Rico">Puerto Rico</option>
                                  <option value="Rhode Island">Rhode Island</option>
                                  <option value="South Carolina">South Carolina</option>
                                  <option value="South Dakota">South Dakota</option>
                                  <option value="Tennessee">Tennessee</option>
                                  <option value="Texas">Texas</option>
                                  <option value="Utah">Utah</option>
                                  <option value="Vermont">Vermont</option>
                                  <option value="Virginia">Virginia</option>
                                  <option value="Virgin Islands">Virgin Islands</option>
                                  <option value="Washington">Washington</option>
                                  <option value="West Virginia">West Virginia</option>
                                  <option value="Wisconsin">Wisconsin</option>
                                  <option value="Wyoming">Wyoming</option></select>
                          </div>
                          <div class="form-group">
                              <label>Zip Code: </label>
                              <input
                                  type="text"
                                  name="zipCode"
                                  value={this.state.location.zipCode}
                                  onChange={this.handleInputLocationChange}
                                  class="form-control">
                              </input>
                          </div>
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
                          <div class="form-group">
                            <label>Start Time:</label>
                              <input 
                              type="datetime-local"
                              name="eventTime"
                              value={this.state.eventTime}
                              onChange={this.handleInputChange}
                              className="form-control"/>
                          </div>

                          <div class="form-group">
                            <label>End Time:</label>
                              <input 
                              type="datetime-local"
                              name="endTime"
                              value={this.state.endTime}
                              onChange={this.handleInputChange}
                              className="form-control"/>
                          </div>
                          <div class="form-group"> 
                            <label for="costId">Cost:</label>
                              <input 
                                type="number" 
                                name="cost"
                                value={this.state.event.cost}
                                min="0.00" step="0.50" 
                                data-number-to-fixed="4" 
                                data-number-stepfactor="100" 
                                class="form-control currency" 
                                id="costId" 
                                onChange={this.handleInputChange}/>
                          </div>
                          <div class="image">
                            Image: <input id="imageUpload" type="file" />
                          </div>
                          <button className="btn primaryButton" type="submit">
                            Submit
                          </button>
                        </form>
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
