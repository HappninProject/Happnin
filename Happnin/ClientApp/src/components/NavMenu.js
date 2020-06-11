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
import logo from "../images/happninLogoWhite.png";

import Dropdown from "react-bootstrap/Dropdown";

export class NavMenu extends Component {
    static displayName = NavMenu.name;
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <header className=" shadow-sm">
            <Navbar
                id="nav-container container-fluid"
                className="navbar-expand-lg navbar-toggleable-lg navbar"
                light
            >
                <Container className="navbar">
                    <div id="logoDiv" className="flexItem">
                        <NavbarBrand tag={Link} to="/" className="logo">
                        <img id="logo" className="d-inline-block navbarLogo" alt="Logo" src={logo} />
                        </NavbarBrand>
                    </div>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav">
                        <div className="flexItem">
                            <NavItem>
                            <NavLink tag={Link} className="navHeader" to="/">
                                Home
                            </NavLink>
                            </NavItem>
                        </div>
                            <div className="flexItem">
                                    <NavItem className="navSubmitEvent">
                                        <NavLink
                                            tag={Link}
                                            className="navHeader submitEventBtnText"
                                            to="/submit-event"
                                        >
                                        
                                            Submit Event
                                        
                                        </NavLink>
                                    </NavItem>
                                
                            </div>
                        <div className="flexItem">
                            <NavItem activeClassName="active" activeStyle={{ color: 'red' }}>
                            <NavLink
                                activeStyle={{ color: 'red' }}
                                activeClassName="active"
                                tag={Link}
                                className="navHeader"
                                to="/BrowseEvents"
                            >
                                Events
                            </NavLink>
                            </NavItem>
                        </div>
                        <div className="flexItem">
                            <NavItem>
                            <NavLink
                                tag={Link}
                                className="navHeader"
                                to="/Products"
                            >
                                Products
                            </NavLink>
                            </NavItem>
                        </div>

                        </ul>
                    </Collapse>
                    <div className="login">
                        <LoginMenu/>
                    </div>
                </Container>
            </Navbar>
            </header>
        );
    }
}
