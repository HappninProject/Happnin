import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class signIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: ''

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
                <label class = 'header'>SIGN IN:</label>

                <div>
                    <label class = 'subHeader'>user name:</label>
                    <input type = 'text' value = {this.state.userName} onChange = {this.handleInputChange}></input>
                </div>
                <div>
                    <label class = 'subHeader'>password:</label>
                    <input type = 'text' value = {this.state.password} onChange = {this.handleInputChange}></input>
                </div>

                <div>
                        <button>Submit</button>
                </div>
                <div>
                    <Link to="forgotPassword">forgot password?</Link>
                </div>
            </div>
        );
    }

}