import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Modal, Button, Form, Input, Dropdown } from 'semantic-ui-react';
import './LinkArtifact.scss';
import axiosInstance from '../../api/api';

class LinkArtifact extends Component {

    state = {
        errors: [],
        loading: false,
        all_documents: [],
        documents: []
    }

    componentDidMount() {
        this.setState({ loading: true });
        axiosInstance.post(`/api/user/compliance/documents/to/link`).then(e => {
            this.setState({ loading: false, all_documents: e.data.documents });
        }).catch(err => {

            if (err.response.status === 404) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                NotificationManager.error(err.response.data.errors[0].file, 'Error');
            }

            if (err.response.status === 422) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
            }

            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
        });
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

    handleDocumentChange = (event, { value }) => {
        this.setState({ documents: value });
        const { errors } = this.state;
        if (errors.length > 0 && errors[0].hasOwnProperty(documents)) {
            delete errors[0][documents];
            this.setState({ errors: errors });
        }
    }

    handleSubmit = () => {
        const { control } = this.props;
        const { documents } = this.state;

        this.setState({ loading: true });
        axiosInstance.post(`/api/user/compliance/link/documents`, {
            control_id: control.id,
            standard_id: control.standard_id,
            standard_section_id: control.standard_section_id,
            documents: documents,
        }).then(e => {
            this.setState({ loading: false });
            this.props.linked(e.data.section_documents, e.data.artifacts);
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 422) {
                const errors = err.response.data.errors;
                this.setState({ errors: this.state.errors.concat(errors), loading: false });
            }
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { open } = this.props;
        const { loading, errors, all_documents, documents } = this.state;

        const docsOptions = _.map(all_documents, (doc, index) => ({
            key: doc.id,
            text: `${doc.name}`,
            value: doc.id,
        }));


        return (
            <Modal
                open={open}
                className="semtic__modal cccc__modal"
                size="small"
            >
                <Modal.Header>Link Documents</Modal.Header>
                <Modal.Content scrolling className="link__artifacts">
                    <Form>
                        <Form.Field>
                            <Dropdown
                                disabled={loading}
                                clearable
                                options={docsOptions}
                                search
                                selection
                                multiple
                                onChange={this.handleDocumentChange}
                                value={documents}
                                placeholder="Select Documents"
                            />
                            {this.displayInputError(errors, 'documents')}
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => { this.props.close() }}>Cancel</Button>
                    <Button disabled={loading} className={loading ? 'loading' : ''} onClick={this.handleSubmit} positive>
                        Submit
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default LinkArtifact;
