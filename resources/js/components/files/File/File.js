import React, { Component } from 'react';
import { Image, Modal, Button, Icon } from 'semantic-ui-react';
import './File.scss';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStore } from '../../../store/localStorage';
import fileSaver from '../../../utils/fileSaver';
import showTZDate from '../../../utils/showTZDate';
import { MdAssignmentTurnedIn } from "react-icons/md";
import AssignDocToControls from '../Document/AssignDocToControls';
import prettyBytes from 'pretty-bytes';
import { Dropdown as DropdownV2, ButtonGroup} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import axiosInstance from '../../../api/api';
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
        const { token, company, document } = this.props;

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
            <td>
                <div className="cj__File">
                    {loading ? <LoadingBackgrop open={loading} /> : ''}

                    <Image onClick={this.openFile} style={{height: '35px'}} src={`/images/icons/${document.ext}.png`} />
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


            </td>
            <td>{showTZDate(document.updated_at, company.timezone)}</td>
            <td><span>{document.size ? prettyBytes(document.size) : ''}</span></td>
            <td>{ document.owner ? `${document.owner.first_name} ${document.owner.last_name}`: '--'}</td>
            <td>File</td>


            <td>

            <ButtonGroup className="d-block">
            <DropdownV2>
                <DropdownV2.Toggle
                    align="end"
                    className="table-action-btn dropdown-toggle arrow-none btn btn-light btn-xs">
                    <i className="mdi mdi-dots-horizontal"></i>
                </DropdownV2.Toggle>
                <DropdownV2.Menu>
                    <DropdownV2.Item>
                        <i className="mdi mdi-share-variant me-2 text-muted vertical-middle"></i>
                        Share
                    </DropdownV2.Item>
                    <DropdownV2.Item>
                        <i className="mdi mdi-link me-2 text-muted vertical-middle"></i>
                        Get Sharable Link
                    </DropdownV2.Item>
                    <DropdownV2.Item onClick={this.renameFolder}>
                        <i className="mdi mdi-pencil me-2 text-muted vertical-middle"></i>
                        Rename
                    </DropdownV2.Item>
                    <DropdownV2.Item onClick={this.handleAssign}>
                      <MdAssignmentTurnedIn  className='me-2 vertical-middle'  />
                        Assign Controls
                    </DropdownV2.Item>
                    <DropdownV2.Item onClick={this.downloadFile}>
                        <i className="mdi mdi-download me-2 text-muted vertical-middle"></i>
                        Download File
                    </DropdownV2.Item>
                    <DropdownV2.Item  onClick={this.deletePrompt}>
                        <i className="mdi mdi-delete me-2 text-muted vertical-middle"></i>
                        Remove
                    </DropdownV2.Item>
                </DropdownV2.Menu>
            </DropdownV2>

            </ButtonGroup>

            {assign ? <AssignDocToControls document={document} token={token} company={company} onclose={this.handleAssignClose} /> : ''}

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
        </td>
        </React.Fragment>);
    }
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
});
export default withRouter(connect(mapStateToProps)(File));
