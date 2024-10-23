import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Modal, Button, Form } from 'semantic-ui-react';
import './UploadArtifact.scss';
import axiosInstance from '../../api/api';

class UploadArtifact extends Component {

    state = {
        loading: false,
        errors: [],
        file: null
    };

    onFileChange = event => {
        this.setState({ file: event.target.files[0] });
        this.setState({ errors: [] });
    };

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'file_input error' : 'file_input';
    };


    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleSubmit = () => {
        const { company, control } = this.props;
        const { file } = this.state;

        this.setState({ loading: true });

        const formData = new FormData();

        formData.append('file', file);
        formData.append('comp_id', company.id);
        formData.append('document_id', company.document.id);
        formData.append('control_id', control.id);
        formData.append('standard_id', control.standard_id);
        formData.append('standard_section_id', control.standard_section_id);

        axiosInstance.post(`/api/user/compliance/upload-artifacts`, formData).then(e => {
            this.setState({ loading: false });
            // load artifacts if needed
            this.props.uploaded(e.data.section_documents, e.data.artifacts);
            NotificationManager.success(e.data.message, 'Success');
        }).catch(err => {

            if (err.response.status === 404) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                NotificationManager.error(err.response.data.errors[0].file, 'Error');
            }

            if (err.response.status === 422) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
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
        const { loading, errors, file } = this.state;

        return (
            <Modal
                open={open}
                className="semtic__modal cccc__modal"
                size="small"
            >
                <Modal.Header>Upload Document</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <input className={this.handlerInputError(errors, 'file')} name="file" onChange={this.onFileChange} type="file" placeholder='File to Upload' />
                            {this.displayInputError(errors, 'file')}
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => { this.props.close() }}>
                        Cancel
                    </Button>
                    <Button
                        positive
                        icon='cloud upload'
                        labelPosition='right'
                        content="Upload"
                        onClick={this.handleSubmit}
                        disabled={!file}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default UploadArtifact;
