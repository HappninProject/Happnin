import React, { Component } from "react";
import { Redirect, Route, Switch, BrowserRouter} from 'react-router-dom';
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Terms } from "./components/Terms";
import { Privacy } from "./components/Privacy";
import { HostedEvents } from "./components/Event/HostedEvents"
// import { FetchEventData } from "./components/Event/FetchEventData";
//import FetchEventDataWithError404 from "./components/Event/FetchEventData";
import { FetchUserData } from "./components/User/FetchUserData";
import { FetchLocationData } from "./components/FetchLocationData";
import { SubmitEvent } from "./components/Event/SubmitEvent";
//import { BrowseEvents } from "./components/Event/BrowseEvents";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import { ContactUs } from "./components/ContactUs";
import "./styles/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/react_dates_overrides.css";
import { FriendRequests } from "./components/User/FriendRequests";
import { FetchBrowseEvents } from "./components/Event/FetchBrowseEvents";
import { EventPage } from "./components/Event/EventPage";
import {Products} from "./components/Products";
import {Attendies} from "./components/Attendies";
import { PageNotFound } from "./components/PageNotFound";

export default class App extends Component {
  static displayName = App.name;

  state = {
    eventinfoarray: [],
  };

  render() {
    return (
      <BrowserRouter>
      <Layout>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/submit-event" component={SubmitEvent} />
        {/* Commented this out */}
        {/* <Route path="/BrowseEvents" component={BrowseEvents} /> */}
        {/* added this */}
        <Route path="/BrowseEvents" component={FetchBrowseEvents} />
        {/* <Route path="/fetch-event-data" component={FetchEventDataWithError404} /> */}
        <Route path="/fetch-user-data" component={FetchUserData} />
        <Route path="/fetch-location-data" component={FetchLocationData} />
        <Route
          path={ApplicationPaths.ApiAuthorizationPrefix}
          component={ApiAuthorizationRoutes}
        />
        <Route path="/friend-request" component={FriendRequests} />
        <Route path="/EventPage/:eventId" component={EventPage} />
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/about" component={About} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path='/hosted-events' component={HostedEvents}/>
        <Route path='/Products' component={Products}/>
        <Route path='/Attendies' component={Attendies}/>
        <Route component={PageNotFound}/>
        </Switch>
      </Layout>
      </BrowserRouter>
    );
  }
}
