import React, { Component } from 'react';
import _ from 'lodash';
import { Input, Segment, Header, Grid, Image, Pagination } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import MKLeftNav from './MKLeftNav';
import { connect } from 'react-redux';
import { clearMKCategory, selecteApp, closeSubLeftNav, selectControlFunction, selectCatalogSection } from '../../actions';
import ViewApp from './ViewApp';
import AppListSimulation from './AppListSimulation';
import RightDrawer from '../../layouts/RightDrawer';
import axiosInstance from '../../api/api';

const RightSidebar = () => {
    return(
        <div>
            TODO
        </div>
    )
}

class MarketPlace extends Component {

    state = {
        applications: [],
        all_categories: [],
        categories: [],
        selected_category: '',
        current_category: {},
        search_term: '',
        searching: false,
        loading: false,
        view_app: false,
        application: {},
        errors: [],
        activePage: 1,
        totalPages: 0,
    }

    determineCategories = () => {
        const { category } = this.props.match.params;

        if (category === 'all' && this.state.selected_category !== 'all') {
            this.props.clearMKCategory();
            this.setState({ selected_category: 'all', current_category: {}, activePage: 1 }, () => {
                this.getApps();
            });
        }
        else if (category !== 'all' && this.state.selected_category === 'all') {
            this.setState({ selected_category: '', current_category: this.props.category, activePage: 1 }, () => {
                this.getApps();
            });

        }
        else if (category !== 'all' && this.state.current_category.id !== this.props.category.id) {
            this.setState({ selected_category: '', current_category: this.props.category, activePage: 1 }, () => {
                this.getApps();
            });
        }
    }

    componentDidUpdate(prevProps) {
        this.determineCategories();
    };

    componentDidMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (_.isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }
        else {

            const { token } = this.props;
            this.determineCategories();

            this.setState({ loading: true });

            this.props.closeSubLeftNav();
            this.props.selectControlFunction({});
            this.props.selectCatalogSection({});

            axiosInstance.get('/api/user/marketplace/list').then(e => {
                this.setState({ loading: false, categories: e.data.categories, all_categories: e.data.all_categories });
            }).catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 401) {
                    deleteStore();
                    this.props.clearUser();
                    this.props.clearToken();
                    this.props.history.push('/login');
                }
            });
        }
    }

    handleSearch = event => {
        this.setState({ search_term: event.target.value, activePage: 1 });

        if (event.target.value.length >= 3 || event.target.value.length === 0) {

            this.setState({ searching: true });
            const { activePage } = this.state;

            axiosInstance.get(`/api/user/marketplace/apps?page=${activePage}${this.categoryParam('&')}&search=${event.target.value}`).then(e => {
                this.setState({
                    loading: false,
                    applications: e.data.apps.data,
                    searching: false,
                    activePage: e.data.apps.current_page,
                    totalPages: e.data.apps.last_page
                });
            }).catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false, searching: false });
                }
                if (err.response.status === 401) {
                    this.setState({ errors: [], loading: false, searching: false });
                    deleteStore();
                    this.props.clearUser();
                    this.props.clearToken();
                    this.props.history.push('/login');
                }
            });
        }
    }

    categoryParam = (option) => {
        const { category } = this.props;

        if (_.isEmpty(category)) {
            return '';
        }
        else {
            return `&category=${category.id}`;
        }
    }

    getApps = () => {
        const { activePage } = this.state;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/marketplace/apps?page=${activePage}${this.categoryParam('&')}`).then(e => {
            this.setState({
                loading: false,
                applications: e.data.apps.data,
                activePage: e.data.apps.current_page,
                totalPages: e.data.apps.last_page
            });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                deleteStore();
                this.props.clearUser();
                this.props.clearToken();
                this.props.history.push('/login');
            }
        });
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ activePage }, () => this.getApps());
    };

    handleCloseAppView = () => {
        this.setState({ application: {}, view_app: false });
    }

    handleOnInstalled = (redirect, app) => {
        this.props.selecteApp(app);
        this.setState({ view_app: false }, () => {

            this.props.history.push(`/${this.props.company.slug}${redirect}`);
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { search_term, searching, categories, all_categories, applications, loading, view_app, application, activePage, totalPages } = this.state;
        const { company, category, token, leftnav } = this.props;

        return (

            <>
                <div className={leftnav.open_sub ? 'sub__slide__menu_opened marketpalce__module' : 'marketpalce__module'}>

                    <MKLeftNav company={company} categories={categories} token={token} all_categories={all_categories} />

                    <div className="marketplace_wrapper">

                        <div className="page__header">
                            <div className="heading">
                                Marketplace: {_.isEmpty(category) ? 'All Categories' : category.name}
                            </div>
                            <div>
                                <Input className={searching ? 'loading' : ''} onChange={this.handleSearch} icon='search' value={search_term} placeholder='Search...' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12" style={{ margin: '15px 15px 55px 15px' }}>

                                {loading ?
                                    <AppListSimulation /> :

                                    <React.Fragment>
                                        {
                                            _.map(applications, (app, index) => (
                                                <Segment key={`apps-${app.name}-${index}-${app.id}`}>
                                                    <Grid>
                                                        <Grid.Column width={3}>
                                                            <Image size='small' rounded verticalAlign='middle' centered src={app.logo} />
                                                        </Grid.Column>
                                                        <Grid.Column width={10}>
                                                            <Header onClick={() => {
                                                                this.setState({ view_app: true, application: app })
                                                            }} as="h3" style={{ cursor: 'pointer' }}> {app.name}</Header>
                                                            <p>
                                                                {app.description}
                                                            </p>
                                                        </Grid.Column>
                                                    </Grid>
                                                </Segment>
                                            ))
                                        }

                                    </React.Fragment>


                                }

                                {_.isEmpty(applications) ? '' :
                                    <div className="pagination__container">
                                        <Pagination
                                            activePage={activePage}
                                            onPageChange={this.handlePaginationChange}
                                            totalPages={totalPages} />
                                    </div>}


                                {view_app ? <ViewApp onInstalled={this.handleOnInstalled} view_app={view_app} token={token} company={company} application={application} handleCloseAppView={this.handleCloseAppView} /> : ''}
                            </div>
                        </div>

                    </div>

                </div>

                <RightDrawer title="Marketplace" component={<RightSidebar />} />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    category: state.marketplace.category
});


export default connect(mapStateToProps, { clearMKCategory, selecteApp, closeSubLeftNav, selectControlFunction, selectCatalogSection })(MarketPlace);
