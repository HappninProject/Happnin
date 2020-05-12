import React, { Component } from "react";
import { BrowseEvents } from "./BrowseEvents";
import {FetchEventData} from "./FetchEventData";
export class FetchBrowseEvents extends Component{

    constructor(props){
        super(props);
        this.state = {
            nameSearch: '',
            wordSearch: '',
            categorySearch: '',
            ageSearch: '',
            costSearch: ''
        }
    }

    handleNameSearch = (name) => {
        this.setState({nameSearch: name});
    }

    handleWordFilterChange = (word) => {
        this.setState({wordSearch: word});
    }

    handleCategorySearchChange = (category) => {
        this.setState({categorySearch: category});
    }

    handleAgeSearchChange = (age) => {
        this.setState({ageSearch: age});
    }

    handleCostSearchChange = (cost) => {
        this.setState({costSearch: cost});
    }

    render(){
        return(
            <div>
                <BrowseEvents onNameSearchChange = {this.handleNameSearch} onWordSearchChange = {this.handleWordFilterChange} 
                onCategorySearchChange={this.handleCategorySearchChange} onAgeSearchChange={this.handleAgeSearchChange}
                onCostSearchChange = {this.handleCostSearchChange}/>
                <FetchEventData name = {this.state.nameSearch} word = {this.state.wordSearch} category = {this.state.categorySearch}
                age = {this.state.ageSearch} cost = {this.state.costSearch}/>
            </div>
        )
    }
}