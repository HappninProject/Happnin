import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserAccount.css';
import { Button } from 'reactstrap';

//need to figure out how to access user information from database and use those props in page
export class UserAccount extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="container">
                    <div class="row">
                    <div class="col align-self-start col-sm border rounded white-div">
                            <div class="row text-center">
                                <img src="https://cdn4.iconfinder.com/data/icons/social-media-and-networking/480/02_social_medis_profile_female_placeholder_image_profile_female-512.png" class="img-fluid mt-0" alt="profile image"></img>
                                <h3>Jane Doe </h3>
                            </div>
                        </div>
                        <div class="col col-lg border rounded white-div">
                            <h1>ABOUT</h1>
                            <p>Username: </p>
                            <div>
                                <p>First name: </p>
                            </div>
                            <div>
                                <p>Last name: </p>
                            </div>
                            <div>
                                <p>City: </p>
                            </div>
                            <div>
                                <p>Birthday: </p>
                            </div>
                            <div>
                                <p>Email: </p>
                            </div>
                            <div>
                                <p>Phone: </p>
                            </div>
                            <div>
                                <p>Types of events I'm interested in: </p>
                            </div>
                        </div>
                </div>
                <div class="row">
                    <div>

                    </div>
                </div>
                <div class="float-right mt-2">
                    <Button>Edit Profile</Button>
                </div>
            </div>
        );
    }
}