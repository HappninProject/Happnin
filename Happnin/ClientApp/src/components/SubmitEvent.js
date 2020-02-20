import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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
            <div style={{marginBottom: '2em'}}>
                <h1 class = 'header'>Submit an Event</h1>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                    <label for="inputTitle">Title:</label>
                        <input id="inputTitle" class="form-control" name="fname" type="text" pattern="^[A-Za-z]+$" 
                            minLength="1" maxLength="40" placeholder="Title" required/>
                    </div>

                    <div class="form-group">
                        <label for="description">Description:</label>
                            <textarea id="description" class="form-control" cols="50" rows="5"  
                                minLength="1" maxLength="200" required></textarea>
                    </div>

                    <div class = 'form-group'>
                        <label for="hostName">Host name:</label>
                            <input id="hostName" class="form-control" name="fname" type="text" pattern="^[A-Za-z]+$" 
                                minLength="1" maxLength="40" placeholder="Jane" required/>
                    </div>

                    <div class = 'form-group'>
                    <label for="hostEmail">Host Email:</label>
                        <input id="hostEmail" class="form-control" name="fname" type="text" pattern="^[A-Za-z]+$" 
                            minLength="1" maxLength="40" placeholder="Jane" required/>
                    </div>

                    <div class = 'form-group'>
                        <label for="phone">Contact(phone):</label>
                        <input id="phone" type='text' class="form-control" value={this.state.companyContact} onChange={this.handleCompanyContact}></input>
                    </div>

                    <div class = 'form-group'>
                        <label for="datePicker">Date:<br/> 
                            <SingleDatePicker
                                date={this.state.date} // momentPropTypes.momentObj or null
                                class="form-control"
                                onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                                focused={this.state.focused} // PropTypes.bool
                                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                                id="datePicker" // PropTypes.string.isRequired,
                            ></SingleDatePicker>
                        </label>
                    </div>

                    <div class = 'startTime'> 
                        <label class = 'subHeader'>Start Time: <br/>
                            <TimePicker
                                showSecond={false}
                                defaultValue={now}
                                className="xxx"
                                format={format}
                                use12Hours
                                inputReadOnly
                            ></TimePicker>
                        </label>
                    </div>

                    <div class = 'endTime'>
                        <label class = 'subHeader'>End Time: <br/>
                            <TimePicker
                                showSecond={false}
                                defaultValue={now}
                                className="xxx"
                                format={format}
                                use12Hours
                                inputReadOnly
                            ></TimePicker>
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="address" class='subHeader'>Event address:</label>
                        <input id="address" type='text' class="form-control" value = {this.state.eventAddress} onChange={this.handleInputChange}></input>
                    </div>

                    <div class='form-group'>
                        <label for="zip" class='subHeader'>Event ZIP:</label>
                        <input type='text' id="zip" class="form-control" value = {this.state.eventZip} onChange={this.handleInputChange}></input>
                    </div>
                    <div class = 'categorySelect'>
                        <label for="categorySelect" >Event category:    </label>
                        <select id="categorySelect" value = {this.state.category} class="form-control" onChange={this.handleInputChange}>
                                    <option value="Music">Music</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Culture">Culture</option>
                                    <option value="Festival">Festival</option>
                        </select> 
                    </div>
                    <div class ='image'>
                        Image: <input type='file'/>
                    </div>

                    {['checkbox'].map(type => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check inline label="18+?" type={type} id={`inline-${type}-1`} />
                        <Form.Check inline label="21+?" type={type} id={`inline-${type}-2`} />
                        
                    </div>
                    ))}

                    <div class='submitButton'>
                        <button variant="outline-primary">Submit</button>
                    </div>
                </form> 
            </div>
        );
    }
}