import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import "../../styles/UserCreation.css";
import logo from '../../images/happninHLogoThumb.png';
import { Row, Col} from 'react-bootstrap';

export class HappninEvent extends Component {
    render() {
        const e = this.props;
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
                                    {e.description} <br/> 
                                    Cost: <b>{e.cost}</b>
                                    Age Restriction: <b>{e.ageRestriction}</b> <br/> <br/> 
                                
                                    Category: <b>{e.categoryId}</b> <br/>
                                    
                                    Start Time: {e.eventTime}<br/>
                                    End Time: {e.endTime}  <br/></p>
                                    <button id="buyTicketsButton" className="btn btn-primary" >Buy Tickets</button>
                            </div>
                        </div> 
                    </Col>
                    </Row>
             
                
            </div>
            

                )
    }
}