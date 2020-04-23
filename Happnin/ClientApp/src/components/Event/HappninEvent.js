import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../../styles/UserCreation.css";
import logo from '../../images/happninHLogoThumb.png';
import { Row, Col} from 'react-bootstrap';
import moment from 'moment';

export class HappninEvent extends Component {
    
    constructor(props){
        super(props);
        this.state = {};
        console.log(this.props);
        this.attending = this.attending.bind(this);
    }

    async attending(){
        const attendInfo = {
                            eventId: this.props.id,
                            userId: this.props.userId
                           }
        await fetch("api/Attendee", {
            method: "POST",
            body: JSON.stringify(attendInfo),
            headers: { "Content-Type" : "application/json" }
        })
        .then(res => res.json())
    }
    
    render() {
        const e = this.props;
        var startTime = moment(e.eventTime).format('LT').toString();
        var endTime = moment(e.endTime).format('LT').toString();

        return (
           
            <div class="card" >
                <Row around="xs">
                    <Col xs={2} >
                        <Card.Img className="eventImage" variant="left" src={logo} rounded style={{padding: 5}}/>
                    </Col>
                    <Col xs={10} horizontal='right'>
                        <div class="card-body" className='happninevent'>
                            <div className='eventinfo'>
                                <h5 class="card-title">{e.name}</h5>
                                <p class="card-text" >
                                    <p>{e.description}</p>
                                    Cost: $ <b>{e.cost}</b> &ensp;
                                    Age Restriction: <b>{e.ageRestriction}</b> <br/> <br/> 
                                    Category: <b>{e.categoryId}</b> <br/>
                                        {startTime} - {endTime}  <br/></p>
                                        <button className="btn secondaryButton" >Add to Favorites</button>
                                    <h4>{e.attending === true ?  "This is HAPPNIN!" : "This is not HAPPNIN..." }</h4>
                                    <button id="buyTicketsButton" className="btn btn-primary" onClick={this.attending} >Going!</button>
                            </div>
                        </div> 
                    </Col>
                </Row>
            </div>
        )
    }
}

