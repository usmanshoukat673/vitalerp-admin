import React, { Component } from 'react';
import { Button, Modal, Dropdown, Form } from 'semantic-ui-react';
import CloseIcon from '@mui/icons-material/Close';
import './SectionCustodian.scss';
import axiosInstance from '../../api/api';

class SectionCustodian extends Component {

    state = {
        errors: [],
        loading: false,
        custodians: []
    }

    componentDidMount() {
        const { standard, psection } = this.props;

        this.setState({ errors: [], loading: true });

        let sections = _.map(psection.sections, csection => csection.id);

        axiosInstance.post(`/api/user/compliance/section-custodian-info`, {
            standard_id: standard.standard_id,
            sections: sections,
            parent_section_id: psection.id,
        })
            .then(e => {
                this.setState({
                    errors: [],
                    custodians: e.data.custodians,
                    loading: false,
                });
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    }

    handleSubmit = event => {

        event.preventDefault();

        const { company, token, standard, psection, users } = this.props;

        this.setState({ errors: [], loading: true });

        let all_users = _.map(users, us => us.user.id);

        axiosInstance.post(`/api/user/compliance/save-section-custodian-info`, {
            standard_id: standard.standard_id,
            psection: psection,
            custodians: this.state.custodians,
            all_users: all_users,
        })
            .then(e => {

                this.setState({
                    errors: [],
                    loading: false,
                });

                this.props.close();

            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    }

    handleCustodianChange = (event, { value }) => {

        this.setState({ custodians: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(custodians)) {
            delete errors[0][custodians];
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

    closeOwner = () => this.props.close();

    render() {

        const { custodians, errors, loading } = this.state;
        const { open, users, psection } = this.props;

        const userOptions = _.map(users, (us, index) => ({
            key: us.user.id,
            text: `${us.user.first_name} ${us.user.last_name}`,
            value: us.user.id,
        }));

        return (
            <Modal
                className="semtic__modal sectoncustodian__modal"
                onClose={() => { }}
                open={open}
                size="tiny"
            >
                <Modal.Content className="sectoncustodian_modal_container">
                    <div className="sss__header">
                        <div className="__ss__number">
                            {psection.menu_name} Custodian
                        </div>
                        <div className="__ss__close">
                            <CloseIcon onClick={this.closeOwner} />
                        </div>
                    </div>

                    <div className="__ss__main__section">
                        <div className="__custodian__form">
                            <Form>
                                <Form.Field>
                                    <label>Custodian</label>
                                    <Dropdown
                                        className={this.handlerInputError(errors, 'custodians')}
                                        placeholder='Custodians'
                                        onChange={this.handleCustodianChange}
                                        value={custodians}
                                        search
                                        selection
                                        options={userOptions}
                                        fluid
                                        multiple
                                    />
                                    {this.displayInputError(errors, 'custodians')}
                                </Form.Field>

                                <Form.Field>
                                    <Button
                                        fluid
                                        disabled={loading}
                                        className={loading ? '__ap__action loading' : '__ap__action'}
                                        onClick={this.handleSubmit} >
                                        Submit
                                    </Button>
                                </Form.Field>
                            </Form>
                        </div>

                    </div>

                </Modal.Content>

            </Modal>
        );
    }
}

export default SectionCustodian;
