            Locations: [], 
            loading: true
   let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
          <p>Got these events from our server DAWG</p>
    if(this.loading){
        return (
            <div><h1>Here in my hosted events</h1></div>         
        ) 
    }
    return HostedEvents.renderEventsTable(this.state.event, this.state.userId);
 }
  async GetHostedEvents(){
    const userId = this.state.user;
    console.log("user id" + userId)
    const response = await fetch(`api/Event/HostedEvent/${userId}`);
    const data = await response.json();
    console.log("Data");
    this.setState({ Events: data, loading: false });
  async GetLocations(){
    const eventIds = this.state.Events.map(e => e.locationId);
    let locations = [];
    for (let i = 0; i < eventIds.length; i++){
      let res = await fetch(`api/Location/${eventIds[i]}`); 
      let data = await res.json();
      locations.push(data);
    }
    this.setState({Locations: locations})
  }

  static GetRightLocation(locationId, locations){

    for( var i of locations ){
      if ( i.id === locationId){
        return i;
      }
    }
  }
}