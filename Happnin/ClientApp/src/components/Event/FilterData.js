import React, { Component } from "react";
export class FilterData extends Component{
    constructor(props){
        super(props);
        //will take in props from BrowseEvents
        this.state = {
            filterWord = ""
        }
    }

    handleChange = (event) => {
        this.setState({
            filterWord: event.target.value
        })
        //also updates when props have been changed
        this.props.onChange(event.target.value);
    }

    render(){
        return(
            <div>
                <label htmlFor="filtering"></label>
                <input id = "filtering" type = "text"
                value = {this.state.filterWord}
                onChange={this.handleChange} ></input>
            </div>
        )
    }

}