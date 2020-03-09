import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

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
              src={"https://images5.alphacoders.com/349/thumb-1920-349660.jpg"}
              alt="A concert with people raising their hands up"
            />
            <img
              className="item w-100"
              src={
                "https://seattle.cbslocal.com/wp-content/uploads/sites/15909838/2016/05/thinkstockphotos-518756776.jpg?w=1024&h=576&crop=1"
              }
              alt="A comedy club with a microphone in focus"
            />
            <img
              className="item w-100"
              src={"https://cdn.wallpapersafari.com/75/78/Hzj0JM.jpeg"}
              alt="Fireworks"
            />
          </Carousel>
        </div>
        <NavMenu />
        <Container className="page">{this.props.children}</Container>
        <Footer />
      </div>
    );
  }
}
