import React, { Component } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import './Folder.scss';
import { Button, Icon, Modal, Table, Popup } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStore } from '../../../store/localStorage';
import { NotificationManager } from 'react-notifications';
import fileSaver from '../../../utils/fileSaver';
import showTZDate from '../../../utils/showTZDate';
import IconButton from '@mui/material/IconButton';
import { BiRename } from "react-icons/bi";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { BsTrash, BsCloudDownload } from "react-icons/bs";
import { FaTrash } from 'react-icons/fa';
import axiosInstance from '../../../api/api';
import LoadingBackgrop from '../../LoadingBackgrop';

class Folder extends Component {

    state = {
        deletePrompt: false,
        loading: false,
        errors: [],
        rename: false,
        renaming: false,
        name_changed: false,
        folder_name: ''
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ name_changed: true });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    };

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'create__input error' : 'create__input';
    };

    deletePrompt = () => this.setState({ deletePrompt: true });

    handleClose = () => this.setState({ deletePrompt: false });

    openFolder = () => {
        const { document } = this.props;
        this.props.open(document);
    };

    deleteFolder = () => {
        const { document } = this.props;

        this.setState({ loading: true });
        this.handleClose();

        axiosInstance.post(`/api/user/cjfm/delete-folder`, {
            document_id: document.enc_id,
        }).then(e => {
            this.setState({ loading: false });
            this.props.delete(document);
        }).catch(err => {

            if (err.response.status === 422 || err.response.status === 404) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                NotificationManager.error(err.response.data.errors[0].document, 'Error');
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

    renameFolder = () => {
        const { document } = this.props;
        this.setState({ folder_name: document.name, rename: true });
    }

    cancelRename = () => {
        this.setState({ rename: false });
    }

    saveRenameFolder = () => {
        const { token, company, document } = this.props;
        const { folder_name } = this.state;

        this.setState({ loading: true, renaming: true, name_changed: false });

        axiosInstance.post(`/api/user/cjfm/rename-folder`, {
            document_id: document.enc_id,
            folder_name: folder_name
        }).then(e => {
            this.setState({ loading: false, renaming: false, rename: false });
            this.props.renamed(e.data.document);
        }).catch(err => {

            if (err.response.status === 422) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false, renaming: false });
                NotificationManager.error(err.response.data.errors[0].folder_name, 'Error');
            }

            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false, renaming: false });
            }
            if (err.response.status === 401) {
                deleteStore();
                this.props.clearUser();
                this.props.clearToken();
                this.props.history.push('/login');
            }
        });
    }

    downloadFolder = () => {
        const { document } = this.props;

        axiosInstance.get(`/api/user/cjfm/download-folder/${document.enc_id}`, {
            responseType: "blob"
        }).then(e => {

            fileSaver(e.data, document.name);

        }).catch(err => {
            if (err.response.status === 422) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                NotificationManager.error(err.response.data.errors[0].folder_name, 'Error');
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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { document, company } = this.props;
        const { loading, rename, folder_name, errors, renaming, name_changed } = this.state;

        return (<React.Fragment>
            <Table.Cell><div className="cj__folder">
                {loading ? <LoadingBackgrop open={loading} /> : ''}

                <FolderIcon style={{color: 'rgb(141 141 141)', fontSize: '35px'}} onClick={this.openFolder} />
                <div className="cj__folder__name">
                    {rename ?
                        <input
                            type="text"
                            autoFocus
                            id="folder_name"
                            name="folder_name"
                            className={this.handlerInputError(errors, 'folder_name')}
                            value={folder_name}
                            onChange={this.handleChange}
                        /> : <span onClick={this.openFolder} >{document.name}</span>
                    }
                </div>
                {rename ?
                    <React.Fragment>
                        <div className="trigger left">
                            <Button
                                disabled={renaming || !name_changed}
                                className={renaming ? 'loading' : ''}
                                basic color="teal"
                                onClick={this.saveRenameFolder}
                                size='mini'>
                                Save
                            </Button>
                        </div>
                        <div className="trigger right">
                            <Button
                                basic
                                size='mini'
                                onClick={this.cancelRename}>
                                Cancel
                            </Button>
                        </div>
                    </React.Fragment>
                    : ''}
            </div></Table.Cell>
            <Table.Cell>

                <Popup content='Open Folder' position='top center' trigger={<IconButton size="small" onClick={this.openFolder}>
                    <AiOutlineFolderOpen />
                </IconButton>} />

                <Popup content='Rename Folder' position='top center' trigger={<IconButton size="small" onClick={this.renameFolder}>
                    <BiRename />
                </IconButton>} />
                <Popup content='Download Folder' position='top center' trigger={<IconButton size="small" onClick={this.downloadFolder}>
                    <BsCloudDownload />
                </IconButton>} />

                <Popup content='Delete Folder Permanently' position='top center' trigger={<IconButton size="small" onClick={this.deletePrompt}>
                    <BsTrash />
                </IconButton>} />

                {/** <Dropdown icon="ellipsis horizontal" className="cj__folder__sub__menu">
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.openFolder} icon="folder open" text='Open...' />
                            <Dropdown.Item onClick={this.renameFolder} icon="edit" text='Rename...' />
                            <Dropdown.Item onClick={this.downloadFolder} icon="cloud download" text='Download' />
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={this.deletePrompt} icon='trash' text='Delete Permanently' />
                            <Dropdown.Divider />
                            <p className="folder__meta"> <strong>{document.name}</strong></p>
                            <p className="folder__meta"> Created By: {`${document.owner.first_name} ${document.owner.last_name}`}</p>
                            <p className="folder__meta"> Date: {showTZDate(document.created_at, company.timezone)}</p>
                            <br></br>
                        </Dropdown.Menu>
                    </Dropdown> */}
                <Modal
                    open={this.state.deletePrompt}
                    onClose={this.handleClose}
                    size='small'
                    className="semtic__modal cccc__modal"
                >
                    <Modal.Header><FaTrash /> Delete Permanently</Modal.Header>
                    <Modal.Content>
                        <h3>Are you sure? you won't be able to recover this folder again?</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={this.handleClose} inverted>
                            Cancel
                        </Button>
                        <Button color='green' onClick={this.deleteFolder} inverted>
                            <Icon name='checkmark' /> Yes, Sure
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Table.Cell>
            <Table.Cell><span>--</span></Table.Cell>
            <Table.Cell>Folder</Table.Cell>
            <Table.Cell>{showTZDate(document.updated_at, company.timezone)}</Table.Cell>
        </React.Fragment>);
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
});
export default withRouter(connect(mapStateToProps)(Folder));
