import React, { Component } from 'react';
import { Form, Input, Button, Modal, Dropdown } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import axiosInstance from '../../api/api';

class EditTeam extends Component {
    state = {
        loading: false,
        name: '',
        managed_by: '',
        errors: []
    }

    componentDidMount() {
        const { team } = this.props;
        this.setState({ name: team.name, managed_by: team.managed_by });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    }

    handleMangerChange = (event, { value }) => {
        this.setState({ managed_by: value });
        const { errors } = this.state;
        if (errors.length > 0 && errors[0].hasOwnProperty(managed_by)) {
            delete errors[0][managed_by];
            this.setState({ errors: errors });
        }
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

        const { team } = this.props;
        const { name, managed_by } = this.state;

        axiosInstance.post('/api/user/teams/edit-team', { name: name, team_id: team.id, managed_by: managed_by })
            .then(e => {

                this.setState({
                    name: '',
                    errors: [],
                    loading: false
                });
                NotificationManager.success('Team has been successfully updated!', 'Success');
                this.props.handleSuccessTeamEdit(e.data.team);
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

    handleCloseTeamEdit = () => {
        this.props.handleCloseTeamEdit();
    }

    render() {

        const { errors, loading, name, managed_by } = this.state;

        const { open, company_users } = this.props;


        const userOptions = _.map(company_users, (user_object, index) => ({
            key: user_object.user.id,
            text: `${user_object.user.first_name} ${user_object.user.last_name} (${user_object.user.email})`,
            value: user_object.user.id,
        }));

        return (
            <React.Fragment>

                <div>
                    <Modal
                        open={open}
                        className="semtic__modal"
                        size="small"
                    >
                        <Modal.Header>Rename Team</Modal.Header>
                        <Modal.Content>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <label>Team Name</label>
                                    <Input icon='group'
                                        fluid
                                        iconPosition='left'
                                        placeholder='e.g. Information Technology'
                                        name="name"
                                        error={this.handlerCustomInputError(errors, 'name')}
                                        className={this.handlerInputError(errors, 'name')} onChange={this.handleChange}
                                        value={name}
                                    />

                                    {this.displayInputError(errors, 'name')}
                                </Form.Field>

                                <Form.Field>
                                    <label>Team Manager</label>

                                    <Dropdown
                                        disabled={loading}
                                        clearable
                                        options={userOptions}
                                        search
                                        selection
                                        onChange={this.handleMangerChange}
                                        value={managed_by}
                                        placeholder="Select Manager"
                                    />

                                    {this.displayInputError(errors, 'managed_by')}
                                </Form.Field>
                            </Form>

                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.handleCloseTeamEdit} basic size="large" color='black'>Cancel</Button>

                            <Button disabled={loading} className={loading ? 'loading' : ''} basic size="large" color='blue'
                                type="button" onClick={this.handleSubmit}>Save Changes</Button>

                        </Modal.Actions>
                    </Modal>
                </div>

            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
    company_users: state.orgs.company_users
});
export default connect(mapStateToProps)(EditTeam);
