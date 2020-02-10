import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserCreation.css';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

export class UserCreation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="accountform">
                <h1>Create Account</h1>
                <AvForm>
                    <AvField name="fname" label="First name: " type="text" errorMessage="Invalid first name" validate={{
                        required: { value: true },
                        pattern: { value: '^[A-Za-z0-9]+$' },
                        minLength: { value: 1 },
                        maxLength: { value: 16 }
                    }} />
                    <AvField name="lname" label="Last name: " type="text" errorMessage="Invalid last name" validate={{
                        required: { value: true },
                        pattern: { value: '^[A-Za-z0-9]+$' },
                        minLength: { value: 1 },
                        maxLength: { value: 20 }
                    }} />
                    <AvField name="username" label="Username: " type="text" errorMessage="Invalid username" validate={{
                        required: { value: true },
                        pattern: { value: '^[A-Za-z0-9]+$' },
                        minLength: { value: 5 },
                        maxLength: { value: 20 }
                    }} />
                    <AvField name="email" label="Email: " type="email" errorMessage="Invalid email" validate={{
                        required: { value: true },
                        minLength: { value: 4 },
                        maxLength: { value: 30 }
                    }} />
                    <AvField name="dob" label="Date of birth (MM/DD/YYYY): " type="text" errorMessage="Invalid date of birth" validate={{
                        required: { value: true },
                        pattern: { value: '(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d'}
                    }} />
                    <AvField name="phone" label="Phone number: " type="text" errorMessage="Invalid phone number" validate={{
                        required: { value: true },
                        pattern: { value: '^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$'},
                        minLength: { value: 8 },
                        maxLength: { value: 13 }
                    }} />
                    <AvField name="zip" label="Zip code: " type="text" errorMessage="Invalid zip code" validate={{
                        required: { value: true },
                        /*pattern: { value: '^[A-Za-z0-9]+$' },*/
                        minLength: { value: 5 },
                        maxLength: { value: 20 }
                    }} />
                    <AvField name="password" label="Password (Must contain at least one uppercase and lowercase letter,
                    a number, and a special character): " type="password" errorMessage="Invalid password" validate={{
                        required: { value: true },
                        pattern: { value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'}
                    }} />
                    <Button type="submit">Submit</Button>
                </AvForm>
            </div>
        )
    }
}