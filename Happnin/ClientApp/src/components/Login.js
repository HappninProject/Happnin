import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

export class Login extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>Log In</h2>
                    <label>
                        Username: <br />
                        <input id="username" name="username" type="text" pattern="^[A-Za-z0-9]+$" minLength="4" maxLength="15" required />
                    </label>
                </div>
                <div>
                    <label>
                        Password: <br />
                        <input id="password" name="password" type="password"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$" required />
                    </label>
                </div>
                <p>forgot password?</p>
                <Button type="sign up">Create Account</Button>
            </div>
        )
    }
}
