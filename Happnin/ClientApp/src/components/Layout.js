import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import confetti from '../images/jason-leung-Xaanw0s0pMk-unsplash.jpg'
import nightCity from '../images/samvidh-ramanathan-9PaGKXIPUHQ-unsplash.jpg'
import food from '../images/phil-hei-6XvN2bN6P8o-unsplash.jpg'


export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className="container-fluid">
        <div className="homeImages">
          <Carousel infinite autoPlay={10000} animationSpeed={1000}>
            <img
              className="images"
              src={confetti}
              alt="slide1"
            />
            <img
              className="images"
              src={nightCity}
              alt="slide2"
            />

          </Carousel>
        </div>
        <NavMenu />
        <Container className="page">{this.props.children}</Container>
      </div>
    );
  }
}
