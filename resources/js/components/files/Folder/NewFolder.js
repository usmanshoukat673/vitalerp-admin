import React, { Component } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import './NewFolder.scss';
import { connect } from 'react-redux';
import { deleteStore } from '../../../store/localStorage';
import { Button, Table } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import axiosInstance from '../../../api/api';

class NewFolder extends Component {

    state = {
        folder_name: '',
        loading: false,
        errors: [],
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    };

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'create__input error' : 'create__input';
    };

    cancelCreate = () => {
        this.props.cancle();
    };

    createFolder = () => {
        const { document } = this.props;
        const { folder_name } = this.state;

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/cjfm/create-folder`, {
            document_id: document.enc_id,
            folder_name: folder_name
        }).then(e => {
            this.setState({ loading: false });
            this.props.created(e.data.document);
        }).catch(err => {

            if (err.response.status === 422) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                NotificationManager.error(err.response.data.errors.folder_name[0], 'Error');
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
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { folder_name, loading, errors } = this.state;
        return (
            <React.Fragment>
                <Table.Cell>
                    <div className="cj__new__folder">

                        <FolderIcon style={{color: 'rgb(141 141 141)', fontSize: '35px'}} />

                        <div>
                            <input
                                type="text"
                                autoFocus
                                id="folder_name"
                                name="folder_name"
                                className={this.handlerInputError(errors, 'folder_name')}
                                value={folder_name}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="trigger left">
                            <Button
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                                basic color="teal"
                                onClick={this.createFolder}
                                size='mini'>
                                Create
                            </Button>
                        </div>

                        <div className="trigger right">
                            <Button
                                basic
                                size='mini'
                                onClick={this.cancelCreate}>
                                Cancel
                            </Button>
                        </div>

                    </div>
                </Table.Cell>
                <Table.Cell><span>
                </span></Table.Cell>
                <Table.Cell><span>--</span></Table.Cell>
                <Table.Cell>Folder</Table.Cell>
                <Table.Cell>--</Table.Cell>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
});
export default withRouter(connect(mapStateToProps)(NewFolder));