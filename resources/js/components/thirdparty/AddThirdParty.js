import React, { Component } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Form, Dropdown, Button } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import './AddThirdParty.scss';
import axiosInstance from '../../api/api';

class AddThirdParty extends Component {

    state = {
        errors: [],
        loading: false,
        email: '',
        name: '',
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
        const { name, email } = this.state;

        axiosInstance.post('/api/user/third-party/add-third-party', {
            name: name,
            email: email,
        })
            .then(e => {
                this.setState({
                    email: '',
                    name: '',
                    errors: [],
                    loading: false
                });

                this.props.added(e.data.thirdparty);

                NotificationManager.success('Third Party has been successfully added!', 'Success');

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

    render() {

        const {
            loading,
            email,
            errors,
            name,

        } = this.state;
        const { open } = this.props;

        return (
            <Modal
                className="semtic__modal add__thirdparty__modal"
                onClose={() => { }}
                open={open}
                size="tiny"
            >
                <Modal.Content className="add__thirdparty_modal_container">
                    <div className="sss__header">
                        <div className="__ss__number">
                            Add Third Party
                        </div>
                        <div className="__ss__close">
                            <CloseIcon onClick={this.props.close} />
                        </div>
                    </div>

                    <div className="__ap__form">
                        <Form>
                            <Form.Field>
                                <label>Name<sup>*</sup></label>

                                <Form.Input className={this.handlerInputError(errors, 'name')} onChange={this.handleChange} fluid type='text' name="name" value={name} />
                                {this.displayInputError(errors, 'name')}
                            </Form.Field>


                            <Form.Field>
                                <label>POC Email<sup>*</sup></label>

                                <Form.Input className={this.handlerInputError(errors, 'custodian_company_email')} onChange={this.handleChange} fluid type='text' name="email" value={email} />
                                {this.displayInputError(errors, 'email')}
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

export default AddThirdParty;
