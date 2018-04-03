import React, { Component } from 'react';
import SearchForm from './SearchForm';
import CurrentWeather from './CurrentWeather';
import SavedLocations from './SavedLocations';
import './App.css';

var OPEN_WEATHER_KEY = '0b8b5bb97a281d7f10bf9e4ecd2587bc';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: []
        };
    }

    componentDidMount() {
        var saved = JSON.parse(localStorage.getItem('savedLocations'));

        if (saved && saved.length) {
            this.setState({
                saved: saved
            });
            this.fetchWeather(saved[0]);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="page-header">
                    <h1>React Weather</h1>
                </div>
                <div className="row">
                    <div className="col col-sm-6">
                        <SearchForm
                            onSearch={(e) => this.searchWeather(e)}
                            searchError={this.state.searchError}
                        />

                        <CurrentWeather
                            main={this.state.main}
                            description={this.state.description}
                            icon={this.state.icon}
                            name={this.state.name}
                            query={this.state.query}
                            temp={this.state.temp}
                            maxTemp={this.state.maxTemp}
                            minTemp={this.state.minTemp}
                            sunrise={this.state.sunrise}
                            sunset={this.state.sunset}
                            saved={this.state.saved.includes(this.state.query)}
                            onSave={(query) => this.onSave(query)}
                            onRemove={(query) => this.onRemove(query)}
                        />
                    </div>

                    <div className="col col-sm-6">
                        <SavedLocations
                            locations={this.state.saved}
                            onClick={(location) => this.fetchWeather(location)}
                            onRemove={(location) => this.onRemove(location)}
                        />
                    </div>
                </div>

            </div>
        );
    }

    onSave(query) {
        var saved = this.state.saved;

        if (!saved.includes(query)) {
            saved.push(query);

            this.updateSaved(saved);
        }
    }

    onRemove(query) {
        var saved = this.state.saved;

        var newSaved = saved.filter((location) => location !== query);

        this.updateSaved(newSaved);
    }

    updateSaved(saved) {
        this.setState({
            saved: saved
        });

        localStorage.setItem('savedLocations', JSON.stringify(saved));
    }

    searchWeather(query) {
        this.fetchWeather(query);
    }

    fetchWeather(query) {
        var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&appid=' + OPEN_WEATHER_KEY;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                var weather = json.weather[0];

                this.setState({
                    temp: json.main.temp,
                    maxTemp: json.main.temp_max,
                    minTemp: json.main.temp_min,
                    sunrise: json.sys.sunrise,
                    sunset: json.sys.sunset,
                    main: weather.main,
                    description: weather.description,
                    icon: weather.icon,
                    name: json.name,
                    query: query,
                    searchError: null
                });
            })
            .catch((error) => {
                if (String(error) === "TypeError: Failed to fetch") {
                    this.setState({
                        name: null,
                        searchError: "No connection."
                    });
                } else {
                    this.setState({
                        name: null,
                        searchError: "Invalid/ No data for location."
                    });
                }
            });
    }
}

export default App;
