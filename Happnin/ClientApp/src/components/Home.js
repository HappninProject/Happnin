import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <div class = 'header'>WELCOME TO HAPPNIN'</div>
        <table class = 'home'>
            <td>
            <div class = 'homeImages' >
              <Carousel infinite autoPlay = {5000} animationSpeed={1000}>
                <img class = 'images'src={'https://media.istockphoto.com/photos/monroe-street-bridge-in-spokane-wa-picture-id163641699'}/>
                <img class = 'images'src={'https://media.istockphoto.com/photos/downtown-spokane-washington-skyline-and-the-spokane-river-picture-id1125710637'} />
                <img class = 'images'src={'https://media.istockphoto.com/photos/clock-tower-at-riverfront-park-in-spokane-on-a-sunny-day-picture-id171367206'} />              
              </Carousel>
              </div>
            </td>
            <tc>
              <div>
              <table class = 'sideBar'>
                <tr class = 'sidebar-data'> 
                  <div>
                    <td>
                      SIGN IN!
                    </td>
                  </div>
                </tr>

                <tr class = 'sidebar-data'>
                  <div>
                    <td>
                      SIGN UP
                    </td>
                  </div>
                </tr>
           
                <tr class = 'sidebar-data'>
                  <div>
                    <td>
                      BROWSE EVENTS
                    </td>
                  </div>
                </tr>
    
              </table>
              </div>
            </tc>
        </table>
        <table class = 'event-table'>
          <td>

            <div class = 'eventTable' >
              <th class = 'eventsHeader'>UPCOMING EVENTS:</th>
                <tr>
                  <td class = 'event'> test </td>
                </tr>
            </div>

          </td>
          <td>

            <div class = 'eventTable' >
              <th class = 'eventsHeader'>FRIENDS EVENTS:</th>
                <tr>
                  <td class = 'event'> test </td>
                </tr>
            </div>

          </td>

          <td>

            <div class = 'eventTable' >
              <th class = 'eventsHeader'>POPULAR EVENTS:</th>
                <tr>
                  <td class = 'event'> test </td>
                </tr>
            </div>

          </td>
        </table>
                  
      </div>
    
    );
  }
}
