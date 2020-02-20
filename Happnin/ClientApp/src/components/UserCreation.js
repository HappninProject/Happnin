import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './UserCreation.css';
import { Button } from 'reactstrap';
import Recaptcha from 'react-recaptcha';
import $ from 'jquery';
 
//create dropdowns for user requirements
//use bootstrap to make page prettier

export class UserCreation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: { 
            userName: '',
            firstName : '',
            lastName : '',
            locationId : 1,
            password: '',
            email: ''          
        }, 
            loading: true
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            user : {
                [name] : value
            } 
        });
        console.log(this.state)
    }

    componentDidMount() {
        $(function() {
            //shows password requirements when user starts input
            $("#password").focus(function() {
                $('#passwordreq').slideDown();
            });
            $("#password").blur(function() {
                $('#passwordreq').hide();
            });

            //shows username requirements when user starts input
            $("#username").focus(function() {
                $('#usernamereq').slideDown();
            });
            $("#username").blur(function() {
                $('#usernamereq').hide();
            });

            //shows zip code requirements when user starts input
            $("#zip").focus(function() {
                $('#zipreq').slideDown();
            });
            $("#zip").blur(function() {
                $('#zipreq').hide();
            });

            //checks while user is typing to see if username requirements are being met
            $("#username").keyup(function() {
                //gets username value
                var usernameValue = $("#username").val();

                //making sure username only contains alphanumeric characters
                var regUsername = new RegExp("^[A-Za-z0-9]*$");
                if (regUsername.test(usernameValue)) {
                    //add valid class, get rid of invalid class
                    $('#userAlphaNum').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#userAlphaNum').removeClass("valid").addClass("invalid");
                }

                if(usernameValue.length >= 4){
                    $('#userMin').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#userMin').removeClass("valid").addClass("invalid");
                }

                // var regUsernameMax = new RegExp("^[A-Za-z0-9]{4,15}$");
                // if (regUsernameMax.test(usernameValue)) {
                //     //add valid class, get rid of invalid class
                //     $('#userMax').removeClass("invalid").addClass("valid");
                // }
                // else{
                //     $('#userMax').removeClass("valid").addClass("invalid");
                // }

                if(usernameValue.length <= 15){
                    $('#userMax').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#userMax').removeClass("valid").addClass("invalid");
                }

            });

            $("#zip").keyup(function(){
                //gets zip code value
                var zipValue = $("#zip").val();

                //making sure zip code is 5 digits
                if (zipValue.length == 5) {
                    //add valid class, get rid of invalid class
                    $('#zipDigits').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#zipDigits').removeClass("valid").addClass("invalid");
                    
                }
            });

            //checks while user is typing to see if password requirements are being met, and changes font from red to green and
            //adds a checkmark if requirements are met
            $("#password").keyup(function() {
                //get password value
                var value = $("#password").val();

                //testing that password has at least one lowercase letter
                var regLower = new RegExp("[a-z]");
                if (regLower.test(value)) {
                    $('#lower').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#lower').removeClass("valid").addClass("invalid");
                }

                //testing that password has at least one uppercase letter
                var regUpper = new RegExp("[A-Z]");
                if (regUpper.test(value)) {
                    $('#upper').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#upper').removeClass("valid").addClass("invalid");
                }

                //testing that password has at least one number
                var regNum = new RegExp("[0-9]");
                if (regNum.test(value)) {
                    $('#number').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#number').removeClass("valid").addClass("invalid");
                }

                //testing that password is at least 8 characters
                if(value.length >= 8){
                    $('#minlength').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#minlength').removeClass("valid").addClass("invalid");
                }

                //testing that password isn't longer than 30 characters
                if(value.length > 30){
                    $('#maxlength').removeClass("valid").addClass("invalid");
                }
                else{
                    $('#maxlength').removeClass("invalid").addClass("valid");
                }

                //testing that password contains at least one special character
                var regSpecial = new RegExp("[!@#$%^&*(),.?\":{}|<>]");
                if (regSpecial.test(value)) {
                    $('#special').removeClass("invalid").addClass("valid");
                }
                else{
                    $('#special').removeClass("valid").addClass("invalid");
                }
            });
        });
    }



    render() {
        return (
            <div id="accountform">
                <h1>Create Account</h1>
                <form>
                    <div>
                    <label>
                        First name: <br/>
                        <input id="fname" class="rounded" name="firstName" type="text" pattern="^[A-Za-z]+$" 
                        minLength="1" maxLength="40" placeholder="Jane" 
                        value={this.state.user.firstName} onChange={this.handleInputChange} required/>
                    </label>
                    </div>
                    <div>
                    <label>
                    Last name: <br/>
                        <input id="lname" class="rounded" name="lastName" type="text" pattern="^[A-Za-z]+$" minLength="1" maxLength="40" placeholder="Doe"
                         value={this.state.user.lastName} onChange={this.handleInputChange} required/>
                    </label>
                    </div>
                    <div>
                    <label>
                    Username: <br/>
                        <input id="username" class="rounded" name="userName" type="text" pattern="^[A-Za-z0-9]{4,15}$" placeholder="user123" 
                        value={this.state.user.firstName} onChange={this.handleInputChange} required/>
                    </label>
                    </div>
                    <div id="usernamereq">
                        <p id="userAlphaNum" class="valid">Username must only contain letters and numbers</p>
                        <p id="userMin" class="invalid">Username must be have a minimum length of 4</p>
                        <p id="userMax" class="valid">User must have a maximum length of 15</p>
                    </div>
                    <div>
<<<<<<< HEAD
                        <label>
                        Email: <br/>
                            <input id="email" class="rounded" name="email" type="email" placeholder="example@gmail.com" required/>
                        </label>
=======
                    <label>
                    Email: <br/>
                        <input id="email" class="rounded" name="email" type="email" placeholder="example@gmail.com"
                        value={this.state.user.email} onChange={this.handleInputChange} required/>
                    </label>
>>>>>>> afef9e134782a8be308af59d4988c5cd92bb7884
                    </div>
                    <div>
                    <label>
                    Zip code: <br/>
                        <input id="zip" class="rounded" name="zipcode" type="number" pattern="^\d{5}$" placeholder="99004" required/>
                    </label>
                    </div>
                    <div id="zipreq">
                        <p id="zipDigits" class="invalid">Zip code must be 5 digits</p>
                    </div>
                    <div>
                    <label>
                    Password: <br/>
                        <input id="password" class="rounded" name="password" type="password" 
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$" 
                        value={this.state.user.password} onChange={this.handleInputChange} required/>
                    </label>
                    </div>
                    <div id="passwordreq">
                    <h4>Password must contain the following:</h4>
                        <p id="lower" class="invalid">At least one lowercase letter</p>
                        <p id="upper" class="invalid">At least one uppercase letter</p>
                        <p id="number" class="invalid">A number</p>
                        <p id="special" class="invalid">At least one special character</p>
                        <p id="minlength" class="invalid">Minimum 8 characters</p>
                        <p id="maxlength" class="valid">Maximum 30 characters</p>
                    </div>
                    <div>
                    <input type="checkbox" name="13orolder" required/>
                    <label for="13orolder"> I am 13 or older</label>
                    </div>

                    <Recaptcha
                        sitekey="6Lf3W9gUAAAAABostmeeDYxgtLyJpsckK4Bei6I-"
                    />
                    <br/>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        )
    }
}

