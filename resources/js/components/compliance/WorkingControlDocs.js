import React, { Component } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import showTZDate from '../../utils/showTZDate';
import prettyBytes from 'pretty-bytes';
import { Image, Popup, Icon, Button, Modal, Header } from 'semantic-ui-react';
import IconButton from '@mui/material/IconButton';
import { MdAssignmentTurnedIn } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import _ from 'lodash';
import { NotificationManager } from 'react-notifications';
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import RenameDocument from '../files/Options/RenameDocument';
import axiosInstance from '../../api/api';

class WorkingControlDocs extends Component {

    state = {
        loading: false,
        errors: [],
        rename: false,
        name_changed: false,
        deletePrompt: false,
    }

    displayDocName = documentName => {
        return <div className="doc__name">{
            _.truncate(documentName, {
                'length': 30,
                'separator': ' '
            })
        }</div>;
    }

    renameDocument = () => {
        this.setState({ rename: true });
    }

    cancelRename = () => {
        this.setState({ rename: false });
    }

    handleRenamed = document => {
        this.setState({ rename: false });
        this.props.renamed(document);
    }

    renameInput = () => {
        const { art, token, company } = this.props;
        return <RenameDocument document={art.document} token={token} company={company} cancel={this.cancelRename} renamed={this.handleRenamed} />
    };

    optionButtons = () => {
        return <React.Fragment>
            <Popup content='Rename Document' position='top center' trigger={<IconButton size="small" onClick={this.renameDocument}>
                <BiRename />
            </IconButton>} />

            <Popup content='Assign Controls' position='top center' trigger={<IconButton size="small" onClick={() => { this.props.handleAssign(this.props.art.document) }}>
                <MdAssignmentTurnedIn />
            </IconButton>} />
            <Popup content='Delete Document/File' position='top center' trigger={<IconButton size="small" onClick={this.deletePrompt}>
                <BsTrash />
            </IconButton>} />
            {this.deleteModal()}
        </React.Fragment>;
    }

    deletePrompt = () => this.setState({ deletePrompt: true });
    handleClose = () => this.setState({ deletePrompt: false });

    deleteDocument = () => {
        const { art } = this.props;

        this.setState({ loading: true });
        this.handleClose();

        axiosInstance.post(`/api/user/cjfm/delete-file`, {
            document_id: art.document.enc_id,
        }).then(e => {
            this.setState({ loading: false });
            this.props.deleted(art.document);
        }).catch(err => {

            if (err.response.status === 422 || err.response.status === 404) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                NotificationManager.error(err.response.data.errors[0].document, 'Error');
            }

            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
        });
    };

    unassignedFromControl = () => {
        const { art } = this.props;

        this.setState({ loading: true });
        this.handleClose();

        axiosInstance.post(`/api/user/compliance/unassign-document`, {
            document_id: art.document.enc_id,
        }).then(e => {
            this.setState({ loading: false });
            this.props.deleted(art.document);
        }).catch(err => {

            if (err.response.status === 422 || err.response.status === 404) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                NotificationManager.error(err.response.data.errors[0].document, 'Error');
            }

            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
        });
    };

    deleteModal = () => {
        return (
            <Modal
                open={this.state.deletePrompt}
                onClose={this.handleClose}
                size='small'
                className="semtic__modal"
            >
                <Header icon='trash' content='Delete Document' />
                <Modal.Content className="cc_modal_container">
                    <h3>Are you sure?</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='grey' onClick={this.handleClose} >
                        Cancel
                    </Button>
                    <Button color='green' onClick={this.unassignedFromControl} inverted>
                        <Icon name='checkmark' /> Unassigned from Control
                    </Button>
                    <Button color='red' onClick={this.deleteDocument} inverted>
                        <Icon name='checkmark' /> Delete Permanently
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }

    render() {
        const { art, openDocument, openPDFDocument, openMSDocument, company } = this.props;

        const { rename, loading, errors, deletePrompt } = this.state;

        if (art.document.type === 'document') {
            return (<TableRow key={art.document_id}>
                <TableCell component="th" scope="row" align="left">
                    {rename ?
                        this.renameInput()
                        :
                        <div style={{ cursor: 'auto!important' }} className="sd__document" onClick={() => { openDocument(art.document) }}>
                            <Icon name="file" />
                            {this.displayDocName(art.document.name)}

                        </div>
                    }
                </TableCell>
                <TableCell align="center">
                    <Popup content='Open/Edit Document' position='top center' trigger={<IconButton size="small" onClick={() => { openDocument(art.document) }}>
                        <FiEdit />
                    </IconButton>} />
                    {this.optionButtons()}
                </TableCell>
                <TableCell align="center"><span>{art.document.size ? prettyBytes(art.document.size) : ''}</span></TableCell>
                <TableCell align="center">Digital</TableCell>
                <TableCell align="center">{showTZDate(art.document.updated_at, company.timezone)}</TableCell>

            </TableRow>);
        }
        else if (art.document.type === 'file') {

            if (art.document.ext === 'pdf') {
                return (<TableRow key={art.document_id}>
                    <TableCell component="th" scope="row" align="left">
                        {rename ?
                            this.renameInput() :
                            <div className="sd__document" style={{ cursor: 'auto!important' }} onClick={() => { openPDFDocument(art.document) }}>
                                <Image style={{ height: '18px' }} src={`/images/icons/${art.document.ext}.png`} />
                                {this.displayDocName(art.document.name)}
                            </div>
                        }
                    </TableCell>
                    <TableCell align="center">
                        {this.optionButtons()}
                    </TableCell>
                    <TableCell align="center"><span>{art.document.size ? prettyBytes(art.document.size) : ''}</span></TableCell>
                    <TableCell align="center">File</TableCell>
                    <TableCell align="center">{showTZDate(art.document.updated_at, company.timezone)}</TableCell>

                </TableRow>);
            }


            let msFiles = ['doc', 'docx', 'pptx', 'xlsx', 'xls', 'ppt'];

            if (msFiles.includes(art.document.ext)) {
                return (<TableRow key={art.document_id}>
                    <TableCell component="th" scope="row" align="left">
                        {rename ?
                            this.renameInput() :
                            <div className="sd__document" style={{ cursor: 'auto!important' }} onClick={() => { openMSDocument(art.document) }}>
                                <Image style={{ height: '18px' }} src={`/images/icons/${art.document.ext}.png`} />
                                {this.displayDocName(art.document.name)}
                            </div>}

                    </TableCell>
                    <TableCell align="center">
                        {this.optionButtons()}
                    </TableCell>
                    <TableCell align="center"><span>{art.document.size ? prettyBytes(art.document.size) : ''}</span></TableCell>
                    <TableCell align="center">File</TableCell>
                    <TableCell align="center">{showTZDate(art.document.updated_at, company.timezone)}</TableCell>

                </TableRow>);
            }

            return (<TableRow key={art.document_id}>
                <TableCell component="th" scope="row" align="left">
                    {rename ?
                        this.renameInput() :
                        <div className="sd__document">
                            <Image style={{ height: '18px' }} src={`/images/icons/${art.document.ext}.png`} />
                            {this.displayDocName(art.document.name)}
                        </div>}
                </TableCell>
                <TableCell align="center">
                    {this.optionButtons()}
                </TableCell>
                <TableCell align="center"><span>{art.document.size ? prettyBytes(art.document.size) : ''}</span></TableCell>
                <TableCell align="center">File</TableCell>
                <TableCell align="center">{showTZDate(art.document.updated_at, company.timezone)}</TableCell>

            </TableRow>);
        }
    }
}

export default WorkingControlDocs;
