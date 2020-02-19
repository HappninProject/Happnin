import React, { Component } from 'react';

export class HappninEvent extends React.Component {
    render() {
        const e = this.props;
        return (
            <div className='happninevent'>
                
                <img src={e.avatar_url}/>
                <div className='eventinfo'>
                    <div>Name: <b>{e.name}</b></div>
                    <p>Description: {e.description} Cost: {e.cost} Host ID: {e.hostId}</p>
                    <p>Age Restriction: {e.ageRestriction} Start Time: {e.eventTime}</p>
                </div>
            </div>  
                )
    }
}