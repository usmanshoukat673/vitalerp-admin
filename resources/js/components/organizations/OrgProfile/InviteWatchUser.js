import React, { Component } from 'react';
import './Users.scss';
import { Form, Input, Button, Checkbox, Icon, Radio, Segment, Message, Popup, Header, Divider } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { clearUser, clearToken } from '../../../actions';
import { deleteStore } from '../../../store/localStorage';
import _ from 'lodash';
import axiosInstance from '../../../api/api';

class InviteWatchUser extends Component {

    state = {
        loading: false,
        email: '',
        role: 'N',
        company: '',
        errors: [],
        users: [],
    }

    componentDidMount() {
        const { company } = this.props;
        this.setState({ company: company });


    }

    loadUsers = () => {
        const { company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/all/org/users/${company.id}`).then(e => {
            this.setState({
                loading: false,
                users: e.data.users,
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

        const { token } = this.props;

        axiosInstance.post('/api/user/org/invite', this.state)
            .then(response => {
                this.setState({
                    email: '',
                    role: 'N',
                    errors: [],
                    loading: false
                });
                NotificationManager.success('You have successfully invited new team member to this Organization!', 'Success');

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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { errors, loading, email, role, users } = this.state;

        return (
            <React.Fragment>
                <div className="users__row">

                    <div className="row justify-content-md-center">
                        <div className="col-md-12">
                            <Segment piled>

                                <h3>Invite a team member to this Organization </h3>

                                <Message color='teal'>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem optio nulla veritatis quos harum</p>
                                    <p>corporis temporibus asperiores necessitatibus ipsum quo blanditiis commodi quibusdam, tenetur numquam perferendis perspiciatis exercitatione</p>
                                </Message>

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

                                                <Dropdown
                                                    disabled={!applicable}
                                                    placeholder='Assets'
                                                    fluid
                                                    search
                                                    selection
                                                    multiple
                                                    onChange={this.handleAssetsChange}
                                                    value={assets}
                                                    options={assetsOptions}
                                                />
                                                {this.displayDDInputError(errors, 'assets')}

                                            </Form.Field>

                                            {this.displayInputError(errors, 'email')}


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
    company: state.orgs.company
});
export default connect(mapStateToProps, { clearUser, clearToken })(InviteWatchUser);
