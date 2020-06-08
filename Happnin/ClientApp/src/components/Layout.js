import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import fireworks from "../images/fireworks.jpeg";
import crowd from "../images/crowd.jpg";
import microphone from "../images/microphone.jpg";
import nightLife from '../images/samvidh-ramanathan-9PaGKXIPUHQ-unsplash.jpg';
import Weather from "./Weather";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="container-fluid">
            <NavMenu />
            <div id="weatherContainer">
                <Weather id="weather"></Weather>
            </div>
        <Container className="page">{this.props.children}</Container>
           
        <Footer />
      </div>
    );
  }
}
