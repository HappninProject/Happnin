import React, { Component } from "react";
import authService from '../api-authorization/AuthorizeService'

export class FetchUserData extends Component {
  static displayName = FetchUserData.name;

  constructor(props) {
    super(props);
    this.state = { 
        isAuthenticated: false,
        userId: "",
        users: [],
        loading: true 
      };
    this.renderUsersTable = this.renderUsersTable.bind(this);
    this.sendFriendRequest = this.sendFriendRequest.bind(this);
  }

  componentDidMount() {
    this.populateState();
    this.populateUsersData();
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

  renderUsersTable(users) {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>User Name</th>
            <th>First Name</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Friend Request</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.userName}>
              <td>{u.userName}</td>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.email}</td>
              <td><button onClick={() => this.sendFriendRequest(u.id)}>Click-Here</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
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




  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderUsersTable(this.state.users)
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
    console.log("before fetch");
    const response = await fetch("api/User");
    console.log(response);
    console.log("after fetch");
    const data = await response.json();
    console.log("Got Data", data);
    this.setState({ users: data, loading: false });
  }
}
