import React, { Component } from "react";
import image from "../../images/event-image.jpg";

export class EventPage extends Component {
    render() {
        return (
            <div className="card container-fluid">
                <div className="col-3 border rounded white-div">
                        <img
                            id="event-image"
                            alt="event image"
                            src={image}
                        />
                </div>
                <h1 className="header">Event Name</h1>
             </div>

            );
    }
}