import React, { Component } from 'react';

class SearchForm extends Component {
    render() {
        return (
            <form className="form-inline" onSubmit={(e) => this.onSearch(e)}>
                <div className="form-group"
                    id="top">
                    <input
                        type="text"
                        className="form-control"
                        ref="query"
                        placeholder="e.g. Seattle, 98115"
                        style={{
                            marginRight: "5px"
                        }}
                    />
                </div>

                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                            marginRight: "5px"
                        }}
                    >
                        Search
                    </button>
                </div>

                {this.props.searchError && (
                    <div className="alert alert-danger" style={{ marginTop: '5px'}} role="alert">{this.props.searchError}</div>
                )}
            </form>
        );
    }

    onSearch(e) {
        e.preventDefault();

        this.props.onSearch(this.refs.query.value);
    }
}

export default SearchForm;
