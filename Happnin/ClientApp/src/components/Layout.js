import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
            <div class = 'homeImages' >
              <Carousel infinite autoPlay = {5000} animationSpeed={1000}>
                <img class = 'images'src={'https://previews.123rf.com/images/digidreamgrafix/digidreamgrafix1303/digidreamgrafix130300239/18728539-spokane-washington-skyline-panorama-on-a-cloudy-day.jpg'} alt = 'slide1'/>
                <img class = 'images'src={'https://c8.alamy.com/comp/WX7MH3/panoramic-view-spokane-washington-downtown-city-skyline-WX7MH3.jpg'} alt = 'slide2' />
                <img class = 'images'src={'https://media.istockphoto.com/photos/clock-tower-at-riverfront-park-in-spokane-on-a-sunny-day-picture-id171367206'} alt = 'slide3' />              
              </Carousel>
            </div>
          <NavMenu />
          <Container class = 'page'>
            {this.props.children}
          </Container>
      </div>

    );
  }
}
