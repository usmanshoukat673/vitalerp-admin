import React, { Component } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import { Dropdown, Button, Icon, Modal, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStore } from '../../../store/localStorage';
import { NotificationManager } from 'react-notifications';
import fileSaver from '../../../utils/fileSaver';
import showTZDate from '../../../utils/showTZDate';
import OpenDocument from './OpenDocument';
import { FiEdit } from "react-icons/fi";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { MdAssignmentTurnedIn } from "react-icons/md";
import AssignDocToControls from './AssignDocToControls';
import prettyBytes from 'pretty-bytes';
import { Dropdown as DropdownV2, ButtonGroup } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import axiosInstance from '../../../api/api';
import LoadingBackgrop from '../../LoadingBackgrop';
import '../../file-manager/Document/Document.scss';

class Document extends Component {

    state = {
        deletePrompt: false,
        loading: false,
        errors: [],
        rename: false,
        renaming: false,
        name_changed: false,
        document_name: '',
        open_document: false,
        opening_document: false,
        assign: false,
        move_document: false,
        moving: false,
        target_folder: '',
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

    openDocument = () => {
        this.setState({ open_document: true }, () => {
            this.setState({ opening_document: true });
        });
    };

    onDocumentOpend = () => {
        this.setState({ opening_document: false });
    }

    onCloseDocument = () => {
        this.setState({ open_document: false, opening_document: false });
    }

    onSavedDocumentEdits = document => {
        this.props.saved(document);
    };

    deleteDocument = () => {
        const { document } = this.props;

        this.setState({ loading: true });
        this.handleClose();

        axiosInstance.post(`/api/user/cjfm/delete-document`, {
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

    renameDocument = () => {
        const { document } = this.props;
        this.setState({ document_name: document.name, rename: true });
    }

    cancelRename = () => {
        this.setState({ rename: false });
    }

    saveRenameDocument = () => {
        const { document } = this.props;
        const { document_name } = this.state;

        this.setState({ loading: true, renaming: true, name_changed: false });

        axiosInstance.post(`/api/user/cjfm/rename-document`, {
            document_id: document.enc_id,
            document_name: document_name
        }).then(e => {
            this.setState({ loading: false, renaming: false, rename: false });
            this.props.renamed(e.data.document);
        }).catch(err => {

            if (err.response.status === 422) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false, renaming: false });
                NotificationManager.error(err.response.data.errors.document_name[0], 'Error');
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

    // handle rename from popup
    handleRenamed = document => {
        this.setState({ active_document: document });
        this.props.renamed(document);
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
                NotificationManager.error(err.response.data.errors[0].document_name, 'Error');
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

    handleFolderChange = (event, { value }) => {
        this.setState({ target_folder: value });
        const { errors } = this.state;
        if (errors.length > 0 && errors[0].hasOwnProperty(target_folder)) {
            delete errors[0][target_folder];
            this.setState({ errors: errors });
        }
    }

    handleAssignClose = () => { this.setState({ assign: false }) }

    handleMoveDocument = () => {
        this.setState({ move_document: true });
    }

    handleCancelMoveDocument = () => {
        this.setState({ move_document: false });
    }

    handleMove = () => {
        const { document } = this.props;
        const { target_folder } = this.state;

        this.setState({ moving: true });

        axiosInstance.post(`/api/user/cjfm/move-document`, {
            document_id: document.enc_id,
            target_folder: target_folder
        }).then(e => {
            this.setState({ moving: false, move_document: false });
            this.props.moved(document);
        }).catch(err => {

            if (err.response.status === 422) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), moving: false });
                NotificationManager.error(err.response.data.errors[0].document_name, 'Error');
            }

            if (err.response.status === 500) {
                this.setState({ errors: [], moving: false });
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

        const { document, documents, company, token, standards } = this.props;
        const { loading, rename, document_name, errors, renaming, name_changed, open_document, opening_document, assign, move_document, moving, target_folder } = this.state;


        const docs = _.filter(documents, (doc) => {
            return doc.type === 'folder';
        })

        const folderOptions = _.map(docs, (doc, index) => {
            if (doc.type === 'folder') {
                return {
                    key: doc.id,
                    text: doc.name,
                    value: doc.id,
                };
            }
        });

        return (<React.Fragment>
            <td>
                <div className="cj__document">

                    {loading ? <LoadingBackgrop open={loading} /> : ''}

                    <ArticleIcon onClick={this.openDocument} style={{color: '#2722a1', fontSize: '35px'}} />

                    <div className="cj__document__name">
                        {rename ?
                            <input
                                type="text"
                                autoFocus
                                id="document_name"
                                name="document_name"
                                className={this.handlerInputError(errors, 'document_name')}
                                value={document_name}
                                onChange={this.handleChange}
                            /> : <span onClick={this.openDocument} >{document.name}</span>
                        }
                    </div>
                    {rename ?
                        <React.Fragment>
                            <div className="trigger left">
                                <Button
                                    disabled={renaming || !name_changed}
                                    className={renaming ? 'loading' : ''}
                                    basic color="teal"
                                    onClick={this.saveRenameDocument}
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
                {open_document ? <OpenDocument
                    renamed={this.handleRenamed}
                    standards={standards}
                    open={open_document}
                    document={document}
                    token={token}
                    company={company} 
                    cancle={this.onCloseDocument} 
                    saved={this.onSavedDocumentEdits} 
                    opened={this.onDocumentOpend}
                     /> : ''}
            </td>

            <td>{showTZDate(document.updated_at, company.timezone)}</td>

            <td>{document.size ? prettyBytes(document.size) : ''}</td>
            <td>{ document.owner ? `${document.owner.first_name} ${document.owner.last_name}`: '--'}</td>
            <td>Digital</td>


            <td>
                <ButtonGroup className="d-block">
                <DropdownV2>
                    <DropdownV2.Toggle
                        align="end"
                        className="table-action-btn dropdown-toggle arrow-none btn btn-light btn-xs">
                        <i className="mdi mdi-dots-horizontal"></i>
                    </DropdownV2.Toggle>
                    <DropdownV2.Menu>
                        <DropdownV2.Item onClick={this.openDocument}>
                        <FiEdit className='me-2 vertical-middle' />
                            Open/Edit Document
                        </DropdownV2.Item>
                        <DropdownV2.Item>
                            <i className="mdi mdi-share-variant me-2 text-muted vertical-middle"></i>
                            Share
                        </DropdownV2.Item>
                        <DropdownV2.Item>
                            <i className="mdi mdi-link me-2 text-muted vertical-middle"></i>
                            Get Sharable Link
                        </DropdownV2.Item>
                        <DropdownV2.Item onClick={this.renameDocument}>
                            <i className="mdi mdi-pencil me-2 text-muted vertical-middle"></i>
                            Rename
                        </DropdownV2.Item>
                        <DropdownV2.Item onClick={this.handleAssign}>
                          <MdAssignmentTurnedIn  className='me-2 vertical-middle'  />
                            Assign Controls
                        </DropdownV2.Item>
                        <DropdownV2.Item onClick={this.handleMoveDocument}>
                        <BsBoxArrowInUpRight className='me-2 vertical-middle' />
                            Move to Folder
                        </DropdownV2.Item>
                        <DropdownV2.Item onClick={this.deletePrompt}>
                            <i className="mdi mdi-delete me-2 text-muted vertical-middle"></i>
                            Remove
                        </DropdownV2.Item>
                    </DropdownV2.Menu>
                </DropdownV2>
            </ButtonGroup>

                {assign ? <AssignDocToControls document={document} token={token} company={company} standards={standards} onclose={this.handleAssignClose} /> : ''}
  {/**
                <Popup content='Delete Document Permanently' position='top center' trigger={<IconButton size="small" onClick={this.deletePrompt}>
                    <BsTrash />
                </IconButton>} />
               <Dropdown icon="ellipsis horizontal" className="cj__document__sub__menu">
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.openDocument} icon="file alternate outline" text='Open...' />
                            <Dropdown.Item onClick={this.renameDocument} icon="edit" text='Rename...' />
                            <Dropdown.Item onClick={this.handleAssign} icon="external square alternate" text='Assign' />
                             <Dropdown.Item onClick={this.downloadFolder} icon="cloud download" text='Download' /> */}
                {/** <Dropdown.Divider />
                            <Dropdown.Item onClick={this.deletePrompt} icon='trash' text='Delete Permanently' />
                            <Dropdown.Divider />
                            <p className="document__meta"> <strong>{document.name}</strong></p>
                            <p className="document__meta"> Created By: {`${document.owner.first_name} ${document.owner.last_name}`}</p>
                            <p className="document__meta"> Date: {showTZDate(document.created_at, company.timezone)}</p>
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
                        <h3>Are you sure? you won't be able to recover this document again?</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={this.handleClose} inverted>
                            Cancel
                        </Button>
                        <Button color='green' onClick={this.deleteDocument} inverted>
                            <Icon name='checkmark' /> Yes, Sure
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Modal
                    className="semtic__modal cccc__modal"
                    open={move_document}
                    size="small"
                >
                    <Modal.Header>Move Document ({document.name})</Modal.Header>
                    <Modal.Content style={{ minHeight: '300px' }}>
                        <Form.Group>
                            <Form.Field>
                                <h4>Select Folder:</h4>
                                <Dropdown disabled={moving} placeholder='Folders' onChange={this.handleFolderChange} fluid value={target_folder} search selection options={folderOptions} />
                            </Form.Field>
                        </Form.Group>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button disabled={moving} onClick={this.handleCancelMoveDocument}>
                            Cancel
                        </Button>
                        <Button positive disabled={moving} className={moving ? 'moving' : ''} onClick={this.handleMove}>
                            Move
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
    standards: state.compliance.standards,
});
export default withRouter(connect(mapStateToProps)(Document));
