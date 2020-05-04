import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { LoginMenu } from "./api-authorization/LoginMenu";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/NavMenu.css";
import Weather from './Weather';
import logo from "../images/happninHLogoCircle.png";
import notification from "../images/bell.svg";
import friends from "../images/users.svg";
import messages from "../images/inbox.svg";
import Dropdown from 'react-bootstrap/Dropdown'
export class NavMenu extends Component {
  
    static displayName = NavMenu.name;
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true,
          //loading: true,
        };
        /*this.getLocation = this.getLocation.bind(this);
        this.getCordinates = this.getCordinates.bind(this);
        this.getLocation();*/
    }
   /* getLocation() {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.getCordinates);
      }
    }
    getCordinates(position){
      console.log(position.coords.latitude);
      this.setState({
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
      })
    }*/

    toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    }

  render() {
    return (
      <header className="container-fluid rounded shadow-sm">
        <Navbar className="navbar-expand-sm navbar-toggleable-sm mb-5" light>
          <Container className="navbar">
            <NavbarBrand tag={Link} to="/" className="logo">
              <img
                id="logo"
                class="d-inline-block mr-1"
                alt="Logo"
                src={logo}
              />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="navHeader" to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="navHeader"
                    to="/fetch-location-data"
                  >
                    Locations
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="navHeader"
                    to="/fetch-user-data"
                  >
                    Users
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="navHeader" to="/submit-event">
                    Submit Event
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="navHeader" to="/BrowseEvents">
                    Events
                  </NavLink>
                </NavItem>
                <LoginMenu></LoginMenu>
                <NavbarBrand tag={Link} to="/friend-request" className="friends">
                  <img
                    id="friends"
                    class="d-inline-block mr-1"
                    alt="friends"
                    src={friends}
                  />
                </NavbarBrand>

                <NavbarBrand tag={Link} to="/messages" className="messages">
                  <img
                    id="messages"
                    class="d-inline-block mr-1"
                    alt="messages"
                    src={messages}
                  />
                </NavbarBrand>

                
                <Dropdown>
                  <Dropdown.Toggle variant="link" size ="sm" id="dropdown-basic"  background-color = "b1ed82">
                  <img
                    id="notification"
                    class="d-inline-block mr-1"
                    alt="notifications"
                    src={notification}
                  />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1"> Woah its a notification</Dropdown.Item>
                  </Dropdown.Menu>
                  
                </Dropdown>
              </ul>
            </Collapse>
          </Container>
          <Weather id = "weather"></Weather>
          
        </Navbar>
      </header>
    );
  }
}
