import React, { Component } from "react";
export class forgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }
  handleInputChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div>
        <div>
          <label htmlFor="email" class="subHeader">
            Email:&nbsp;
          </label>
          <input
            name="email"
            type="text"
            className="rounded"
            value={this.state.email}
            onChange={this.handleInputChange}
          ></input>
        </div>

        <div>
          <button>Submit</button>
        </div>
      </div>
    );
  }
}
