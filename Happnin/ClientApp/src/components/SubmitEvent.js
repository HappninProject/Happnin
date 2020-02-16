import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
const format = 'h:mm a';
const now = moment().hour(0).minute(0);


export class SubmitEvent extends Component {
    static displayName = SubmitEvent.name;

    constructor(props) {
        super(props)
        this.state = {
            eventName: '',
            eventDescription: '',
            date: null,
            hostEmail: '',
            phone: '',
            companyName: '',
            companyContact: '',
            eventAddress: '',
            eventZip:'',
            eventDate:'',
            eventStart:'',
            eventEnd: '',
            category: '',
            age18Check: '',
            age21Check: '',
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(event)
        const data = this.state
        console.log("Final data is ", data)
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount = (event) => {
        fetch('api/Event', {
            method: 'post'
        })
    }


    render() {
        const { eventName, eventDescription } = this.state
        return (
            <div>
                <h1 class = 'header'>Submit Event</h1>
                <form onSubmit={this.handleSubmit}>
                <h1 class = 'header'>HOST INFO</h1>
                    <div class = 'hostName'>
                        <label class = 'subHeader'>Host name:</label>
                        <input type = 'text' value = {this.state.hostName} onChange = {this.handleHostName}></input>
                    </div>

                    <div class = 'hostEmail'>
                        <label class = 'subHeader'>Host Email:</label>
                        <input type = 'text' value = {this.state.hostEmail} onChange = {this.handleHostEmail}></input>
                    </div>

                    <div class = 'hostPhone'>
                        <label class = 'subHeader'>Host Phone:</label>
                        <input type = 'text' value = {this.state.phone} onChange = {this.handlePhone}></input>
                    </div>

                    <div class = 'companyName'>
                        <label class = 'subHeader'>Company or organization name:</label>
                        <input type = 'text' value = {this.state.companyName} onChange = {this.handleCompanyName}></input>
                    </div>

                    <div class = 'companyContact'>
                        <label class = 'subHeader'>Company/organization Contact(phone):</label>
                        <input type = 'text' value = {this.state.companyContact} onChange = {this.handleCompanyContact}></input>
                    </div>
                <h1 class = 'header'>EVENT INFO</h1>
                    <label class = 'subHeader'>Title: {eventName}</label>
                            <input type='text' 
                            placeholder='Event Title' 
                            value={eventName}
                            name='eventName' 
                            onChange={this.handleInputChange}></input>
                    <div class = 'eventDescription'>
                        <div class = 'eventDescription'>
                        <label class = 'subHeader'>Event description:</label>
                         <textarea value = {this.state.EventDescription} onChange = {this.handleInputChange}></textarea>
                </div> 
                    </div>
                    <div class = 'eventDate'>
                        <label class = 'subHeader'>Date: </label>
                            <SingleDatePicker
                                date={this.state.date} // momentPropTypes.momentObj or null
                                onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                                focused={this.state.focused} // PropTypes.bool
                                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                                id="your_unique_id" // PropTypes.string.isRequired,
                            ></SingleDatePicker>
                    </div>
                    <div class = 'startTime'>
                        <label class = 'subHeader'>Start Time: </label>
                            <TimePicker
                                showSecond={false}
                                defaultValue={now}
                                className="xxx"
                            
                                format={format}
                                use12Hours
                                inputReadOnly
                            ></TimePicker>
                    </div>

                    <div class = 'endTime'>
                        <label class = 'subHeader'>End Time: </label>
                            <TimePicker
                                showSecond={false}
                                defaultValue={now}
                                className="xxx"
                            
                                format={format}
                                use12Hours
                                inputReadOnly
                            ></TimePicker>

                    
                    </div>
                    <div class = 'eventAddress'>
                        <label class = 'subHeader'>Event address:</label>
                        <input type = 'text' value = {this.state.eventAddress} onChange = {this.handleInputChange}></input>
                    </div>

                    <div class = 'eventZip'>
                        <label class = 'subHeader'>Event ZIP:</label>
                        <input type = 'text' value = {this.state.eventZip} onChange = {this.handleInputChange}></input>
                    </div>
                    <div class = 'eventCategory'>
                        <label class = 'subHeader'>Event category:</label>
                        <select value = {this.state.category} onChange={this.handleInputChange}>
                                    <option value="Music">Music</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Culture">Culture</option>
                                    <option value="Festival">Festival</option>
                        </select> 
                    </div>
                    <div class = '18Check'>
                        <label class = 'subHeader'>18+?</label>
                        <input type = "checkBox" value = {this.state.age18Check} onchange = {this.handleInputChange}></input>
                    </div>

                    <div class = '21Check'>
                        <label class = 'subHeader'>21+?</label>
                        <input type = "checkBox" value = {this.state.age21Check} onchange = {this.handleInputChange}></input>
                    </div>

                    <div class = 'submitButton'>
                        <button>Submit</button>
                    </div>
                </form> 
            </div>
        );
    }
}