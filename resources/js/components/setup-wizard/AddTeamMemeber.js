import React, { Component } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Form, Dropdown, Button } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import './AddTeamMemeber.scss';
import axiosInstance from '../../api/api';

class AddTeamMemeber extends Component {

    state = {
        errors: [],
        loading: false,
        email: '',
        teams: [],
        locations: [],
        locs_errors: [],
        locs_loading: false
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ touched: true });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    }

    handleDepartmentChange = (event, { value }) => {

        this.setState({ teams: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(teams)) {
            delete errors[0][teams];
            this.setState({ errors: errors });
        }
    };

    handleLocationsChange = (event, { value }) => {

        let items = value.filter(e => typeof e !== "string");

        this.setState({ locations: items });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(locations)) {
            delete errors[0][locations];
            this.setState({ errors: errors });
        }
    };

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ errors: [], loading: true });

        const { token, company } = this.props;
        const { email, teams, locations } = this.state;

        axiosInstance.post('/api/user/org/onboarding/add-memeber', {
            email: email,
            teams: teams,
            comp_id: company.id,
            company: company,
            locations: locations
        })
            .then(e => {
                this.setState({
                    email: '',
                    errors: [],
                    loading: false
                });

                this.props.added(e.data.user);

                NotificationManager.success('You has been successfully added new team member to this Organization!', 'Success');

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

    handleLocationsAddition = (e, { value }) => {

        this.setState({ locs_errors: [], locs_loading: true });

        axiosInstance.post('/api/user/locations/add-location-on-the-fly', {
            name: value,
        })
            .then(e => {

                this.props.locationAdded(e.data.location);

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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const {
            loading,
            email,
            teams,
            locations,
            errors,
            locs_errors,
            locs_loading

        } = this.state;
        const { all_teams, open, all_locations } = this.props;

        const teamsOptions = _.map(all_teams, (team, index) => ({
            key: team.id,
            text: `${team.name}`,
            value: team.id,
        }));

        const locationsOptions = _.map(all_locations, (loc, index) => ({
            key: loc.id,
            text: `${loc.name}`,
            value: loc.id,
        }));

        return (
            <Modal
                className="semtic__modal add__person__modal"
                onClose={() => { }}
                open={open}
                size="tiny"
            >
                <Modal.Content className="add__person_modal_container">
                    <div className="sss__header">
                        <div className="__ss__number">
                            Add Team Member
                        </div>
                        <div className="__ss__close">
                            <CloseIcon onClick={this.props.close} />
                        </div>
                    </div>

                    <div className="__ap__form">
                        <Form>
                            <Form.Field>
                                <label>Email</label>
                                <Form.Input className={this.handlerInputError(errors, 'email')} onChange={this.handleChange} fluid type='text' name="email" value={email} />
                                {this.displayInputError(errors, 'email')}
                            </Form.Field>
                            <Form.Field>
                                <label>Team(s)</label>
                                <Dropdown
                                    clearable
                                    fluid
                                    options={teamsOptions}
                                    search
                                    selection
                                    multiple
                                    onChange={this.handleDepartmentChange}
                                    value={teams}
                                />
                                {this.displayInputError(errors, 'teams')}
                            </Form.Field>
                            <Form.Field>
                                <label>Locations/Plant/Division/NickName</label>
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
                            </Form.Field>

                            <Form.Field>
                                <Button fluid disabled={loading} className={loading ? '__ap__action loading' : '__ap__action'} onClick={this.handleSubmit} >
                                    Submit
                                </Button>
                            </Form.Field>
                        </Form>
                    </div>
                </Modal.Content>
            </Modal>
        );
    }
}

export default AddTeamMemeber;
