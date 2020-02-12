import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserCreation.css';
import { Button } from 'reactstrap';
import Recaptcha from 'react-recaptcha';
 

// are you a robot verification through google api
//check if zip code is valid
//create dropdowns for user requirements


export class UserCreation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="accountform">
                <h1>Create Account</h1>
                <form>
                    <div>
                    <label>
                        First name: <br/>
                        <input id="fname" name="fname" type="text" pattern="^[A-Za-z]+$" minLength="1" maxLength="30" required/>
                    </label>
                    </div>
                    <div>
                    <label>
                    Last name: <br/>
                        <input id="lname" name="lname" type="text" pattern="^[A-Za-z]+$" minLength="1" maxLength="30" required/>
                    </label>
                    </div>
                    <div>
                    <label>
                    Username: <br/>
                        <input id="username" name="username" type="text" pattern="^[A-Za-z0-9]+$" minLength="4" maxLength="15" required/>
                    </label>
                    </div>
                    <div>
                    <label>
                    Email: <br/>
                        <input id="email" name="email" type="email" required/>
                    </label>
                    </div>
                    <div>
                    <label>
                    Zip code (5 digit): <br/>
                        <input id="zip" name="zip" type="text" pattern="\d{5}" maxLength="5" required/>
                    </label>
                    </div>
                    <div>
                    <label>
                    Password: <br/>
                        <input id="password" name="password" type="password" 
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$" required/>
                    </label>
                    </div>
                    <div>
                    <input type="checkbox" name="13orolder" required/>
                    <label for="13orolder"> I am 13 or older</label>
                    </div>

                    <Recaptcha
                        sitekey="6Lf3W9gUAAAAABostmeeDYxgtLyJpsckK4Bei6I-"
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        )
    }
}