import React, { Component } from "react";
import { BrowseEvents } from "./BrowseEvents";
import {FetchEventData} from "./FetchEventData";
export class FetchBrowseEvents extends Component{

    constructor(props){
        super(props);
        this.state = {
             nameSearch: '',
             wordSearch: '',
            categorySearch: '' 
        }
    }

    handleNameSearch = (name) => {
        this.setState({nameSearch: name});
        console.log("Name search change detected in parent class!");
    }

    handleWordFilterChange = (word) => {
        this.setState({wordSearch: word});
        console.log("Word search change detected in parent class!");
    }

    handleCategorySearchChange = (category) => {
        //!right now just printing it, state has not changed
        this.setState({categorySearch: category});
        console.log("Category in parent: " + category);
    }

    render(){
        return(
            <div>
                <BrowseEvents onNameSearchChange = {this.handleNameSearch} onWordSearchChange = {this.handleWordFilterChange} 
                onCategorySearchChange={this.handleCategorySearchChange}/>
                <FetchEventData name = {this.state.nameSearch} word = {this.state.wordSearch} category = {this.state.categorySearch}/>
            </div>
        )
    }
}