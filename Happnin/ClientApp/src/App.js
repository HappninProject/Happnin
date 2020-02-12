import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { FetchEventData } from './components/FetchEventData';
import { Counter } from './components/Counter';

import { UserAccount } from './components/UserAccount';
import { UserCreation } from './components/UserCreation';


import { SubmitEvent } from './components/SubmitEvent';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />

        <Route path='/user-account' component={UserAccount} />
        <Route path='/user-creation' component={UserCreation} />

        <Route path='/submit-event' component={SubmitEvent} />
        <Route path='/fetch-event-data' component={FetchEventData}/>

      </Layout>  
    );
  }
}
