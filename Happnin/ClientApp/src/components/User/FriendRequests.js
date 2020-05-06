import React, { Component } from "react";
import authService from '../api-authorization/AuthorizeService'

export class FriendRequests extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        isAuthenticated: false,
        userId: "",
        friendRequests: [],
        potentialFriends: [],
        yourRequests: [],
        requestedFriends: [],
        realFriendsRequest: [],
        realFriends: [],
        loading: true 
      };
  }

  componentDidMount() {
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
    this.populateRequestData();
    this.populateYourRequests();
    this.populateFriends();
  }

  renderFriendRequestTable(requests, potentialFriends) {
    let joinedArray = [];
    for(let i = 0; i < potentialFriends.length; i++){
      let joined = {...potentialFriends[i], ...requests[i]}
      joinedArray.push(joined)
    }
    console.log(joinedArray);
    return ( 
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Accept</th>
            <th>Deny</th>
          </tr>
        </thead>
        <tbody>
          {joinedArray.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.userName}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td><button onClick={ () => this.acceptFriendRequest(u.id, u.userId, u.friendId) }>Accept</button></td>
              <td><button onClick={ () => this.denyFriendRequest(u.id, u.userId) }>Deny</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderYourRequestTable(requests, potentialFriends) {
    let joinedArray = [];
    for(let i = 0; i < potentialFriends.length; i++){
      let joined = {...potentialFriends[i], ...requests[i]}
      joinedArray.push(joined)
    }
    console.log(joinedArray);
    return ( 
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {joinedArray.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.userName}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderFriendRequestTable(this.state.friendRequests, this.state.potentialFriends)
    );

    let yourRequests = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderYourRequestTable(this.state.yourRequests, this.state.requestedFriends)
    )

    let yourFriends = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderYourFriendsTable(this.state.realFriends)
    )



    return (
      <div className="card">
        <h1 id="tabelLabel" className="header">
          Friend Requests
        </h1>
        {contents}
      <h1 id="tabelLabel" className="header">
          Pending Requests
        </h1>
        {yourRequests}
      <h1 id="tabelLabel" className="header">
          Your Buds!
        </h1>
        {yourFriends}
      </div>

    );
  }

  renderYourFriendsTable(friends) {
    return ( 
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {friends.map(u => (
            <tr key={u.userName}>
              <td>{u.userName}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  async acceptFriendRequest(id, requestUserId, usersId){
    const friendRequest = {id: id, userId: requestUserId, friendId: usersId, status: 1 }
    let response = await fetch(`api/Friendship/${id}`, {
        method: "PUT",
        body: JSON.stringify(friendRequest),
        headers: { "Content-Type": "application/json" }
      })

    if (response.status === 200){
      const requests = this.state.friendRequests;
      let potentFriends = this.state.potentialFriends;
      for(let i = 0; i < requests.length; i++){
        if(requests[i].id === id){
          requests.splice(i,1);
          break;
        }
      } 
      for(let i = 0; i < potentFriends.length; i++){
      if(potentFriends[i].id === requestUserId){
        potentFriends.splice(i, 1);
        break;
        }
      }
      console.log('potential friends')
      console.log(potentFriends)
      console.log('requests')
      console.log(requests)
      this.setState({friendRequests: requests, potentialFriends: potentFriends});
    }
  }

  async denyFriendRequest(id, friendId){
    let request = await fetch(`api/Friendship/${id}`, {
      method: "DELETE"
    })

    let friendRequest = this.state.friendRequests;
    let potentFriends = this.state.potentialFriends;
    for(let i = 0; i < friendRequest; i++){
      if(friendRequest[i].id === id){
        friendRequest.splice(i, 1);
        break;
      }
    }
    for(let i = 0; i < potentFriends.length; i++){
      if(potentFriends[i].id === friendId){
        potentFriends.splice(i, 1);
        break;
      }
    }
    this.setState({friendRequests: friendRequest, potentialFriends: potentFriends});
  }

  async populateFriendData() {
    const wannaBeFriendIds = this.state.friendRequests.map(u => u.userId);
    let potential = [];
    for(let i = 0; i < wannaBeFriendIds.length; i++){
      const response = await fetch(`api/User/${wannaBeFriendIds[i]}`);
      const data = await response.json();
      potential.push(data);
    }
    console.log("potential friends?");
    console.log(potential);
    this.setState({potentialFriends: potential})
  }

  async populateYourRequests(){
    const userId = this.state.userId;
    console.log(userId);
    const response = await fetch(`api/Friendship/UserRequests/${userId}`);
    const data = await response.json();
    this.setState({yourRequests: data});
    this.populateYourRequestedFriends();
  }

  async populateYourRequestedFriends(){
    const beMyFriendsIds = this.state.yourRequests.map(u => u.friendId);
    let potential = [];
    for(let i = 0; i < beMyFriendsIds.length; i++){
      const response = await fetch(`api/User/${beMyFriendsIds[i]}`);
      const data = await response.json();
      potential.push(data);
    }
    console.log("Requested friends?");
    console.log(potential);
    this.setState({requestedFriends: potential})   
  }
  
  async populateRequestData() {
    console.log("before fetch");
    const userId = this.state.userId;
    console.log(userId);
    const response = await fetch(`api/Friendship/RequestsForUser/${userId}`);
    console.log(response);
    console.log("after fetch");
    const data = await response.json();
    console.log("Got Data", data);
    this.setState({ friendRequests: data });
    this.populateFriendData();
  }

  async populateFriends(){
    const userId = this.state.userId;
    let response = await fetch(`api/Friendship/Friends/${userId}`);
    const data = await response.json();
    this.setState({realFriendsRequest: data});
    this.populateCurrentFriends();
  }

  async populateCurrentFriends(){
    let friendIds = []
    let friendUsers = []
    const friends = this.state.realFriendsRequest;
    const userId = this.state.userId;
    friends.forEach(f => {
      if(f.userId == userId){
        friendIds.push(f.friendId);
      }
      else {
        friendIds.push(f.userId);
      }
    })
    for(let i = 0; i < friendIds.length; i++){
      const response = await fetch(`api/User/${friendIds[i]}`);
      const data = await response.json();
      friendUsers.push(data);
    }
    this.setState({realFriends: friendUsers, loading: false});
  }

}
