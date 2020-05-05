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
import Weather from "./Weather";
import logo from "../images/happninHLogoCircle.png";
import notification from "../images/bell.svg";
import friends from "../images/users.svg";
import messages from "../images/inbox.svg";
import Dropdown from "react-bootstrap/Dropdown";
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
      <header className="rounded shadow-sm">
        <Navbar
          id="nav-container container-fluid"
          className="navbar-expand-lg navbar-toggleable-lg"
          light
        >
          <Container className="navbar">
            <div id="logoDiv" className="flexItem">
              <NavbarBrand tag={Link} to="/" className="logo">
                <img id="logo" className="d-inline-block" alt="Logo" src={logo} />
              </NavbarBrand>
            </div>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav">
                <div class="flexItem">
                  <NavItem>
                    <NavLink tag={Link} className="navHeader" to="/">
                      Home
                    </NavLink>
                  </NavItem>
                </div>
                <div class="flexItem">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      className="navHeader"
                      to="/fetch-location-data"
                    >
                      Locations
                    </NavLink>
                  </NavItem>
                </div>
                <div class="flexItem">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      className="navHeader"
                      to="/fetch-user-data"
                    >
                      Users
                    </NavLink>
                  </NavItem>
                </div>
                <div class="flexItem">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      className="navHeader"
                      to="/submit-event"
                    >
                      Submit Event
                    </NavLink>
                  </NavItem>
                </div>
                <div class="flexItem">
                  <NavItem>
                    <NavLink
                      tag={Link}
                      className="navHeader"
                      to="/BrowseEvents"
                    >
                      Events
                    </NavLink>
                  </NavItem>
                </div>
                <div class="flexItem">
                  <LoginMenu></LoginMenu>
                </div>
                <div class="flexItem">
                  <NavbarBrand tag={Link} to="/friends" className="friends">
                    <img id="friends" class="" alt="friends" src={friends} />
                  </NavbarBrand>
                </div>
                <div class="flexItem">
                  <NavbarBrand tag={Link} to="/messages" className="messages">
                    <img id="messages" class="" alt="messages" src={messages} />
                  </NavbarBrand>
                </div>
                {/* not sure if this part should be included in div */}
                <div class="flexItem">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      size="sm"
                      background-color="b1ed82"
                    >
                      <img
                        id="notification"
                        alt="notifications"
                        src={notification}
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        {" "}
                        Woah its a notification
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div id="weatherInfo" class="flexItem">
                  <Weather id="weather"></Weather>
                </div>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
