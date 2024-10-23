import React, { Component } from 'react';
import _ from 'lodash';
import { Button, List, Pagination, Confirm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { clearUser, clearToken, clearPWDRotation, setCompanyUsers } from '../../actions';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import showTZDate from '../../utils/showTZDate';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import IconButton from '@mui/material/IconButton';
import EditTeam from './EditTeam';
import { withRouter } from 'react-router';
import axiosInstance from '../../api/api';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';
import LoadingBackgrop from '../LoadingBackgrop';

class Teams extends Component {

    state = {
        loading: false,
        teams: [],
        activePage: 1,
        totalPages: 0,
        edit: false,
        team: {},
        remove: false
    }

    componentDidMount() {
        this.loadTeams(1);
    }

    handlePaginationChange = (e, { activePage }) => this.loadTeams(activePage);

    loadTeams = activePage => {
        const { company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/teams/list/${company.id}?page=${activePage}`).then(e => {
            this.setState({
                loading: false,
                teams: e.data.teams.data,
                activePage: e.data.teams.current_page,
                totalPages: e.data.teams.last_page
            });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
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
                this.props.clearUser();
                this.props.clearToken();
                this.props.clearPWDRotation();
                this.props.history.push('/login');
            }
        });
    }

    listTeams = (teams, company) => {
        return (<List divided relaxed verticalAlign='middle'>{_.map(teams, (team, index) => (
            <List.Item key={team.id} className="list__item">
                <div className={index % 2 ? 'initials odd' : 'initials even'} onClick={() => { this.profile(team.enc_id) }} >{this.getInitial(team.name)}</div>

                <List.Content>
                    <List.Header as='a' onClick={() => { this.profile(team.enc_id) }}>
                        {team.name}
                    </List.Header>
                    <List.Description>Manager: {!_.isEmpty(team.manager) ? `${team.manager.first_name} ${team.manager.last_name}` : 'NA'}</List.Description>
                    <List.Description>Created On : {showTZDate(team.created_at, company.timezone)}</List.Description>
                </List.Content>

                <List.Content floated='right'>
                    <IconButton onClick={() => { this.handleEditTeam(team) }} aria-label="Rename" size="medium" color="primary" ><AiFillEdit /></IconButton>
                    <IconButton onClick={() => { this.handleInitRemove(team) }} aria-label="Delete" size="medium" color="secondary" ><AiFillDelete /></IconButton>
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
        this.props.history.push(`/${company.slug}/organization-settings/team-management/${id}`);
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

        const { loading, teams, activePage, totalPages, edit, team, remove } = this.state;
        const { company, leftnav } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''}>

                <div className="departments__mainbd">
                    <div className="departments__breadcrum"><VisitDashboardBreadcrum /> {' > '} Security Settings</div>

                    <div className="departments__header">
                        <div className="__name">Teams</div>
                        <div className="__actions">
                            <Link to={`/${company.slug}/organization-settings/add-new-team?redirect=/${company.slug}/organization-settings/team-management`}><Button basic color="blue">New Team</Button></Link>
                        </div>
                    </div>
                </div>

                <div className="departments__container">
                    {loading ? <LoadingBackgrop open={loading} /> :
                        <div className="teams__row listing_row">


                            {this.listTeams(teams, company)}

                            <div className="activity__container">
                                <Pagination
                                    activePage={activePage}
                                    onPageChange={this.handlePaginationChange}
                                    totalPages={totalPages} />
                            </div>

                            {
                                edit ? <EditTeam
                                    team={team}
                                    open={edit}
                                    handleCloseTeamEdit={this.handleCloseTeamEdit}
                                    handleSuccessTeamEdit={this.handleSuccessTeamEdit} /> : ''
                            }

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
                </div>



            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
    leftnav: state.leftnav,
});
export default withRouter(connect(mapStateToProps, { clearUser, clearToken, clearPWDRotation, setCompanyUsers })(Teams));
