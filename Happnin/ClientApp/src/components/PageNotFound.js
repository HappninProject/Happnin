import React, { Component } from "react";
import { Link } from 'react-router-dom';
export class PageNotFound extends Component{
    //! just for testing
    render(){
        return <div>
            <p style={{textAlign:"center"}}>
                Sorry, that page doesn't exist!<br/>
              <Link to="/">Go to Home </Link>
            </p>
          </div>;
    }
}

