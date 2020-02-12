import React, { Component } from 'react';
import { FetchEventData } from './FetchEventData';

export class browseEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventNameSearch: '',
            eventZipSearch: '',
            eventCategory: '',

        }
    }
    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render () {
        return (
            <div>
                <div>
                        <label class = 'subHeader'>search for event name: {this.state.eventNameSearch}</label>
                        <input type = 'text' value = {this.state.eventNameSearch} onChange = {this.handleInputChange}></input>

                        <label class = 'subHeader'>events near zip: {this.state.eventZipSearch}</label>
                        <input type = 'text' value = {this.state.eventZipSearch} onChange = {this.handleInputChange}></input>

                        <label class = 'subHeader'>events by category: {this.state.eventSearch}</label>
                        <select value = {this.state.category} onChange={this.handleInputChange}>
                                    <option value="Music">Music</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Culture">Culture</option>
                                    <option value="Festival">Festival</option>
                        </select> 


                        
                </div>
                <div>
                        <FetchEventData>

                        </FetchEventData>
                </div>
            </div>

         
        );
      }

}