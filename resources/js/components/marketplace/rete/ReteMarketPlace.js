import React, { Component } from 'react';
import _ from 'lodash';
import { Input, Header, Popup, Pagination } from 'semantic-ui-react';
import ReteMKLeftNav from './ReteMKLeftNav';
import { connect } from 'react-redux';
import { clearMKCategory, selecteApp, closeSubLeftNav, selectControlFunction, selectCatalogSection } from '../../../actions';
import Moment from 'react-moment';
import { MdOutlineWatchLater } from 'react-icons/md';
import AppListSimulation from './AppListSimulation';
import ViewWorkflow from './ViewWorkflow';
import RightDrawer from '../../../layouts/RightDrawer';
import axiosInstance from '../../../api/api';

const RightSidebar = () => {
    return (
        <div>
            TODO
        </div>
    )
}

class ReteMarketPlace extends Component {

    state = {
        workflows: [],
        selected_categories: [],
        categories: [],
        current_category: {},
        search_term: '',
        selected_category: '',
        searching: false,
        loading: false,
        view_workflow: false,
        workflow: {},
        errors: [],
        activePage: 1,
        totalPages: 0,
    }

    componentDidUpdate(prevProps) {

    };

    componentDidMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (_.isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }
        else {

            this.setState({ loading: true });

            this.props.closeSubLeftNav();
            this.props.selectControlFunction({});
            this.props.selectCatalogSection({});

            axiosInstance.get('/api/user/rete-marketplace/list').then(e => {
                this.setState({ loading: false, categories: e.data.categories });
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

            this.getApps();
        }
    }

    handleSearch = event => {
        this.setState({ search_term: event.target.value, activePage: 1 });

        if (event.target.value.length >= 3 || event.target.value.length === 0) {

            this.setState({ searching: true });
            const { activePage } = this.state;

            axiosInstance.get(`/api/user/rete-marketplace/workflows?page=${activePage}${this.categoryParam('&')}&search=${event.target.value}`).then(e => {
                this.setState({
                    loading: false,
                    workflows: e.data.workflows.data,
                    searching: false,
                    activePage: e.data.workflows.current_page,
                    totalPages: e.data.workflows.last_page
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
        const { selected_categories } = this.state;
        if (_.size(selected_categories) == 0) {
            return '';
        }
        else {
            return `&category=${selected_categories.toString()}`;
        }
    }

    handleCategoryChange = (selected) => {
        this.setState({ selected_categories: selected }, () => {
            this.getApps();
        });
    }

    getApps = () => {
        const { token } = this.props;
        const { activePage } = this.state;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/rete-marketplace/workflows?page=${activePage}${this.categoryParam('&')}`).then(e => {
            this.setState({
                loading: false,
                workflows: e.data.workflows.data,
                activePage: e.data.workflows.current_page,
                totalPages: e.data.workflows.last_page
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

    openWorkflow = workflow => {
        this.setState({ workflow: workflow, view_workflow: true });
    }

    closeWorkflow = () => {
        this.setState({ workflow: {}, view_workflow: false });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { search_term, searching, categories, workflows, loading, view_workflow, workflow, activePage, totalPages, selected_categories } = this.state;
        const { company, token, leftnav } = this.props;

        return (

            <>
                <div className={leftnav.open_sub ? 'sub__slide__menu_opened marketpalce__module' : 'marketpalce__module'}>

                    <ReteMKLeftNav oncategorychange={this.handleCategoryChange} company={company} categories={categories} token={token} />

                    <div className="marketplace_wrapper">

                        <div className="page__header">
                            <div className="heading">
                                Marketplace: {_.size(selected_categories) > 0 ? 'Selected Categories' : 'All Categories'}
                            </div>
                            <div>
                                <Input className={searching ? 'loading' : ''} onChange={this.handleSearch} icon='search' value={search_term} placeholder='Search...' />
                            </div>
                        </div>

                        <div style={{ margin: '15px 15px 55px 15px' }}>

                            {loading ?
                                <AppListSimulation /> :

                                <React.Fragment>
                                    {
                                        _.map(workflows, (workflow, index) => (

                                            <div className='__workflow' key={`${workflow.id}`}>
                                                <div className='__wf__left'>
                                                    <div className='__wf_title'>
                                                        <Header onClick={() => this.openWorkflow(workflow)} as="h3"> {workflow.name}</Header>
                                                    </div>
                                                    <div className='__wf_meta'>
                                                        <span>
                                                            <MdOutlineWatchLater /> <Moment fromNow>{workflow.created_at}</Moment>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='__wf__right'>
                                                    {
                                                        _.map(workflow.nodes, node => {
                                                            if (!_.isEmpty(node.iconData.fileBuffer)) {
                                                                return (
                                                                    <Popup
                                                                        key={node.id}
                                                                        inverted
                                                                        trigger={<img key={node.id} src={node.iconData.fileBuffer} />}
                                                                        content={node.defaults.name}
                                                                        position='top right'
                                                                    />
                                                                )
                                                            }
                                                            // else if(!_.isEmpty(node.iconData))
                                                            // {
                                                            //     return (
                                                            //         <Popup
                                                            //         key={node.id}
                                                            //         inverted
                                                            //         trigger={<span>{node.iconData.icon}</span>}
                                                            //         content={node.defaults.name}
                                                            //         position='top right'
                                                            //         />
                                                            //     )
                                                            // }
                                                            return '';
                                                        })
                                                    }
                                                </div>
                                            </div>


                                        ))
                                    }

                                </React.Fragment>


                            }

                            {_.isEmpty(workflows) ? '' :
                                <div className="pagination__container">
                                    <Pagination
                                        activePage={activePage}
                                        onPageChange={this.handlePaginationChange}
                                        totalPages={totalPages} />
                                </div>}


                            {view_workflow ? <ViewWorkflow open={view_workflow} token={token} company={company} workflow={workflow} close={this.closeWorkflow} /> : ''}
                        </div>

                    </div>

                </div>

                <RightDrawer title="Assets" component={<RightSidebar />} />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    category: state.marketplace.category
});


export default connect(mapStateToProps, { clearMKCategory, selecteApp, closeSubLeftNav, selectControlFunction, selectCatalogSection })(ReteMarketPlace);
