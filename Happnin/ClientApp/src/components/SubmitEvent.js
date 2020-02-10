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
            date: null
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
                <h1>Submit Event</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Title: {eventName}</label>
                    <p><input type='text' 
                        placeholder='Event Title' 
                        value={eventName}
                        name='eventName' 
                        onChange={this.handleInputChange} /></p>

                    <label>Description: {eventDescription}</label>
                    <p><input type='text' placeholder='Event Description' value={eventDescription}
                        name='eventDescription' onChange={this.handleInputChange} /></p>   

                    <label>Date: </label>
                    <p><SingleDatePicker
                        date={this.state.date} // momentPropTypes.momentObj or null
                        onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                        focused={this.state.focused} // PropTypes.bool
                        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                        id="your_unique_id" // PropTypes.string.isRequired,
                        /></p>

                    <label>Start Time: </label>
                    <p><TimePicker
                        showSecond={false}
                        defaultValue={now}
                        className="xxx"
                        
                        format={format}
                        use12Hours
                        inputReadOnly
                    /></p>

                    <p><button>Submit</button></p>
                </form> 
            </div>
        );
    }
}