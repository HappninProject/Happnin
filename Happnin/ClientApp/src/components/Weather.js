import React, { Component, useContext}from "react";
import "../styles/NavMenu.css";
import ReactAnimatedWeather from "react-animated-weather";
import { LocationContext } from './LocationContext';

export default class Weather extends Component {
    state = {
        weather: null,
        city_name: null,
        latitude: 0,
        longitude: 0,
        Cond: null,
        loading: true,
    };
    async componentDidMount() {
     
        navigator.geolocation.getCurrentPosition((position) => {
          const location =  useContext(LocationContext);
            console.log(position);
            let lat = position.coords.latitude
            location.setLat(lat)
            let lng = position.coords.longitude
            location.setLong(lng)
            useContext(LocationContext).setLong(lng)
            this.getWeather(lat,lng);
        });
    }

  
  async getWeather(lat,lng)
  {
    const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=c8f563efec9edd5b35f0b4324f97df52&units=imperial";
      
    const response = await fetch(url);
    const data = await response.json();
    if (data.weather[0].main === "Clear") {
      this.setState({ cond: "CLEAR_DAY" });
    } else if (data.weather[0].maind === "Thunderstorm ") {
      this.setState({ cond: "RAIN" });
    } else if (data.weather[0].main === "Drizzle") {
      this.setState({ cond: "RAIN" });
    } else if (data.weather[0].main === "Rain") {
      this.setState({ cond: "RAIN" });
    } else if (data.weather[0].main === "Snow") {
      this.setState({ cond: "SNOW" });
    } else if (data.weather[0].main === "Clouds") {
      this.setState({ cond: "CLOUDY" });
    }
   
    this.setState({
      weather: data.main,
      city_name: data.name,
      loading: false,
    });
  
  }
  render() {
    if (!this.state.loading) {
  
    }
    return (
      <div>
        {this.state.loading || !this.state.weather ? (
          <div>loading weather</div>
        ) : (
          <div>
          
            <br/>
            <div style = {{fontSize : "30px", paddingBottom: "5px"}}> 
              {this.state.weather.temp | 0}°{" "}
              <ReactAnimatedWeather
                icon={this.state.cond}
                size={25}
                animate={true}
              ></ReactAnimatedWeather>
              
            </div>
          
            <div style = {{fontSize : "12px"}}>
            {this.state.city_name}
            </div>
             
          </div>
        )}
      </div>
    );
  }
}
