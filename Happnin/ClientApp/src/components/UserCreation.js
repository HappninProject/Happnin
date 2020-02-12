import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserCreation.css';
import { Button } from 'reactstrap';


//Ask user if they're 13 or over, are you a robot verification through google api
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
                    <label>
                        First name: <br/>
                        <input id="fname" name="fname" type="text" pattern="^[A-Za-z]+$" minLength="1" maxLength="30" required/>
                    </label>
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
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        )
    }
}