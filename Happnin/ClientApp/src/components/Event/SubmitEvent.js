import axios from 'axios';
import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "rc-time-picker/assets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import authService from '../api-authorization/AuthorizeService'
import { Redirect } from "react-router-dom";

export class SubmitEvent extends Component {
    static displayName = SubmitEvent.name;

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            event: {
            name: "",
            description: "",
            locationId: 0,
            categoryId: 1,
            hostId: "",
            eventImageId: null,
            eventTime: "2020-02-26T05:21:52.102Z",
            endTime: "2020-02-27T05:21:52.102Z",
            cost: 42.0,
            ageRestriction: 500
            },
            location : { 
                address: "",
                city: "",
                state: "",
                country: "US",
                zipCode: "",
                lat: "",
                lng: ""
            },
            img: {},
            redirectToHome: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitLocation = this.handleSubmitLocation.bind(this);
        this.handleInputLocationChange = this.handleInputLocationChange.bind(this);
        this.populateLocationData = this.populateLocationData.bind(this);
    }

  async handleSubmit(event) {
    await this.handleSubmitLocation(event)
    event.preventDefault();
    console.log(JSON.stringify(this.state.event));
    let image = null;
    if(this.state.img.name !== undefined){
      let res = await this.submitPhoto();
      console.log('res')
      console.log(res.data)
      image = res.data;
      this.setState({event: {...this.state.event, eventImageId: image.id}})
      console.log(this.state)
    }
   
    await fetch("api/Event", {
      method: "POST",
      body: JSON.stringify(this.state.event),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(
        response => {
              console.log(JSON.stringify(response));
              this.setState({redirectToHome: true});
      })
  }

  async submitPhoto() {

    const url = `api/Upload/`
    const formData = new FormData();
    formData.append('body', this.state.img);
    const config = {
      headers: {
        'content-type' : 'multipart/form-data',
      },
    };
   
    return await axios.post(url, formData, config);
  }


    async handleSubmitLocation(event) {
      event.preventDefault();
      event.persist();
      await this.populateLocationData();
        console.log(this.state);
        console.log(JSON.stringify(this.state.location));

        await fetch("api/Location", {
          method: "POST",
          body: JSON.stringify(this.state.location),
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
          .then(response =>
            { 
              var responseJSON = JSON.stringify(response);
              console.log(responseJSON)
              console.log(response)
              this.setState({
              event: {
                ...this.state.event,
                locationId: response.id
            }
          })})
          
      console.log(this.state);
  }

  handleInputLocationChange = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          location: {
            ...this.state.location,
            [name]: value
          }
        });
        console.log(this.state);
      };


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

  handleImageChange = event => {
    this.setState({img: event.target.files[0]});
  }

  componentDidMount = event => {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  };

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser()
    ]);
    this.setState({
      isAuthenticated,
      event: {
        ...this.state.event,
        hostId: user && user.sub
      }
    });
    console.log(user);
    }

    async populateLocationData() {
        var addressString = this.state.location.address + " " + this.state.location.city + " " + this.state.location.state;

        var self = this;
        await axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: addressString,
                key: process.env.REACT_APP_MAP_API_KEY
            }
        })
            .then(function (response) {
                console.log(response);

                var latitude = JSON.stringify(response.data.results[0].geometry.location.lat);
                var longitude = JSON.stringify(response.data.results[0].geometry.location.lng);
                self.setState({
                    location: {
                        ...self.state.location,
                        lat: latitude,
                        lng: longitude
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

  onDataChanged(newData){
    console.log("in onDataChanged")
    this.setState({location : newData}, ()=>{
      console.log('location has been defined');
    })
    console.log(this.state)
  }


  render() {
    const redirectToHomeRef = this.state.redirectToHome;
    console.log(redirectToHomeRef)
    if (redirectToHomeRef === true){
        return <Redirect to="/"/>
    }

    return (
      <div class="card">
      <div class="submit container-fluid submitEventContainer">
        <h1 class="header">Tell Us About Your Event</h1>

        <form onSubmit={this.handleSubmit}>
            <div>
                <h3>Where is it?</h3>
                <div class="form-group">
                    <label>Address: </label>
                    <input
                        type="text"
                        name="address"
                        value={this.state.location.address}
                        onChange={this.handleInputLocationChange}
                        className="form-control inputHeight">
                    </input>
                </div>
                <div class="form-group">
                    <label>City: </label>
                    <input
                        type="text"
                        name="city"
                        value={this.state.location.city}
                        onChange={this.handleInputLocationChange}
                        className="form-control inputHeight">
                    </input>
                </div>
                <div className="form-group">
                    <label for="state">State</label>
                    <select 
                        className="form-control inputHeight inputSubmitText" 
                        style={{paddingBottom: ".1rem"}}
                        id="state" 
                        name="state"
                        value={this.state.value}
                        
                        onChange={this.handleInputLocationChange}
                            ><option value="---">---</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="District of Columbia">District of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="Guam">Guam</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="Northern Marianas Islands">Northern Marianas Islands</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="Virgin Islands">Virgin Islands</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option></select>
                </div>
                <div className="form-group">
                    <label>Zip Code: </label>
                    <input
                        type="text"
                        name="zipCode"
                        value={this.state.location.zipCode}
                        onChange={this.handleInputLocationChange}
                        className="form-control inputHeight">
                    </input>
                </div>
            </div>
        <h3>What is it?</h3>
          <div className="form-group">
            <label for="inputName">Name:</label>
            <input
              id="inputName"
              className="form-control inputHeight"
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
                className="form-control inputHeight"
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

          <div className="categorySelect">
            <label for="categorySelect">Category:</label>
            <select
              id="categorySelect"
              value={this.state.event.categoryId}
              className="form-control inputHeight inputSubmitText"
              style={{paddingBottom: ".1rem"}}
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

          <div className="form-group">
            <label>Start Time:</label>
            <input 
                type="datetime-local"
                name="eventTime"
                value={this.state.eventTime}
                onChange={this.handleInputChange}
                className="form-control inputHeight"/>
          </div>
          
          <div class="form-group">
            <label>End Time:</label>
            <input 
            type="datetime-local"
            name="endTime"
            value={this.state.endTime}
            onChange={this.handleInputChange}
            className="form-control inputHeight"/>
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
                className="form-control currency inputHeight" 
                id="costId" 
                onChange={this.handleInputChange}/>
          </div>
          
            <div className="image">
              Image: <input id="imageUpload" type="file" multiple accept='image/*' onChange={this.handleImageChange}/>
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

            <button className="btn primaryButton" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
