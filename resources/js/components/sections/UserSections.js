import React, { Component } from 'react';
import _ from 'lodash';
import { Segment, List, Divider, Pagination, Confirm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { clearUser, clearToken, clearPWDRotation, setCompanyUsers } from '../../actions';
import { deleteStore } from '../../store/localStorage';
import { NotificationManager } from 'react-notifications';
import axiosInstance from '../../api/api';
import LoadingBackgrop from '../LoadingBackgrop';

class UserSections extends Component {

    state = {
        loading: false,
        sections: [],
        activePage: 1,
        totalPages: 0,
        edit: false,
        team: {},
        remove: false
    }

    componentDidMount() {
        this.loadSections(1);
    }

    handlePaginationChange = (e, { activePage }) => this.loadSections(activePage);

    loadSections = activePage => {
        const { company, standards } = this.props;

        this.setState({ loading: true });

        const all_stds = _.map(standards, (std) => {
            return std.standard_id;
        });

        axiosInstance.post(`/api/user/user-sections/list?page=${activePage}`, {
            standards: all_stds,
        }).then(e => {
            this.setState({
                loading: false,
                sections: e.data.sections.data,
                activePage: e.data.sections.current_page,
                totalPages: e.data.sections.last_page
            });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                deleteStore();
                this.props.clearUser();
                this.props.clearToken();
                this.props.clearPWDRotation();
                this.props.history.push('/login');
            }
        });

        axiosInstance.get(`/api/user/teams/all-users/${company.id}`).then(e => {
            this.props.setCompanyUsers(e.data.users);
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                deleteStore();
                this.props.clearUser();
                this.props.clearToken();
                this.props.clearPWDRotation();
                this.props.history.push('/login');
            }
        });
    }

    listSections = (sections, company) => {
        return (<List divided relaxed verticalAlign='middle'>{_.map(sections, (sec, index) => (
            <List.Item key={sec.id} className="list__item">
                <div className={index % 2 ? 'initials odd' : 'initials even'} onClick={() => { this.profile(sec.id) }} >{this.getInitial(sec.name)}</div>

                <List.Content>
                    <List.Header as='a' onClick={() => { this.profile(sec.id) }}>
                        {`${sec.menu_name} (${sec.standard.expand_name})`}
                    </List.Header>
                </List.Content>

            </List.Item>
        ))}</List>);
    }

    handleEditTeam = team => {
        this.setState({ edit: true, team: team });
    }

    handleCloseTeamEdit = () => {
        this.setState({ edit: false, team: {} });
    }

    handleSuccessTeamEdit = team => {
        const { teams } = this.state;
        let index = _.findIndex(teams, te => {
            return te.id === team.id;
        });
        teams[index] = team;
        this.setState({ teams, edit: false, team: {} });
    }

    getInitial = name => {
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    profile = id => {
        const { company } = this.props;
        this.props.history.push(`/${company.slug}/organization-settings/user-sections/${id}`);
    }

    handleInitRemove = team => this.setState({ remove: true, team: team });

    handleRemoveCancel = () => this.setState({ remove: false, team: {} });

    handleRemoveConfirm = () => {
        this.setState({ errors: [] });

        const { team } = this.state;

        axiosInstance.post('/api/user/teams/remove-team', { team_id: team.id })
            .then(e => {

                const { teams } = this.state;
                _.remove(teams, (t) => {
                    return t.id === team.id;
                });

                this.setState({
                    teams: teams,
                    remove: false,
                    team: {},
                    errors: [],
                });
                NotificationManager.success('Given team has been successfully removed!', 'Success');
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 403) {
                    this.setState({ errors: [], loading: false });
                    NotificationManager.error(err.response.data.message, 'Admin Privileges Required');
                }
                if (err.response.status === 422) {

                    const errors = err.response.data.errors;

                    this.setState({ errors: this.state.errors.concat(errors), loading: false });

                }

                if (err.response.status === 400) {

                    const errors = err.response.data.errors;

                    if (errors.hasOwnProperty('email')) {
                        NotificationManager.warning(errors.email[0], 'Error');
                        this.setState({ loading: false, errors: [] });
                    }
                    else {
                        this.setState({ errors: this.state.errors.concat(errors), loading: false });
                    }

                }
            });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading, sections, activePage, totalPages, edit, team, remove } = this.state;
        const { company } = this.props;

        return (
            <React.Fragment>
                {loading ? <LoadingBackgrop open={loading} /> :
                    <div className="teams__row listing_row">
                        <div className="row">
                            <div className="col-md-12">

                                <Segment piled style={{ marginBottom: '20px' }}>

                                    <div style={{ display: 'flex', 'justifyContent': 'space-between' }}>
                                        <h3>Assign Roles</h3>
                                    </div>

                                    <Divider />

                                    {this.listSections(sections, company)}

                                    <div className="activity__container">
                                        <Pagination
                                            activePage={activePage}
                                            onPageChange={this.handlePaginationChange}
                                            totalPages={totalPages} />
                                    </div>
                                </Segment>

                            </div>
                        </div>

                        {remove ? <Confirm
                            className="semtic__modal"
                            header='Remove Team'
                            content='Are you sure do you want to remove team?'
                            open={remove}
                            onCancel={this.handleRemoveCancel}
                            onConfirm={this.handleRemoveConfirm}
                            confirmButton="Yes, Remove"
                        /> : ''}
                    </div>
                }

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
    standards: state.compliance.standards
});
export default connect(mapStateToProps, { clearUser, clearToken, clearPWDRotation, setCompanyUsers })(UserSections);
