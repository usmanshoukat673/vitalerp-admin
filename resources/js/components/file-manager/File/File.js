import React, { Component } from 'react';
import { Image, Modal, Button, Icon, Table, Popup } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStore } from '../../../store/localStorage';
import fileSaver from '../../../utils/fileSaver';
import showTZDate from '../../../utils/showTZDate';
import IconButton from '@mui/material/IconButton';
import { BiRename } from "react-icons/bi";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { BsTrash, BsCloudDownload } from "react-icons/bs";
import AssignDocToControls from '../Document/AssignDocToControls';
import prettyBytes from 'pretty-bytes';
import { FaTrash } from 'react-icons/fa';
import axiosInstance from '../../../api/api';
import './File.scss';
import LoadingBackgrop from '../../LoadingBackgrop';

class File extends Component {

    state = {
        deletePrompt: false,
        loading: false,
        errors: [],
        rename: false,
        renaming: false,
        name_changed: false,
        folder_name: '',
        assign: false,
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

    deleteFile = () => {
        const { document } = this.props;

        this.setState({ loading: true });
        this.handleClose();

        axiosInstance.post(`/api/user/cjfm/delete-file`, {
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
        const { document } = this.props;
        const { folder_name } = this.state;

        this.setState({ loading: true, renaming: true, name_changed: false });

        axiosInstance.post(`/api/user/cjfm/rename-file`, {
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

    downloadFile = () => {
        const { document } = this.props;

        axiosInstance.get(`/api/user/cjfm/download-file/${document.enc_id}`, {
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

    handleAssign = () => {
        this.setState({ assign: true });
    }

    handleAssignClose = () => { this.setState({ assign: false }) }

    openFile = () => {
        const { document } = this.props;
        if (document.ext === 'pdf') {
            this.props.openpdf(document);
        }

        let msFiles = ['doc', 'docx', 'pptx', 'xlsx', 'xls', 'ppt'];

        if (msFiles.includes(document.ext)) {
            this.props.openmsfile(document);
        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { document, company, token } = this.props;
        const { loading, rename, folder_name, errors, renaming, name_changed, assign } = this.state;

        return (<React.Fragment>
            <Table.Cell>
                <div className="cj__File">
                    {loading ? <LoadingBackgrop open={loading} /> : ''}

                    <Image onClick={this.openFile} src={`/images/icons/${document.ext}.png`} />
                    <div className="cj__file__name">
                        {rename ?
                            <input
                                type="text"
                                autoFocus
                                id="folder_name"
                                name="folder_name"
                                className={this.handlerInputError(errors, 'folder_name')}
                                value={folder_name}
                                onChange={this.handleChange}
                            /> : <span onClick={this.openFile}>{document.name}</span>
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
                </div>


            </Table.Cell>
            <Table.Cell>

                <Popup content='Rename File' position='top center' trigger={<IconButton size="small" onClick={this.renameFolder}>
                    <BiRename />
                </IconButton>} />
                <Popup content='Assign Controls' position='top center' trigger={<IconButton size="small" onClick={this.handleAssign}>
                    <MdAssignmentTurnedIn />
                </IconButton>} />

                {assign ? <AssignDocToControls document={document} token={token} company={company} onclose={this.handleAssignClose} /> : ''}

                <Popup content='Download File' position='top center' trigger={<IconButton size="small" onClick={this.downloadFile}>
                    <BsCloudDownload />
                </IconButton>} />

                <Popup content='Delete File Permanently' position='top center' trigger={<IconButton size="small" onClick={this.deletePrompt}>
                    <BsTrash />
                </IconButton>} />

                {/** <Dropdown icon="ellipsis horizontal" className="cj__file__sub__menu">
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.renameFolder} icon="edit" text='Rename...' />
                            <Dropdown.Item onClick={this.downloadFile} icon="cloud download" text='Download' />
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={this.deletePrompt} icon='trash' text='Delete Permanently' />
                            <Dropdown.Divider />
                            <p className="file__meta"> <strong>{document.name}</strong></p>
                            <p className="file__meta"> Uploaded By: {`${document.owner.first_name} ${document.owner.last_name}`}</p>
                            <p className="file__meta"> Date: {showTZDate(document.created_at, company.timezone)}</p>
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
                        <h3>Are you sure? you won't be able to recover this file again?</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={this.handleClose} inverted>
                            Cancel
                        </Button>
                        <Button color='green' onClick={this.deleteFile} inverted>
                            <Icon name='checkmark' /> Yes, Sure
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Table.Cell>
            <Table.Cell><span>{document.size ? prettyBytes(document.size) : ''}</span></Table.Cell>
            <Table.Cell>File</Table.Cell>
            <Table.Cell>{showTZDate(document.updated_at, company.timezone)}</Table.Cell>
        </React.Fragment>);
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
});
export default withRouter(connect(mapStateToProps)(File));
