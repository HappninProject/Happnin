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

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="container-fluid">
        <div>
          <Carousel
            className="carousel slide"
            infinite
            autoPlay={5000}
            animationSpeed={1000}
          >
            <img
              className="item w-100"
              src={crowd}
              alt="A concert with people raising their hands up"
            />
            <img
              className="item w-100"
              src={microphone}
              alt="A comedy club with a microphone in focus"
            />
            <img className="item w-100" src={fireworks} alt="Fireworks" />
          </Carousel>
        </div>
        <NavMenu />
        <Container className="page">{this.props.children}</Container>
        <Footer />
      </div>
    );
  }
}
