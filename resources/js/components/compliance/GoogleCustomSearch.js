import React, { Component } from 'react';
import Axios from 'axios';
import _ from 'lodash';
import { Feed, Header, Segment, Placeholder, Pagination } from 'semantic-ui-react';
import './GoogleCustomSearch.scss';

const apiKey = 'AIzaSyCUe-xYvldovvMNy_sAKGNxDks0QUPTS8c';
const cx = '4d04a6bdee2296397';

class GoogleCustomSearch extends Component {

    state = {
        errors: [],
        loading: false,
        results: [],
        total_pages: 10,
        activePage: 1,
        totalPages: 10,
        temp_result: []
    };

    handleSearch = (activePage, query) => {

        this.setState({ loading: true, errors: [] });

        let url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}&start=${activePage}`;

        Axios.get(url)
            .then(e => {
                console.log(e);
                this.setState({
                    results: e.data.items,
                    loading: false, errors: [],
                    totalPages: e.data.queries.request[0].count,
                    activePage: e.data.queries.request[0].startIndex
                });

            }).catch(err => { });
    }

    handlePaginationChange = (e, { activePage }) => this.handleSearch(activePage, this.props.query);

    componentDidMount() {
        this.handleSearch(1, this.props.query);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { errors, loading, results, activePage, totalPages } = this.state;
        const { query } = this.props;

        return (
            <Segment className="custom__search">
                {loading ?
                    <React.Fragment>
                        <Header as="h3">External Results for {query}</Header>
                        <div className="search__feed">
                            <Placeholder>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>

                            </Placeholder>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Header as="h3">External Results for {query}</Header>
                        <Feed className="search__feed">
                            {_.map(results, item => {
                                return (
                                    <Feed.Event key={`search-item${item.cacheId}`}>
                                        <Feed.Content>
                                            <Feed.Summary>
                                                <a href={item.link} target="_blank">{item.title}</a>
                                                <Feed.Date></Feed.Date>
                                            </Feed.Summary>
                                            <Feed.Extra text>
                                                {item.snippet}
                                            </Feed.Extra>
                                            <Feed.Meta>
                                                {item.displayLink}
                                            </Feed.Meta>
                                        </Feed.Content>
                                    </Feed.Event>
                                );
                            })}
                        </Feed>

                        <div className="activity__container">
                            <Pagination
                                activePage={activePage}
                                onPageChange={this.handlePaginationChange}
                                totalPages={totalPages} />
                        </div>
                    </React.Fragment>
                }
            </Segment>
        );
    }
}

export default GoogleCustomSearch;
