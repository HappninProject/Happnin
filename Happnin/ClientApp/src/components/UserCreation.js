import React, { Component } from "react";
import "./UserCreation.css";
import { Button } from "reactstrap";
import Recaptcha from "react-recaptcha";

//use bootstrap to make page prettier
//send email confirmation
//profile picture needs to be stored somewhere

export class UserCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        userName: "",
        firstName: "",
        lastName: "",
        locationId: 1,
        password: "",
        email: ""
      },
      loading: true,
      showZip: false,
      showUser: false,
      showPassReq: false,
      isValidZip: false,
      isValidUserAlpha: false,
      isValidUserMin: false,
      isValidUserMax: true,
      isValidPassLower: false,
      isValidPassUpper: false,
      isValidPassNum: false,
      isValidPassMin: false,
      isValidPassMax: true,
      isValidPassSpecial: false
    };
    this.validateZip = this.validateZip.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
    console.log(this.user);
  };

  async handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify(this.state.user));
    await fetch("user", {
      method: "POST",
      body: JSON.stringify(this.state.user),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(response => console.log("Success: ", JSON.stringify(response)))
      .then(error => console.error("error:", error));
  }

  componentDidMount() {}

  //these show or hide dropdowns if input is clicked on
  showOrHideZip = () =>
    this.setState(currentState => ({ showZip: !currentState.showZip }));
  showOrHideUser = () =>
    this.setState(currentState => ({ showUser: !currentState.showUser }));
  showOrHidePassReq = () =>
    this.setState(currentState => ({ showPassReq: !currentState.showPassReq }));

  //this makes sure that the zip code is valid, then add the valid or invalid classes accordingly
  validateZip(event) {
    const target = event.target;
    const zipValue = target.value;
    zipValue.length == 5
      ? this.setState({ isValidZip: true })
      : this.setState({ isValidZip: false });
  }

  //this makes sure the username is valid, then add the valid or invalid classes accordingly
  validateUsername(event) {
    const target = event.target;
    const usernameValue = target.value;
    var regAlpha = new RegExp("^[A-Za-z0-9]*$");
    regAlpha.test(usernameValue) && usernameValue.length > 0
      ? this.setState({ isValidUserAlpha: true })
      : this.setState({ isValidUserAlpha: false });
    usernameValue.length >= 4
      ? this.setState({ isValidUserMin: true })
      : this.setState({ isValidUserMin: false });
    usernameValue.length <= 15
      ? this.setState({ isValidUserMax: true })
      : this.setState({ isValidUserMax: false });
  }

  //this makes sure the password is valid, then add the valid or invalid classes accordingly
  validatePassword(event) {
    const target = event.target;
    const passValue = target.value;
    var regLower = new RegExp("[a-z]");
    regLower.test(passValue)
      ? this.setState({ isValidPassLower: true })
      : this.setState({ isValidPassLower: false });
    var regUpper = new RegExp("[A-Z]");
    regUpper.test(passValue)
      ? this.setState({ isValidPassUpper: true })
      : this.setState({ isValidPassUpper: false });
    var regNum = new RegExp("[0-9]");
    regNum.test(passValue)
      ? this.setState({ isValidPassNum: true })
      : this.setState({ isValidPassNum: false });
    passValue.length >= 8
      ? this.setState({ isValidPassMin: true })
      : this.setState({ isValidPassMin: false });
    passValue.length <= 30
      ? this.setState({ isValidPassMax: true })
      : this.setState({ isValidPassMax: false });
    var regSpecial = new RegExp('[!@#$%^&*(),.?":{}|<>]');
    regSpecial.test(passValue)
      ? this.setState({ isValidPassSpecial: true })
      : this.setState({ isValidPassSpecial: false });
  }

  render() {
    return (
      <div id="accountform">
        <h1 class="header">Sign Up!</h1>
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label>First name:</label>
            <input
              id="fname"
              className="form-control"
              name="firstName"
              type="text"
              pattern="^[A-Za-z]+$"
              minLength="1"
              maxLength="40"
              placeholder="Jane"
              value={this.state.user.firstName}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last name:</label>
            <input
              id="lname"
              className="form-control"
              name="lastName"
              type="text"
              pattern="^[A-Za-z]+$"
              minLength="1"
              maxLength="40"
              placeholder="Doe"
              value={this.state.user.lastName}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              id="username"
              className="form-control"
              name="userName"
              type="text"
              pattern="^[A-Za-z0-9]{4,15}$"
              placeholder="user123"
              value={this.state.user.userName}
              onChange={this.handleInputChange}
              onFocus={this.showOrHideUser}
              onBlur={this.showOrHideUser}
              onKeyUp={this.validateUsername}
              required
            />
            {this.state.showUser && (
              <p
                id="userAlphaNum"
                className={this.state.isValidUserAlpha ? "valid" : "invalid"}
              >
                Username must only contain letters and numbers
              </p>
            )}
            {this.state.showUser && (
              <p
                id="userMin"
                className={this.state.isValidUserMin ? "valid" : "invalid"}
              >
                Username must be have a minimum length of 4
              </p>
            )}
            {this.state.showUser && (
              <p
                id="userMax"
                className={this.state.isValidUserMax ? "valid" : "invalid"}
              >
                User must have a maximum length of 15
              </p>
            )}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              id="email"
              className="form-control"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={this.state.user.email}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Zip code: </label>
            <input
              id="zip"
              className="form-control rounded"
              name="zipcode"
              type="number"
              pattern="^\d{5}$"
              placeholder="99004"
              onFocus={this.showOrHideZip}
              onBlur={this.showOrHideZip}
              onKeyUp={this.validateZip}
              required
            />
            {this.state.showZip && (
              <p
                id="zipDigits"
                className={this.state.isValidZip ? "valid" : "invalid"}
              >
                Zip code must be 5 digits
              </p>
            )}
          </div>
          <div className="form-group">
            <label for="profile_pic">Profile Picture: </label>
            <br />
            <input id="profile_pic" name="profile_pic" type="file" />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              id="password"
              className="form-control"
              name="password"
              type="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$"
              value={this.state.user.password}
              onChange={this.handleInputChange}
              onFocus={this.showOrHidePassReq}
              onBlur={this.showOrHidePassReq}
              onKeyUp={this.validatePassword}
              required
            />
            {this.state.showPassReq && (
              <p
                id="lower"
                className={this.state.isValidPassLower ? "valid" : "invalid"}
              >
                At least one lowercase letter
              </p>
            )}
            {this.state.showPassReq && (
              <p
                id="upper"
                className={this.state.isValidPassUpper ? "valid" : "invalid"}
              >
                At least one uppercase letter
              </p>
            )}
            {this.state.showPassReq && (
              <p
                id="number"
                className={this.state.isValidPassNum ? "valid" : "invalid"}
              >
                A number
              </p>
            )}
            {this.state.showPassReq && (
              <p
                id="special"
                className={this.state.isValidPassSpecial ? "valid" : "invalid"}
              >
                At least one special character
              </p>
            )}
            {this.state.showPassReq && (
              <p
                id="minlength"
                className={this.state.isValidPassMin ? "valid" : "invalid"}
              >
                Minimum 8 characters
              </p>
            )}
            {this.state.showPassReq && (
              <p
                id="maxlength"
                className={this.state.isValidPassMax ? "valid" : "invalid"}
              >
                Maximum 30 characters
              </p>
            )}
          </div>
          <div>
            <input type="checkbox" name="13orolder" required />
            <label htmlFor="13orolder"> I am 13 or older</label>
          </div>

          <Recaptcha sitekey="6Lf3W9gUAAAAABostmeeDYxgtLyJpsckK4Bei6I-" />
          <br />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}
