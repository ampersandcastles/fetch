import React from 'react';

const owmKey = '8ff9316d4c7aed9772a404f0f4fd1e41';

type WeatherState = {
  latitude: number | null;
  longitude: number | null;
  apiUrl: string;
  temp: string;
  wind: string;
  humidity: string;
  location: string;
}

class Weather extends React.Component<{}, WeatherState> {
  constructor(props:{}) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      apiUrl: '',
      temp: '',
      wind: '',
      humidity: '',
      location: '',
    }
	}

  findCurrentLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${owmKey}&units=imperial`

      this.setState({
        latitude,
        longitude,
        apiUrl
      });

    });
  };

  
  componentDidMount() {
    this.findCurrentLocation();
  }

  async componentDidUpdate(prevProps: {}, prevState: WeatherState) {
    if (this.state.apiUrl !== prevState.apiUrl) {
      await fetch(this.state.apiUrl)
        .then(res => res.json())
        .then(data => {
          this.setState({
            temp: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            location: data.name
          })
        })

    }
  }

  render() {
    return (
      <div>
        <p>Your latitude: {this.state.latitude}</p>
        <p>Your longitude: {this.state.longitude}</p>
        <p>Your current location: {this.state.location}</p>
        <p>The current temperature is {this.state.temp}°F.</p>
        <p>The current wind speed is {this.state.wind} mph.</p>
        <p>The current humidity is {this.state.humidity}.</p>
      </div>
    )
  }
};

export default Weather;