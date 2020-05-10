import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import { HappninEvent } from "./Event/HappninEvent";
import authService from '../api-authorization/AuthorizeService';

export class HostedEvents extends Component {
    static displayName = HostedEvents.name;

    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false,
            user: ''
        }

    }

  componentDidMount = event => {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  };

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser()
    ]);
    console.log(user);
    this.setState({
      isAuthenticated,
      user: user && user.sub
    });
  }

  render() {
     return (
        <div><h1>Here in my hosted events</h1></div>         
     ) 
  }

}