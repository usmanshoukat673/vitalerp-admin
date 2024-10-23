import React, { Component } from 'react';
import { Modal, Button, Popup } from 'semantic-ui-react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { BiRename } from "react-icons/bi";
import './OpenMSDocs.scss';
import { MdAssignmentTurnedIn } from "react-icons/md";
import AssignDocToControls from './AssignDocToControls';
import RenameDocument from '../../files/Options/RenameDocument';
import DocumentMetaData from '../../files/Document/DocumentMetaData';

class OpenMSDocs extends Component {

    state = {
        loading: false,
        errors: [],
        rename: false,
        assign: false,
        active_document: {}
    };

    closeFile = () => {
        this.props.cancle();
    };

    renameDocument = () => {
        this.setState({ rename: true });
    }

    cancelRename = () => {
        this.setState({ rename: false });
    }

    handleRenamed = document => {
        this.setState({ rename: false });
        this.props.document.name = document.name;
        this.props.renamed(document);
    }

    renameInput = () => {
        const { document, token, company } = this.props;
        return <RenameDocument document={document} token={token} company={company} cancel={this.cancelRename} renamed={this.handleRenamed} />;
    };

    handleAssign = () => {
        this.setState({ assign: true, active_document: this.props.document });
    }

    handleAssignClose = () => { this.setState({ assign: false, active_document: {} }) }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }


    render() {

        const { loading, rename, active_document, assign } = this.state;
        const { document, open, company, token, standards } = this.props;

        let path = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURI(`${window.location.origin}/view-msfiles/${document.enc_id}/${document.name}`)}`;


        return (
            <React.Fragment>
                <Modal
                    className="semtic__modal cccc__modal"
                    open={open}
                    onClose={() => { }}
                    size="large"
                >
                    <Modal.Header className="custom__modal__header">
                        {
                            rename ? this.renameInput() : document.name
                        }

                        <div>
                            <Popup content='Rename File' position='top center' trigger={<IconButton className="rename__button" size="small" onClick={this.renameDocument}>
                                <BiRename />
                            </IconButton>} />

                            <Popup content='Assign Controls' position='top center' trigger={<IconButton className="rename__button" size="small" onClick={this.handleAssign}>
                                <MdAssignmentTurnedIn />
                            </IconButton>} />

                            <IconButton disabled={loading} onClick={this.closeFile} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </Modal.Header>
                    <Modal.Content className="cc_modal_container" scrolling style={{ maxHeight: '21cm' }}>
                        {
                            !_.isEmpty(document) && <div><DocumentMetaData document={document} /></div>
                        }
                        <iframe style={{ minHeight: '21cm', border: '0px', width: '100%' }} src={path}></iframe>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button disabled={loading} onClick={this.closeFile}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>

                {assign ? <AssignDocToControls document={active_document} token={token} company={company} standards={standards} onclose={this.handleAssignClose} /> : ''}
            </React.Fragment>
        );
    }
}

export default OpenMSDocs;
