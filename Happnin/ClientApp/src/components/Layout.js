import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./Weather";

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className="container-fluid">
                <NavMenu className="navMenu"/>
                <div id="weatherContainer">
                    <Weather id="weather"></Weather>
                </div>
                <Container className="page">
                    {this.props.children}
                </Container>
                <Footer/>
            </div>
        );
    }
}
