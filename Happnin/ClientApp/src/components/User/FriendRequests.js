import React, { Component } from "react";
import authService from '../api-authorization/AuthorizeService'

export class FriendRequests extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        isAuthenticated: false,
        userId: "",
        friendRequests: [],
        users: [],
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
  }

  renderFriendRequestTable(requests) {
    return ( 
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Friend ID</th>
            <th>Accept</th>
            <th>Deny</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.userId}</td>
              <td>{u.friendId}</td>
              <td><button>Accept</button></td>
              <td><button>Deny</button></td>
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
      this.renderFriendRequestTable(this.state.friendRequests)
    );

    return (
      <div className="card">
        <h1 id="tabelLabel" className="header">
          Users
        </h1>
        <p>Got these users from our server DAWG</p>
        {contents}
      </div>
    );
  }

  async populateUsersData() {
    
  }
 
  // TODO actually get to accept friend requests, show full friends
  
  async populateRequestData() {
    console.log("before fetch");
    console.log(this.state);
    const userId = this.state.userId;
    console.log(userId);
    const response = await fetch(`api/Friendship/RequestsForUser/${userId}`);
    console.log(response);
    console.log("after fetch");
    const data = await response.json();
    console.log("Got Data", data);
    this.setState({ friendRequests: data, loading: false });
  }
}
