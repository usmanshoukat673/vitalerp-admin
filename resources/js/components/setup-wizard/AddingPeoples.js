import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import './AddingPeoples.scss';
import AddTeamMemeber from './AddTeamMemeber';
import _ from 'lodash';
import { Dimmer, Loader } from 'semantic-ui-react';
import { setCompanyLocations } from '../../actions';
import axiosInstance from '../../api/api';

class AddingPeoples extends Component {

    state = {
        errors: [],
        loading: false,
        teams: [],
        add_person: false,
        all_users: []
    }

    componentDidMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (_.isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }

        // featch teams
        const { company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/teams/all-teams/${company.id}`).then(e => {
            this.setState({
                loading: false,
                teams: e.data.teams,
                errors: []
            })
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
        });

        // get existing users
        this.loadUsers();
    }

    loadUsers = () => {
        const { token, company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/org/onboarding/list-users/execpt-active/${company.id}`).then(e => {
            this.setState({
                loading: false,
                all_users: e.data.users
            });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
        });
    }

    handleGoBack = () => {
        const { company } = this.props;
        this.props.history.push(`/${company.slug}/onboarding/organization-users`);
    }

    handleProceed = () => {
        const { company } = this.props;
        this.props.history.push(`/${company.slug}/onboarding/assign-responsibilities`);
    }

    closeAddPersonModal = () => {
        this.setState({ add_person: false });
    }

    userAdded = user => {
        let all_users = this.state.all_users;
        all_users.push(user);
        this.setState({ all_users: all_users });
        this.setState({ add_person: false });
    }

    locationAdded = location => {
        let locations = this.props.locations;
        locations.push(location);
        this.props.setCompanyLocations(locations);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const {
            loading,
            add_person,
            errors,
            teams,
            all_users
        } = this.state;
        const { company, token, leftnav, user, locations } = this.props;
        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >

                <div className="__coorz">
                    <div className="__coorz__header">
                        Welcome back, {`${user.first_name}`}!
                    </div>
                    <div className="__coorz__sub__header">
                        <div className="__coorz__sub__header__left">
                            Let’s finish setting up your account
                        </div>
                        <div className="__coorz__sub__header__right">
                            <div className="__coorz__cust__progress__label">Your account is 54% complete</div>
                            <div>
                                <div className="__coorz__cust__progress">
                                    <div className="__current__progress" style={{ width: '54%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="__coorz__setup__steps">
                        <div className="__coorz__setup__step step_1">
                            <div className="__ss__header"></div>
                            <div className="__ss__body">
                                <div className="step__inactive"><FiCheck /> Login</div>
                                <div className="step__inactive"><FiCheck /> Confirm your organization</div>
                                <div className="step__active"><MdKeyboardArrowRight /> Manage organization users</div>
                                <div className="step__inactive"><FiCheck /> Assign responsibilities</div>
                            </div>
                        </div>
                        <div className="__coorz__setup__step active__step">
                            <div className="__ss__header">
                                Manage organization users
                            </div>
                            <div className="__ss__body">

                                {
                                    _.isEmpty(all_users) ?
                                        <React.Fragment>
                                            <div className="__ss__question">
                                                Start by adding a team member
                                            </div>
                                            <div className="__ss__question__body">
                                                <div onClick={() => { this.setState({ add_person: true }) }} className="__add__link"> <HiOutlinePlusCircle /> Add Team Member</div>
                                            </div>

                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <div>
                                                {
                                                    _.map(all_users, u => {
                                                        return (
                                                            <div key={u.user_id} className="__user">
                                                                {u.user.email}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div onClick={() => { this.setState({ add_person: true }) }} className="__add__more"> <HiOutlinePlusCircle /> Add More</div>
                                        </React.Fragment>
                                }

                                <div className="__ss__question__actions">
                                    <div onClick={this.handleGoBack} className="__acctions__button _goback">Go back</div>
                                    <div onClick={this.handleProceed} className={_.size(all_users) > 1 ? '__acctions__button __active' : '__acctions__button __inactive'} >Proceed</div>
                                </div>
                            </div>
                        </div>
                        <div className="__coorz__setup__step step__full__blank">
                            <div className="__ss__header"></div>
                            <div className="__ss__body">

                            </div>
                        </div>
                        <div className="__coorz__setup__step step__half_blank">
                            <div className="__ss__header"></div>
                            <div className="__ss__body">

                            </div>
                        </div>
                    </div>

                </div>

                {add_person ? <AddTeamMemeber added={this.userAdded} locationAdded={this.locationAdded} all_locations={locations} open={add_person} company={company} token={token} all_teams={teams} close={this.closeAddPersonModal} /> : ''}

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    locations: state.locations.locations
});

export default withRouter(connect(mapStateToProps, { setCompanyLocations })(AddingPeoples));
