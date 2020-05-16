import React, { Component } from "react";

export class Attendies extends Component {
  render() {
    return (
      <div className="container-fluid card">
        <div>
            <table style = {{width:"100%"}}>
                <tr>
                    <th>Attending</th>
                    <th>Interested</th>
                </tr>
            </table>
        </div>
      </div>
    );
  }
}
