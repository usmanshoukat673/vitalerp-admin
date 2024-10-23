import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

const initialState = { loading: false, results: [], value: '', errors: [] };

class SearchBar extends Component {

    state = initialState;

    handleSearchChange = (e, { value }) => {

        console.log(value);
        // this.setState({ loading: true, value });

        // if (this.state.value.length < 1) return this.setState(initialState);

        // this.setState({
        //     loading: false,
        //     errors: [],
        //     results: filteredResults,
        // })
    }

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    render() {

        const { loading, results, value } = this.state;
        // onResultSelect={this.handleResultSelect}
        return (
            <div style={{ marginLeft: '20px' }}>
                <Search
                    category
                    loading={loading}
                    onSearchChange={this.handleSearchChange}
                    results={results}
                    value={value}
                />
            </div>
        );
    }
}

export default SearchBar;
