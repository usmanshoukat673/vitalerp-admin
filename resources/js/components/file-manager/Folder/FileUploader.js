import React, { Component } from 'react';
import { MdFolder } from 'react-icons/md';
import './FileUploader.scss';
import { connect } from 'react-redux';
import { deleteStore } from '../../../store/localStorage';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import axiosInstance from '../../../api/api';

class FileUploader extends Component {

    state = {
        loading: false,
        errors: [],
        open: true,
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

    uploadFile = () => {
        const { company, document } = this.props;
        const { file } = this.state;

        this.setState({ loading: true });

        const formData = new FormData();

        formData.append('file', file);
        formData.append('comp_id', company.id);
        formData.append('document_id', document.enc_id);

        axiosInstance.post(`/api/user/cjfm/upload-file`, formData).then(e => {
            this.setState({ loading: false });
            this.props.uploaded(e.data.document);
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
            if (err.response.status === 401) {
                deleteStore();
                this.props.clearUser();
                this.props.clearToken();
                this.props.history.push('/login');
            }
        });
    }

    close = () => {
        this.setState({ open: false });
        this.props.cancel();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading, errors, open, file } = this.state;

        return (
            <React.Fragment>

                <Modal dimmer="inverted" open={open} onClose={this.close} className="semtic__modal" size="tiny">
                    <Modal.Header>Select a Document</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <input className={this.handlerInputError(errors, 'file')} name="file" onChange={this.onFileChange} type="file" placeholder='File to Upload' />
                            {this.displayInputError(errors, 'file')}
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                            Cancel
                        </Button>
                        <Button
                            positive
                            icon='cloud upload'
                            labelPosition='right'
                            content="Upload"
                            onClick={this.uploadFile}
                            disabled={!file}
                        />
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );

    }

}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
});
export default withRouter(connect(mapStateToProps)(FileUploader));
