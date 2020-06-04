import React, { Component } from "react";
import authService from '../api-authorization/AuthorizeService';

export class FriendSearch extends Component {

    constructor(props){
        super(props)
        this.state = {
            username: "",
            friendToRequest: {},
            userId: ""
        }
        this.submitSearch = this.submitSearch.bind(this);
        this.sendFriendRequest = this.sendFriendRequest.bind(this);
    }

    componentDidMount(){
        this.populateState();
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([
            authService.isAuthenticated(),
            authService.getUser()
        ]);
        console.log(user);
        this.setState({
            isAuthenticated,
            userId: user && user.sub
        });
        console.log(user);
  }


    handleInputUsernameSearch = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    async sendFriendRequest(id){
        const friendRequest = {
        userId: this.state.userId,
        friendId: id,
        status: 0
        }
        console.log(friendRequest);
        
        let response = await fetch('api/Friendship/', {
        method: 'POST',
        body: JSON.stringify(friendRequest),
        headers: {
            'Content-Type' : 'application/json'
        }
      })
  }

    async submitSearch(){
        const username = this.state.username;
        let response = await fetch(`api/User/FriendSearch/${username}`, {
            method: "POST",
            }
        )

        let friend = await response.json();
        this.setState({friendToRequest: friend});
    }

    render(){
        let content;
        console.log(this.state.friendToRequest.userName !== undefined)
        if(this.state.friendToRequest.userName !== undefined){
            let u = this.state.friendToRequest;
            content =  (
            <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
             <tr>
            <th>Username</th>
             </tr>
        </thead>
        <tbody>
            <tr key={u.userName}>
            <td>{u.userName}</td>
            <td><input type="button" value="Send Request" onClick={() => this.sendFriendRequest(u.id)}/></td>
            </tr>
        </tbody>
        </table>
            )
        }
        return (
        <div>
            <label for="friendSearch">Friend Search</label>
            <input type="text" name="username" id="username" onChange={this.handleInputUsernameSearch}/>
            <input type="button" value="search" onClick={this.submitSearch}/>
            {content}
        </div> 
        )
    }
}