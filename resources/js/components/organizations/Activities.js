import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, Message, Divider, Pagination } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { clearUser, clearToken } from '../../actions';
import { deleteStore } from '../../store/localStorage';
import showTZDate from '../../utils/showTZDate';
import axiosInstance from '../../api/api';
import LoadingBackgrop from '../LoadingBackgrop';
import './Organizations.scss';

class Activities extends Component {

    state = {
        loading: false,
        activities: [],
        activePage: 1,
        totalPages: 0,
        search_term: '',
        searching: false,
    }

    componentDidMount() {
        this.loadActivities(1);
    }

    loadActivities = activePage => {
        const { token, company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/org/activites/${company.id}?page=${activePage}`).then(e => {
            this.setState({ loading: false, activities: e.data.activities.data, activePage: e.data.activities.current_page, totalPages: e.data.activities.last_page });
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

    handlePaginationChange = (e, { activePage }) => this.loadActivities(activePage);

    listActivity = activities => {

        const { company } = this.props;

        return _.map(activities, activity => {
            if (activity.type === 'created_usercompanies') {
                return (<Message info key={activity.created_at}>
                    <Message.Header>User Joined</Message.Header>
                    <p>{activity.subject.user.first_name} {activity.subject.user.last_name} ({activity.subject.user.email}) On {showTZDate(activity.created_at, company.timezone)}</p>
                </Message>);
            }
            if (activity.type === 'created_usercomplogs') {
                return (<Message key={activity.created_at}>
                    <Message.Header>User Login</Message.Header>
                    <p>{activity.subject.user.first_name} {activity.subject.user.last_name} ({activity.subject.user.email}) On {showTZDate(activity.created_at, company.timezone)}</p>
                </Message>);
            }
            else {
                return (<Message key={activity.created_at}>
                    <Message.Header>User Invited to Join</Message.Header>
                    <p>{activity.subject.email} On {showTZDate(activity.created_at, company.timezone)}</p>
                </Message>);
            }
        });
    }

    handleSearch = event => {
        this.setState({ search_term: event.target.value, activePage: 1 });

        if (event.target.value.length >= 3 || event.target.value.length === 0) {
            const { company } = this.props;

            this.setState({ searching: true });
            const { activePage } = this.state;

            axiosInstance.get(`/api/user/org/activites/${company.id}?page=${activePage}&search=${event.target.value}`).then(e => {
                this.setState({
                    loading: false,
                    activities: e.data.activities.data,
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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading, activities, activePage, totalPages, search_term, searching } = this.state;

        return (
            <React.Fragment>
                {loading ? <LoadingBackgrop open={loading} /> :
                    <div className="row" style={{ margin: '15px 5px 55px 5px' }}>
                        <div className="col-md-12">
                            <Segment piled style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', 'justifyContent': 'space-between' }}>
                                    <h3>Activities</h3>
                                    {/*  <Input className={searching ? 'loading' : ''} onChange={this.handleSearch} icon='search' value={search_term} placeholder='Search...' /> */}
                                </div>
                                <Divider />

                                {this.listActivity(activities)}

                                <div className="activity__container">
                                    <Pagination
                                        activePage={activePage}
                                        onPageChange={this.handlePaginationChange}
                                        totalPages={totalPages} />
                                </div>

                            </Segment>
                        </div>
                    </div>
                }

            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
});
export default connect(mapStateToProps, { clearUser, clearToken })(Activities);
