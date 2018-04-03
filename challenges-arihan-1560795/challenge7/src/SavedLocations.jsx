import React, { Component } from 'react';

class SavedLocations extends Component {
    render() {
        if (!this.props.locations.length) {
            return null;
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">My Locations</div>
                <ul className="list-group">
                    {
                        this.props.locations.map((location) => (
                            <li key={location} className="list-group-item">
                                <a
                                    name="top"
                                    onClick={() => this.onClick(location)}
                                >
                                    {location}
                                </a>
                                <a
                                    className="pull-right"
                                    onClick={() => this.onRemove(location)}
                                    name="top"
                                >
                                    Remove
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }

    onClick(location) {
        this.props.onClick(location);
    }

    onRemove(location) {
        this.props.onRemove(location);
    }
}

export default SavedLocations;
