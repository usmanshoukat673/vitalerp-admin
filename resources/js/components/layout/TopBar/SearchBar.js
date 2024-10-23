import React, { Component } from 'react';
import _ from 'lodash';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Search, Form } from 'semantic-ui-react';
import { selectCatalogSection, toggleSubLeftNave, selectStandard, setParentSections, setSearchQuery, setSearchResults } from '../../../actions';
import './SearchBar.scss';
import axiosInstance from '../../../api/api';

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class SearchBar extends Component {

    state = { isLoading: false, results: [], value: '' };

    componentDidMount() {
        const { search } = this.props;
        const { results, query } = search;
        this.setState({ value: query, results: results });
    }

    handleResultSelect = (e, data) => {
        const { result } = data;
        const { company, leftnav, token } = this.props;
        this.setState({ value: result.title });
        this.props.setSearchQuery(result.title);
        this.props.history.push(`/${company.slug}/search`);
    };

    handleEnterKeyEvent = e => {

        if (e.keyCode === ENTER_KEY) {
            const { company, leftnav, token } = this.props;
            this.setState({ isLoading: false, results: [] });
            this.props.history.push(`/${company.slug}/search`);
        }
    }

    handleSearchChange = (e, data) => {

        const { value } = data;

        const { standards } = this.props;

        const stds = _.map(standards, std => (std.standard_id));

        this.setState({ isLoading: true, value: value });
        this.props.setSearchQuery(value);

        // if (value.length < 3) return this.setState(initialState);

        if (value.length < 3) return this.setState({ isLoading: false, results: [] });

        // search to the server
        axiosInstance.post(`/api/user/search/query`, {
            standards: stds,
            query: value
        })
            .then(e => {

                this.setState({
                    isLoading: false,
                    results: e.data.results,
                }, () => {
                    this.props.setSearchResults(e.data.results);
                });

            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                    NotificationManager.error('Server Error, Please contact customer support.', 'Error');
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    }

    render() {
        const { isLoading, value, results } = this.state

        return (
            <div className="cj__search__bar">
                <Search
                    className="cj__search_box"
                    category
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                        leading: true,
                    })}
                    onKeyDown={this.handleEnterKeyEvent}
                    results={results}
                    showNoResults={false}
                    value={value}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    standards: state.compliance.standards,
    search: state.search
});

export default withRouter(connect(mapStateToProps, { selectCatalogSection, toggleSubLeftNave, selectStandard, setParentSections, setSearchQuery, setSearchResults })(SearchBar));
