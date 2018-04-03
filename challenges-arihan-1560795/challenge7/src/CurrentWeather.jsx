import React, { Component } from 'react';

class CurrentWeather extends Component {
    onSave() {
        this.props.onSave(this.props.query);
    }

    render() {
        if (!this.props.name) {
            return null;
        }

        var iconUrl = "https://openweathermap.org/img/w/" + this.props.icon + ".png";

        return (
            <div style={{ marginBottom: "15px" }} id="currentWeather">
                <h2>{this.props.name}</h2>
                <h3 style={{ marginTop: "0" }}>
                    <img src={iconUrl} alt="" />
                    <span>{parseInt(this.props.temp, 10)}˚F </span>
                    <small>{this.props.main} ({this.props.description})</small>
                    <div>
                        <small>High: </small>{parseInt(this.props.maxTemp, 10)}˚F &nbsp;
                        <small>Low: </small>{parseInt(this.props.minTemp, 10)}˚F
                    </div>
                    <small>Sunrise: {new Date(((this.props.sunrise) * 1000)).toLocaleString()}</small><br />
                    <small>Sunset: {new Date(((this.props.sunset) * 1000)).toLocaleString()}</small>
                </h3>
                <button
                    className="btn btn-default"
                    onClick={(e) => this.onSave(e)}
                >
                    Save
                </button>
            </div>
        );
    }
}

export default CurrentWeather;
