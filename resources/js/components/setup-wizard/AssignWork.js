import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './AssignWork.scss';
import _ from 'lodash';
import { Pagination } from 'semantic-ui-react';
import { setCompanyLocations } from '../../actions';
import ParentSection from './ParentSection';
import axiosInstance from '../../api/api';

class AssignWork extends Component {

    state = {
        errors: [],
        loading: false,
        teams: [],
        add_person: false,
        all_users: [],
        parent_sections: [],
        activePage: '',
        totalPages: '',
    }

    componentDidMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (_.isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }

        this.loadSections(1);
    }

    handlePaginationChange = (e, { activePage }) => this.loadSections(activePage);

    loadSections = activePage => {
        const { token, company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/org/onboarding/assing-work/get-sections/${company.id}?page=${activePage}`).then(e => {
            this.setState({
                loading: false,
                parent_sections: e.data.parent_sections.data,
                activePage: e.data.parent_sections.current_page,
                totalPages: e.data.parent_sections.last_page
            });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.props.clearUser();
                this.props.clearToken();
                this.props.history.push('/login');
            }
        });
    }

    handleGoBack = () => {
        const { company } = this.props;
        this.props.history.push(`/${company.slug}/onboarding/adding-peoples`);
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


    handleSectionInfoChanged = (psection, info) => {
        const { parent_sections } = this.state;
        let index = _.findIndex(parent_sections, sec => {
            return sec.id === psection.id;
        });
        parent_sections[index].custodian_teams = info.custodian_teams;
        parent_sections[index].custodians = info.custodians;
        parent_sections[index].owner_teams = info.owner_teams;
        parent_sections[index].owners = info.owners;

        this.setState({ parent_sections: parent_sections });
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
            all_users, activePage, totalPages, parent_sections
        } = this.state;
        const { company, token, leftnav, user, locations, standard, users } = this.props;
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
                                <div className="step__inactive"><FiCheck /> Manage organization users</div>
                                <div className="step__active"><MdKeyboardArrowRight /> Assign responsibilities</div>
                            </div>
                        </div>
                        <div className="__coorz__setup__step active__step">
                            <div className="__ss__header">
                                Assign responsibilities
                            </div>
                            <div className="__ss__body">

                                {
                                    _.map(parent_sections, psection => {
                                        return (<ParentSection
                                            sectionInfoChanged={this.handleSectionInfoChanged}
                                            company={company}
                                            token={token}
                                            users={users}
                                            key={psection.id}
                                            psection={psection} />)
                                    })
                                }

                                <div className="__section__pagination">
                                    <Pagination
                                        activePage={activePage}
                                        onPageChange={this.handlePaginationChange}
                                        totalPages={totalPages} />
                                </div>

                                <div className="__ss__question__actions">
                                    <div onClick={this.handleGoBack} className="__acctions__button _goback">Go back</div>
                                    <div className="__acctions__button __active" >Finish</div>
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


            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    locations: state.locations.locations,
    users: state.orgs.company_users,
});

export default withRouter(connect(mapStateToProps, { setCompanyLocations })(AssignWork));
