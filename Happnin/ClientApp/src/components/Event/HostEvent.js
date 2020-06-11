import React, {Button, Component, } from "react";
import Accordion from 'react-bootstrap/Accordion'
import Card from "react-bootstrap/Card";
import "../../styles/HappninEvent.css";
import logo from "../../images/happninHLogoThumb.png";
import { Row, Col } from "react-bootstrap";
import { Category } from '../../shared/Category'

export class HostEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        event : {
            name: this.props.name,
            description: this.props.description,
            locationId: this.props.locationId,
            categoryId: this.props.locationId,
            hostId: this.props.hostId,
            eventTime: this.props.startTime,
            endTime: this.props.endTime,
            cost: this.props.cost,
            ageRestriction: this.props.ageRestriction,
            eventImageId: this.props.eventImageId
        },
          image: {}
    };
  }

  async componentDidMount(){
    await this.getPicture();
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

   async getPicture(){
    const imageId = this.props.eventImageId;
    let response = await fetch(`api/Upload/${imageId}`)
    let image = await response.json();
    this.setState({image: image});
  }

  ImageToUse = () => {
      const imageId = this.state.event.eventImageId;
      console.log("imageId")
      console.log(imageId)
      if (imageId === null) {
          return logo;
      }
      else {
          return `data:image/jpeg;base64,${this.state.image.image}`;
      }
    }

  render() {
    const e = this.props;
    let startTime = new Date(Date.parse(e.eventTime)).toDateString();
    let endTime = new Date(Date.parse(e.endTime)).toDateString();
    let image = this.ImageToUse();
    return (
      <div class="card">
        <Row around="xs">
          <Col xs={2}>
            <Card.Img
              className="eventImage"
              variant="left"
              src={image}
              rounded="true"
              style={{ padding: 5, width: '188px', height: '188px' }}
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
                  Category: <b>{Category(e.categoryId)}</b> <br />
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
                        <Card.Body>
                          <form>
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
                              <option value="0">Music</option>
                              <option value="1">Festival</option>
                              <option value="2">Comedy</option>
                              <option value="3">Culture</option>
                              <option value="4">Other</option>
                              <option value="5">Product</option>
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
                        </Card.Body>
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
