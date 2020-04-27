import React, { Component } from "react";
import "../styles/NavMenu.css";
import ReactAnimatedWeather from "react-animated-weather";

export default class Weather extends Component {
  state = {
    weather: null,
    city_name: null,
    latitude: null,
    longitude: null,
    Cond: null,
    loading: true,
  };
  async componentDidMount() {
    const url =
      " https://api.openweathermap.org/data/2.5/weather?q=Spokane&appid=c8f563efec9edd5b35f0b4324f97df52&units=imperial";
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({
      cond: data.weather[0].main,
      weather: data.main,
      city_name: data.name,
      loading: false,
    });

    console.log(this.state.cond);
  }

  render() {
    if (!this.state.loading) {
      if (this.state.cond === "Clear") {
        this.setState({ cond: "CLEAR_DAY" });
      } else if (this.state.cond === "Thunderstorm ") {
        this.setState({ cond: "RAIN" });
      } else if (this.state.cond === "Drizzle") {
        this.setState({ cond: "RAIN" });
      } else if (this.state.cond === "Rain") {
        this.setState({ cond: "RAIN" });
      } else if (this.state.cond === "Snow") {
        this.setState({ cond: "SNOW" });
      } else if (this.state.cond === "Clouds") {
        this.setState({ cond: "CLOUDY" });
      }
    }
    return (
      <div>
        {this.state.loading || !this.state.weather ? (
          <div>loading weather</div>
        ) : (
          <div>
            Weather in {this.state.city_name} : {this.state.weather.temp}°{" "}
            <ReactAnimatedWeather
              icon={this.state.cond}
              size={32}
              animate={true}
            ></ReactAnimatedWeather>
          </div>
        )}
      </div>
    );
  }
}
