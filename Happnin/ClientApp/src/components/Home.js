import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <div class = 'header'>WELCOME TO HAPPNIN'</div>
        <table class = 'home'>
          <td>
            <div class = 'homeImages' >
              <th>PROBROBLY SOME IMAGES OR SOMETHING GOES HERE</th>
            </div>
          </td>

              <td>
                <table class = 'sideBar'>

                  <tr>
                      <div class = 'eventTable' >
                          <th class = 'eventsHeader'>UPCOMING EVENTS:</th>
                          <tr>
                            <td class = 'event'> test </td>
                          </tr>
                      </div>
                  </tr>

                  <tr>
                      <div class = 'eventTable' >
                          <th class = 'eventsHeader'>FRIENDS EVENTS:</th>
                            <tr>
                              <td class = 'event'> test </td>
                            </tr>
                      </div>
                  </tr>

                  <tr>
                      <div class = 'eventTable' >
                          <th class = 'eventsHeader'>POPULAR EVENTS:</th>
                            <tr>
                              <td class = 'event'> test </td>
                            </tr>
                      </div>
                  </tr>

                </table>
              </td>
          </table>
      </div>
    );
  }
}
