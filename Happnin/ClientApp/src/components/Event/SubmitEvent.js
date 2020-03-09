import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "rc-time-picker/assets/index.css";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import moment from 'moment';
import MomentInput from 'react-moment-input';
import TimePicker from 'rc-time-picker';
import DateTimePicker from 'react-datetime-picker';
import { Location } from "../Location.js";


export class SubmitEvent extends Component {
  static displayName = SubmitEvent.name;

  constructor(props) {
    super(props);
    this.state = {
      event: {
        name: "",
        description: "",
        locationId: 1,
        categoryId: 2,
        hostId: 1,
        eventTime: "2020-02-26T05:21:52.102Z",
        endTime: "2020-02-27T05:21:52.102Z",
        cost: 42.0,
        ageRestriction: 500,
       // redirectToHome: false
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify(this.state.event));
    await fetch("event", {
      method: "POST",
      body: JSON.stringify(this.state.event),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(response => console.log("Success: ", JSON.stringify(response)))
      .then(error => console.error("error:", error));
  //  this.setState({ redirectToHome: true });
  }

  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      event: {
        ...this.state.event,
        [name]: value
      }
    });
    console.log(this.state.event);
  };

  componentDidMount = event => {};

  render() {
    // const redirectToHome = this.state.redirectToHome;
    // if (redirectToHome === true) {
    //   return <Redirect to="/fetch-event-data" />;
    // }

    return (
      <div class="card">
      <div class="submit container-fluid">
        <h1 class="header">Submit an Event</h1>

        <Location/>



        <form onSubmit={this.handleSubmit}>
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

          <div class="form-group">
            <label for="description">Description:</label>
            <textarea
              id="description"
              class="form-control"
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



                    <DateTimePicker 
                        value={this.state.date}
                        onChange={this.handleInputChange}
                        clearIcon={null}/>

          <div class="image">
            Image: <input id="imageUpload" type="file" />
          </div>

          {["checkbox"].map(type => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="18+?"
                value="18"
                type={type}
                name="ageRestriction"
                onChange={this.handleInputChange}
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                label="21+?"
                type={type}
                value="21"
                name="ageRestriction"
                onChange={this.handleInputChange}
                id={`inline-${type}-2`}
              />
            </div>
          ))}

          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
      </div>

    );
  }
}
