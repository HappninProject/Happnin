import React, { Component } from 'react';

export class SubmitEvent extends Component {
    static displayName = SubmitEvent.name;

    render() {
        return (
            <div>
                <h1>Submit Event</h1>
                <form>
                    <label>Title: </label>
                    <p><input type='text' placeholder='Event Title' name='name' /></p>
                    <p><button>Send Message</button></p>
                </form>

            </div>

        );
    }
}