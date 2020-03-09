import React, { Component } from "react";
import { ZipCode } from "./ZipCode.js";
import "bootstrap/dist/css/bootstrap.min.css";

export class Location extends Component{

constructor(props) {
        super(props);
        this.state = {
            location: {
                address: "",
                city: "",
                state: "",
                country: "US",
                zipCode: "99999"
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange = event => {
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
        console.log(this.state.location);
      };

      async handleSubmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state.location));
        await fetch("api/Location", {
          method: "POST",
          body: JSON.stringify(this.state.location),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(response => console.log("Success: ", JSON.stringify(response)))
          .then(error => console.error("error:", error));
      }
    render(){
        return(
            <div>
                <h3>Where is your event?</h3>
                <div class="form-group">
                    <label>Address: </label>
                    <input
                        type="text"
                        name="address"
                        value={this.state.location.address}
                        onChange={this.handleInputChange}
                        class="form-control">
                    </input>
                </div>
                <div class="form-group">
                    <label>City: </label>
                    <input
                        type="text"
                        name="city"
                        value={this.state.location.city}
                        onChange={this.handleInputChange}
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
                        
                        onChange={this.handleInputChange}
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
                <ZipCode
                    name="zipCode"
                    value={this.state.location.zipCode}
                    onChange={this.handleInputChange}/>

                <button className="btn primaryButton" type="submit">Submit</button>
            </div>
        );
    }

}