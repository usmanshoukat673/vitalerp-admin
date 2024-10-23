import React, { Component } from 'react';
import { Header, Tab, Checkbox, Feed } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeSubLeftNav, selectControlFunction, selectCatalogSection, setCompStandards } from '../../actions';
import _ from 'lodash';
import './SearchLanding.scss';
import Searching from './Searching';
import axiosInstance from '../../api/api';


class SearchLanding extends Component {

    state = {
        errors: [],
        loading: false,
        apps: [],
        query: '',
        results: []
    }

    componentDidMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (_.isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }
        else {
            this.props.closeSubLeftNav();
        }
        this.setState({ query: this.props.search.query });
        this.runCustomQuery();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.search.query !== this.state.query) {
            this.setState({ query: nextProps.search.query });
            if (nextProps.search.query.length > 3) {
                this.runCustomQuery();
            }
        }
    }

    runCustomQuery = () => {
        this.setState({ loading: true });

        const { search, standards} = this.props;

        const all_stds = _.filter(standards, (std) => {
            return std.selected === true;
        });

        const stds = _.map(all_stds, std => (std.standard_id));

        axiosInstance.post(`/api/user/search/custom-query`, {
            standards: stds,
            query: search.query
        })
            .then(e => {

                this.setState({
                    loading: false,
                    results: e.data.results,
                });

            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    }

    listSections = sections => {
        return (<div className="the__results">

            <Feed className="search__feed">
                {_.map(sections, sec => {
                    return (
                        <Feed.Event key={`search-item${sec.id}`}>
                            <Feed.Content>
                                <Feed.Summary>
                                    <a href="#">{sec.section.name}</a>
                                    <Feed.Date></Feed.Date>
                                </Feed.Summary>
                                <Feed.Extra text>
                                    {sec.section.description}
                                </Feed.Extra>
                                <Feed.Meta>
                                    Section ({sec.standard_name})
                                </Feed.Meta>
                            </Feed.Content>
                        </Feed.Event>
                    );
                })}
            </Feed>

        </div>)
            ;
    }

    listControls = controls => {
        return (<div className="the__results">

            <Feed className="search__feed">
                {_.map(controls, ctrl => {
                    return (
                        <Feed.Event key={`search-ctrl-item${ctrl.id}`}>
                            <Feed.Content>
                                <Feed.Summary>
                                    <a href="#">{ctrl.control.name}</a>
                                    <Feed.Date></Feed.Date>
                                </Feed.Summary>
                                <Feed.Extra text>
                                    {ctrl.description}
                                </Feed.Extra>
                                <Feed.Meta>
                                    Control ({ctrl.control.standard.name})
                                </Feed.Meta>
                            </Feed.Content>
                        </Feed.Event>
                    );
                })}
            </Feed>

        </div>)
            ;
    }

    listDocuments = documents => {
        return (<div className="the__results">
            <Feed className="search__feed">
                {_.map(documents, doc => {
                    return (
                        <Feed.Event key={`search-doc-item${doc.id}`}>
                            <Feed.Content>
                                <Feed.Summary>
                                    <a href="#">{doc.title}</a>
                                    <Feed.Date></Feed.Date>
                                </Feed.Summary>
                                <Feed.Extra text>

                                </Feed.Extra>
                                <Feed.Meta>
                                    Digital Document
                                </Feed.Meta>
                            </Feed.Content>
                        </Feed.Event>
                    );
                })}
            </Feed>
        </div>)
            ;
    }

    toggleStandard = standard => {
        const { standards } = this.props;
        let index = _.findIndex(standards, std => {
            return std.standard_id === standard.standard_id;
        });
        standard.selected = !standard.selected;
        standards[index] = standard;
        this.props.setCompStandards(standards);
        this.runCustomQuery();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading, results } = this.state;
        const { search, leftnav, standards } = this.props;
        const { query } = search;

        const panes = [
            {
                menuItem: 'All',
                render: () => <Tab.Pane attached={false}>
                    {loading ? <Searching /> : ''}
                    {(results.sections ? this.listSections(results.sections.results) : '')}
                    {(results.controls ? this.listControls(results.controls.results) : '')}
                    {(results.documents ? this.listDocuments(results.documents.results) : '')}
                </Tab.Pane>,
            },
            {
                menuItem: 'Sections',
                render: () => <Tab.Pane attached={false}>
                    {loading ? <Searching /> : ''}
                    {(results.sections ? this.listSections(results.sections.results) : '')}
                </Tab.Pane>,
            },
            {
                menuItem: 'Controls',
                render: () => <Tab.Pane attached={false}>
                    {loading ? <Searching /> : ''}
                    {(results.controls ? this.listControls(results.controls.results) : '')}
                </Tab.Pane>,
            },
            {
                menuItem: 'Documents',
                render: () => <Tab.Pane attached={false}>
                    {loading ? <Searching /> : ''}
                    {(results.documents ? this.listDocuments(results.documents.results) : '')}
                </Tab.Pane>,
            },
        ]

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >
                <div className="page__header">
                    <div className="heading">
                        Search Result
                    </div>
                    <div>
                        <div>
                            {
                                _.map(standards, std => {
                                    return (
                                        <Checkbox onChange={() => { this.toggleStandard(std) }} checked={std.selected} style={{ marginRight: '10px', marginTop: '10px' }} key={std.standard_id} label={std.standard.expand_name} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="search__results">

                    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    search: state.search,
    standards: state.compliance.standards,
});

export default connect(mapStateToProps, { closeSubLeftNav, selectControlFunction, selectCatalogSection, setCompStandards })(SearchLanding);
