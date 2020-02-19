import React, { Component } from 'react';
import './EventList.css';
import { HappninEvent } from './HappninEvent';

export class EventList extends React.Component {
    render() {
        const e = this.props;
        return(
            <div className='eventlist'>
         //   <span className='eventlisttext'>&#3C;EventList/&#x3E;</span>
            {e.eventinfoarray.map(eventinfo => <HappninEvent key={eventinfo.id}{...eventinfo}/>)}
            </div>
        );
    }
}