import React, { Component } from 'react';
import './Users.scss';
import { Form, Input, Button, Checkbox, Icon, Radio, Segment, Message, Popup, Dropdown, Divider } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { clearUser, clearToken, setCompanyLocations } from '../../../actions';
import { deleteStore } from '../../../store/localStorage';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../api/api';

class InviteUser extends Component {

    state = {
        loading: false,
        loading_teams: false,
        email: '',
        role: 'N',
        company: '',
        errors: [],
        teams: [],
        selected_teams: [],
        locs_errors: [],
        locs_loading: false,
        locations: [],
    }

    componentDidMount() {
        const { company, token } = this.props;
        this.setState({ company: company });

        this.setState({ loading_teams: true });

        // TODO: Needs to add new API here instead of paginated API

        axiosInstance.get('/api/user/teams/list/' + company.id).then(e => {
            this.setState({ loading_teams: false, teams: e.data.teams.data });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading_teams: false });
            }
            if (err.response.status === 401) {
                deleteStore();
                this.props.clearUser();
                this.props.clearToken();
                this.props.history.push('/login');
            }
        });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    }

    selectTeam = team => {
        let { selected_teams } = this.state;
        if (_.filter(selected_teams, item => {
            return item === team.id;
        }).length > 0) {
            _.remove(selected_teams, item => {
                return item === team.id;
            })
        }
        else {
            selected_teams.push(team.id);
        }
        this.setState({ selected_teams });
    }

    handleRoleChange = (e, { value }) => this.setState({ role: value });

    handleLocationsChange = (event, { value }) => {

        let items = value.filter(e => typeof e !== "string");

        this.setState({ locations: items });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(locations)) {
            delete errors[0][locations];
            this.setState({ errors: errors });
        }
    };

    handleCheckboxChange = event => {
        this.setState({ admin: event.target.checked });
    }

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    handlerCustomInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? true : false;
    }

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        axiosInstance.post('/api/user/org/invite', this.state)
            .then(response => {
                this.setState({
                    email: '',
                    role: 'N',
                    errors: [],
                    loading: false
                });
                NotificationManager.success('You has been successfully invited new team member to this Organization!', 'Success');

                this.props.history.goBack();

            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
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

    goBack = event => {
        event.preventDefault();
        this.props.history.goBack();
    }

    handleLocationsAddition = (e, { value }) => {

        this.setState({ locs_errors: [], locs_loading: true });

        axiosInstance.post('/api/user/locations/add-location-on-the-fly', {
            name: value,
        })
            .then(e => {

                this.locationAdded(e.data.location);

                this.setState((prevState) => ({
                    locs_errors: [],
                    locs_loading: false,
                    locations: [e.data.location.id, ...prevState.locations],
                }));

            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ locs_errors: [], locs_loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ locs_errors: this.state.locs_errors.concat(err.response.data.errors), locs_loading: false });
                }
            });
    }

    locationAdded = location => {
        let all_locations = this.props.all_locations;
        all_locations.push(location);
        this.props.setCompanyLocations(all_locations);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { errors, loading, email, role, teams, locations, locs_loading, locs_errors } = this.state;
        const { company, all_locations } = this.props;

        const locationsOptions = _.map(all_locations, (loc, index) => ({
            key: loc.id,
            text: `${loc.name}`,
            value: loc.id,
        }));

        return (
            <React.Fragment>
                <div className="users__row">

                    <div className="row justify-content-md-center">
                        <div className="col-md-12">
                            <Segment piled>

                                <h3>Invite a team member to the Organization </h3>

                                {
                                    /*
                                    <Message color='teal'>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem optio nulla veritatis quos harum</p>
                                    <p>corporis temporibus asperiores necessitatibus ipsum quo blanditiis commodi quibusdam, tenetur numquam perferendis perspiciatis exercitatione</p>
                                </Message>
                                */
                                }

                                <div className="row">
                                    <div className="col-md-6 col-lg-5 col-xm-12">
                                        <Form onSubmit={this.handleSubmit}>
                                            <Form.Field>
                                                <h4>Email</h4>
                                                <Input icon='mail'
                                                    fluid
                                                    iconPosition='left'
                                                    placeholder='e.g. jhonsmith@gmail.com'
                                                    name="email"
                                                    error={this.handlerCustomInputError(errors, 'email')}
                                                    className={this.handlerInputError(errors, 'email')} onChange={this.handleChange}
                                                    value={email}
                                                />

                                            </Form.Field>

                                            {this.displayInputError(errors, 'email')}

                                            <Message >
                                                <Radio
                                                    label='Organization Member'
                                                    name='radioGroup'
                                                    value='N'
                                                    checked={role === 'N'}
                                                    onChange={this.handleRoleChange}
                                                />
                                                &nbsp;
                                                <Popup content='Details about Organization Member' size='tiny' trigger={<Icon circular name='info' />} />
                                            </Message>
                                            <Message>
                                                <Radio
                                                    label='Organization Admin'
                                                    name='radioGroup'
                                                    value='A'
                                                    checked={role === 'A'}
                                                    onChange={this.handleRoleChange}
                                                />
                                                &nbsp;
                                                <Popup content='Details about Organization Admin' size='tiny' trigger={<Icon circular name='info' />} />
                                            </Message>

                                            <h4>Departments <Popup content='Select Departments to add this new user account in.' size='tiny' trigger={<Icon circular name='info' />} /></h4>

                                            {_.map(teams, team => {
                                                return <div key={team.id}><Checkbox value={team.id} onChange={() => { this.selectTeam(team) }} label={team.name} /></div>
                                            })}

                                            <p>Couldn't find preferred department <Link to={`/${company.slug}/settings/add-new-team?redirect=/${company.slug}/settings/invite-user`}>click here to add one.</Link></p>

                                            <h4>Locations <Popup content='Locations' size='tiny' trigger={<Icon circular name='info' />} /></h4>

                                            <Dropdown
                                                clearable
                                                fluid
                                                options={locationsOptions}
                                                search
                                                selection
                                                multiple
                                                onChange={this.handleLocationsChange}
                                                value={locations}
                                                allowAdditions
                                                onAddItem={this.handleLocationsAddition}
                                                disabled={locs_loading}
                                            />
                                            {this.displayInputError(errors, 'locations')}
                                            {this.displayInputError(locs_errors, 'name')}

                                            <Divider></Divider>

                                            <Button disabled={loading} className={loading ? 'loading' : ''} basic size="large" color='blue' type="submit">Invite User</Button>
                                            <Button onClick={this.goBack} basic size="large" color='black'>Cancel</Button>

                                        </Form>
                                    </div>
                                </div>
                            </Segment>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
    all_locations: state.locations.locations
});
export default connect(mapStateToProps, { clearUser, clearToken, setCompanyLocations })(InviteUser);
